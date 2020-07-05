var selectedId = window.location.search.split("=")[1];
var mainDiv = $("main");
var orderList = $("<div>");
var cartValue = $("#cart-value");

// console.log(selectedId)

function initializeCartList() {

    var storedList = localStorage.getItem("orderList");
    if (storedList === null) {
        localStorage.setItem("orderList", JSON.stringify([]));
     } 
    else {
      storedList = JSON.parse(storedList);
        // for (var i = 0; i < storedList.length; i++) {
        //     todoList.appendChild(createTodoCard(storedList[i].id, storedList[i].message))
        // }
    }
}

initializeCartList();


function createProductCard(data){
    // <div id="product-section">
    //         <div id="image-section">
    //             <img src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/8593217/2019/4/9/de2c21f3-6731-4c29-9369-692a486a1b8c1554802772926-Samsung-Gear-IconX-Black-Cord-free-Fitness-Earbuds-256155480-1.jpg" alt="">
    //         </div>
    //         <div id="description">
    //             <h1>Gear IconX Black Cord-free Fitness Earbuds</h1>
    //             <h2>Samsung</h2>
    //             <h3>Price: Rs <span id="price-colour">13990</span></h3>
    //             <h3>Description</h3>
    //             <p>Speak commands via Bixby or Google Voice and control your music with just a tap or swipe. Meet your fitness goals with speed, distance, calorie tracking and real-time voice guidance. Find the perfect fit with multiple sizes of ear-tips and wing-tips right in the box. iOS/Mac users: Samsung Gear IconX can be used to stream music or take calls from your iOS handset or tablet. Fitness Functions that require the use of Samsung S-Health app are not available for iOS. 5 hours of Bluetooth streaming, 7 hours of MP3 listening, 4 hours talk time. Warranty: 6 months. Warranty provided by the brand owner / manufacturer</p>
    //             <h3>Product Preview
    //             </h3>
    //             <div id="product-images">
    //                 <img src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/8593217/2019/4/9/de2c21f3-6731-4c29-9369-692a486a1b8c1554802772926-Samsung-Gear-IconX-Black-Cord-free-Fitness-Earbuds-256155480-1.jpg" alt="">
    //                 <img src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/8593217/2019/4/9/0423d170-fb49-450f-aef9-bbeb7003554d1554802772913-Samsung-Gear-IconX-Black-Cord-free-Fitness-Earbuds-256155480-2.jpg" alt="">
    //                 <img src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/8593217/2019/4/9/94813947-e557-4755-9d3d-22529436a1681554802772853-Samsung-Gear-IconX-Black-Cord-free-Fitness-Earbuds-256155480-5.jpg" alt="">
    //             </div>
    //             <button id="add-cart">Add to Cart</button>
    //         </div>
    //     </div>

    var productDiv = $("<div>");
    productDiv.attr("id", "product-section");

    var imageDiv = $("<div>");
    imageDiv.attr("id", "image-section");

    var thumbnail = $("<img>");
    for(var i=0; i<data.photos.length; i++){
    thumbnail.attr("src", data.photos[0]);
    }

    var descriptionDiv =$("<div>");
    descriptionDiv.attr("id", "description");

    var title = $("<h1>");
    title.text(data.name);

    var brand = $("<h2>");
    brand.text(data.brand)

    var priceText = $("<h3>");
    priceText.text("Price: Rs ");

    var priceAmount = $("<span>");
    priceAmount.attr("id", "price-colour");
    priceAmount.text(data.price);

    var descText = $("<h3>");
    descText.text('Description');

    var desc = $("<p>");
    desc.text(data.description);

    var preview = $("<h3>");
    preview.text("Product Preview");

    var productImages = $("<div>");
    productImages.attr("id", "product-images");
    
    for(var i=0; i<data.photos.length; i++){
        var previewImages = $("<img>");
        previewImages.attr("src", data.photos[i]);
        previewImages.attr("id", "image"+[i]);
        productImages.append(previewImages);
        // if(thumbnail.attr("src") === pre)
    }


        // var selectedImage0 = $("#image0");
        // var selectedImage1 = $("#image1");
        // var selectedImage2 = $("#image2");
        // var selectedImage3 = $("#image3");
        // var selectedImage4 = $("#image4");
        // var selectedImage5 = $("#image5");

        // selectedImage0.on("click", function(){
        //     alert("0 clicked")
        //     // thumbnail.attr("src", selectedImage0.attr("src"));
        // })
        // selectedImage1.on("click", function(){
        //     thumbnail.attr("src", selectedImage1.attr("src"));
        // })
        // selectedImage2.on("click", function(){
        //     thumbnail.attr("src", selectedImage2.attr("src"));
        // })
        // selectedImage3.on("click", function(){
        //     thumbnail.attr("src", selectedImage3.attr("src"));
        // })
        // selectedImage4.on("click", function(){
        //     thumbnail.attr("src", selectedImage4.attr("src"));
        // })
        // selectedImage5.on("click", function(){
        //     thumbnail.attr("src", selectedImage5.attr("src"));
        // })

    var cartButton = $("<button>");
    cartButton.attr("id", "add-cart");
    cartButton.text("Add to Cart")

    imageDiv.append(thumbnail);
    priceText.append(priceAmount);
    descriptionDiv.append(title, brand, priceText, descText, desc, preview, productImages, cartButton);
    productDiv.append(imageDiv, descriptionDiv);

    // if(cartItems)
    
    cartButton.on("click", function(){
        // alert("hi")
        var storedList = JSON.parse(localStorage.getItem("orderList"));
        var productData = {
            id: data.id,
            name: data.name,
            amount:data.price,
            photos:data.photos
        };
        storedList.push(productData);
        console.log(storedList);
        
        var cartQuantity = parseInt(cartValue.text());
        cartQuantity += 1;
        cartValue.text(cartQuantity);

        localStorage.setItem("orderList", JSON.stringify(storedList));
        

    })
    return productDiv;

}

$.ajax({
    type: 'GET',
    url: "https://5efbca1c80d8170016f76869.mockapi.io/shoplaneHome/"+selectedId,
    success: function(resp){
        // console.log("success")
        var selectedCard = createProductCard(resp);

        mainDiv.append(selectedCard);
        // console.log(selectedCard);
    },
    error: function() {
        alert("check the url again")
    }
})