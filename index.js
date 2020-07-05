$(document).ready(() =>{
    $("#banner .slick-banner").slick({
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
    });
});



var productDisplay = $(".product-display");
var accessoriesDisplay = $(".accessories-display");

function createProductCard(data){
    // <div class="product-list">
    //     <a href="#"><img src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg" alt=""/></a>
    //     <div class="product-details">
    //         <h4>Men Navy Blue Solid Sweatshirt</h4>
    //         <h5>United Colors of Benetton</h5>
    //         <p>Rs 2599</p>
    //     </div>
    // </div>  
    // console.log(data)
    var cardDiv = $("<div>");
    cardDiv.addClass("product-list");

    var cardHyperlink = $("<a>");
    cardHyperlink.attr("href", "./product.html?vId=" + data.id);

    var thumbnail = $("<img>");
    for(var i=0; i<data.photos.length; i++){
    thumbnail.attr("src", data.photos[0]);
    }

    var detailsDiv = $("<div>");
    detailsDiv.addClass("product-details");

    var title = $("<h4>");
    title.text(data.name);

    var brand = $("<h5>");
    brand.text(data.brand);

    var amount = $("<p>");
    amount.text(data.price);

    detailsDiv.append(title, brand, amount);
    cardHyperlink.append(thumbnail);
    cardDiv.append(cardHyperlink, detailsDiv);

    return cardDiv;


}

$.ajax({
    type: 'GET',
    url: 'https://5efbca1c80d8170016f76869.mockapi.io/shoplaneHome',
    success: function(resp) {
        for(var i=0; i<resp.length/2; i++){
            // console.log(resp[0])
            var cardDiv = createProductCard(resp[i]);

            productDisplay.append(cardDiv);
        }

        for(var i=resp.length/2; i<resp.length; i++){
            // console.log(resp[0])
            var cardDivAcc = createProductCard(resp[i]);

            accessoriesDisplay.append(cardDivAcc);
        }
        
    },
    error: function() {
        alert("check the url again")
    }
  });