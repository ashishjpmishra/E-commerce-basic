
var orderList = $("#order-list");
var totalAmount = $("#total-amount");
var placeOrder = $("#place-order")
var total = 0;


function initializeCartList() {

    var storedList = localStorage.getItem("orderList");
    if (storedList === null) {
        alert("cart is empty")
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
    // <div class="cart-items">
    //     <div><img class="product-image" src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/10122083/2019/6/24/e533a691-3908-41b0-8307-1928a37d4ec41561362162650-Samsung-Galaxy-Fit-4801561362161527-1.jpg" alt=""></div>
    //     <div>
    //         <h4>Unisex Black Galaxy Fit Fitness Band
    //         </h4>
    //         <p>x1</p>
    //         <p>Amount: Rs 9990
    //         </p>
    //     </div>
    // </div>

    var cartItems = $("<div>");
    cartItems.addClass("cart-items");

    var imageDiv = $("<div>");
    var ImageCart = $("<img>");
    //console.log(data)
    for(var i=0; i<data.photos.length; i++){
    ImageCart.attr("src", data.photos[0]);
    }
    ImageCart.addClass("product-image");

    var descDiv = $("<div>");
    var item = $("<h4>");
    item.text(data.name);

    var quantity = $("<p>");
    quantity.text("x1");

    var amount = $("<p>");
    amount.text("Rs. " + data.amount);

    total += data.amount;

    totalAmount.text(total);

    descDiv.append(item, quantity, amount);
    imageDiv.append(ImageCart);
    cartItems.append(imageDiv, descDiv);

    return cartItems;


}

var storedList = localStorage.getItem("orderList");
storedList = JSON.parse(storedList);
for(var i=0; i<storedList.length ; i++){
    var products = createProductCard(storedList[i]);
    orderList.append(products);


    
}

placeOrder.on("click", function(){
    alert("Order Successful");
    window.location.assign("thankyou.html");
    localStorage.clear();
})
//console.log(products)

