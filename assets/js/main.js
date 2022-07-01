var specialProducts = [];

// let test = [
//     {   productID: "sp-0"
//         ,productName: "Canon EOS 5D",
//       discount: 20.0,
//       realPrice:  43.08,
//       numberOfStars: 5,
//       imageUrl: "https://i.im.ge/2022/06/19/uMlrux.jpg",
//       description: ""

//     },
//     {   productID: "sp-1"
//         ,productName: "Canon EOS 5D",
//       discount: 20.0,
//       realPrice:  43.08,
//       numberOfStars: 5,
//       imageUrl: "https://i.im.ge/2022/06/19/uMlrux.jpg",
//       description: "",
    
//     },
//     {   productID: "sp-2"
//         ,productName: "HTC Touch HD",
//       discount: 5.0,
//       realPrice:  34.00,
//       numberOfStars: 4,
//       imageUrl: "https://i.im.ge/2022/06/19/reRgiy.jpg",
//       description: ""
    
//     },
//     {   productID: "sp-3"
//         ,productName: "HTC Touch HD",
//       discount: 5.0,
//       realPrice:  34.00,
//       numberOfStars: 4,
//       imageUrl: "https://i.im.ge/2022/06/19/reRgiy.jpg",
//       description: ""
    
//     },
//     {   productID: "sp-4"
//         ,productName: "Canon EOS 5D",
//       discount: 20.0,
//       realPrice:  43.08,
//       numberOfStars: 4,
//       imageUrl: "https://i.im.ge/2022/06/19/uMlrux.jpg",
//       description: ""
    
//     },
//     {   productID: "sp-5"
//         ,productName: "Canon EOS 5D",
//       discount: 20.0,
//       realPrice:  43.08,
//       numberOfStars: 3,
//       imageUrl: "https://i.im.ge/2022/06/19/uMlrux.jpg",
//       description: ""
    
//     },
//     {   productID: "sp-6"
//         ,productName: "HTC Touch HD",
//       discount: 5.0,
//       realPrice:  34.00,
//       numberOfStars: 4,
//       imageUrl: "https://i.im.ge/2022/06/19/reRgiy.jpg",
//       description: ""
    
//     },
//     {   productID: "sp-7"
//         ,productName: "HTC Touch HD",
//       discount: 5.0,
//       realPrice:  34.00,
//       numberOfStars: 4,
//       imageUrl: "https://i.im.ge/2022/06/19/reRgiy.jpg",
//       description: ""
    
//     },
//     {   productID: "sp-8"
//         ,productName: "Canon EOS 5D",
//       discount: 20.0,
//       realPrice:  43.08,
//       numberOfStars: 5,
//       imageUrl: "https://i.im.ge/2022/06/19/uMlrux.jpg",
//       description: ""
    
//     },
//     {   productID: "sp-9"
//         ,productName: "Canon EOS 5D",
//       discount: 20.0,
//       realPrice:  43.08,
//       numberOfStars: 5,
//       imageUrl: "https://i.im.ge/2022/06/19/uMlrux.jpg",
//       description: ""
    
//     }
// ];

let tempProductsDeals = [
    {productName: "Canon EOS 5D",
      discount: 20.0,
      realPrice:  43.08,
      numberOfStars: 5,
      imageUrl: "https://i.im.ge/2022/06/19/uMlrux.jpg",
      description: ""
    
    }, 
    {productName: "HTC Touch HD",
      discount: 5.0,
      realPrice:  34.00,
      numberOfStars: 4,
      imageUrl: "https://i.im.ge/2022/06/19/reRgiy.jpg",
      description: ""
    
    }, 
    {productName: "HTC Touch HD",
      discount: 5.0,
      realPrice:  34.00,
      numberOfStars: 4,
      imageUrl: "https://i.im.ge/2022/06/19/reRgiy.jpg",
      description: ""
    
    }, 
    {productName: "HTC Touch HD",
      discount: 5.0,
      realPrice:  34.00,
      numberOfStars: 4,
      imageUrl: "https://i.im.ge/2022/06/19/reRgiy.jpg",
      description: ""
    
    }
];
//login form
var email = document.getElementById('email-input');
var password = document.getElementById('password-input');
var loginBtn = document.getElementById('login');

loginBtn.onclick =function(){
    console.log("email: "+ email.value + " password: " + password.value);
    if(email.value == "admin@gmail.com" && password.value == "admin"){
        console.log("login successfully");     
        location.href="./admin/adminMain.html";   
    }else{
        console.log("something wrong");
    }
    email.value = '' ; 
    password.value = '' ; 
}

//end login form
let cart = [];

let start = 0, end = 3;
let startDeals = 0, endDeals=1;

window.onload = () => {
    if(localStorage.getItem("cart") != null){
        cart = JSON.parse(localStorage.getItem("cart"));
        displayCartNumber();
    } else {
        cart = [];
    }

    if(localStorage.getItem("specialProducts") != null){
        specialProducts = JSON.parse(localStorage.getItem("specialProducts"));
    } else {
        specialProducts = [];
    }

    if(window.outerWidth < 768) {
        start = 0;
        end = 3;
        displaySpecialProduct(start,end, specialProducts, document.querySelectorAll('.product-arrows-list li'), document.querySelector(".all-special-products"));
    } else {
        start = 0;
        end = 4;
        displaySpecialProduct(start,end, specialProducts, document.querySelectorAll('.product-arrows-list li'), document.querySelector(".all-special-products"));
        startDeals = 0;
        endDeals = 1;
        displayTempDeals(startDeals , endDeals, tempProductsDeals, document.querySelectorAll('.deals-arrows-list li'), document.querySelector(".temp-special-deals"));

    }
    document.querySelectorAll('.product-arrows-list li').forEach((item,index) => 
    {
        if(index === 0) item.onclick = () => {
            if(!item.hasAttribute("disabled")){
                start -= 1;
                end -= 1;
                displaySpecialProduct(start,end, specialProducts, document.querySelectorAll('.product-arrows-list li'), document.querySelector(".all-special-products"));
            }
        }
        else item.onclick = () => {
            if(!item.hasAttribute("disabled")){
                start += 1;
                end += 1;
                displaySpecialProduct(start,end, specialProducts, document.querySelectorAll('.product-arrows-list li'), document.querySelector(".all-special-products"));
            }
        }
    });

    document.querySelectorAll('.deals-arrows-list li').forEach((item,index) => 
    {
        if(index === 0) item.onclick = () => {
            if(!item.hasAttribute("disabled")){
                startDeals -= 1;
                endDeals -= 1;
                displayTempDeals(startDeals , endDeals, tempProductsDeals, document.querySelectorAll('.deals-arrows-list li'), document.querySelector(".temp-special-deals"));
            }
        }
        else item.onclick = () => {
            if(!item.hasAttribute("disabled")){
                startDeals += 1;
                endDeals += 1;
                displayTempDeals(startDeals , endDeals, tempProductsDeals, document.querySelectorAll('.deals-arrows-list li'), document.querySelector(".temp-special-deals"));
            }
        }
    });
}

function displayCartNumber(){
    let cartValues = findCartTotalAmount(cart);
    
    document.querySelector('.header__cart').innerHTML = `My Cart (${cartValues.quantity})`;
}

function updateCartLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function setArrows(start, end, documentArrows, productsArrayLength){
    // To check the next arrow
    if(end < productsArrayLength/2) {
        documentArrows[1].removeAttribute("disabled");
    } else {
        documentArrows[1].setAttribute("disabled","true");
    }

    // To check the previous arrow
    if (start > 0) {
        documentArrows[0].removeAttribute("disabled");
    } 
    else {
        documentArrows[0].setAttribute("disabled","true");
    }
}

function setNextArrow(end, documentArrows, productsArrayLength){
    // To check the next arrow
    if(end !== productsArrayLength) {
        documentArrows[1].removeAttribute("disabled");
    } else {
        documentArrows[1].setAttribute("disabled","true");
    }

}

function displaySpecialProduct(startColumn,endColumn, productsArray, arrowsDocument, productsDocument){
    if(startColumn < 0 || endColumn < 0 || startColumn > productsArray.length || endColumn > productsArray.length) return;
    let product = '';
    for(let i = startColumn*2 ; i < endColumn*2 ; i+=2){
        product += `<div class="special-product-column flex-column d-none active">`;
        for(let j = 0 ; j < 2 ; j++){
            if(i+j < productsArray.length)
                // addToCart(productsArray[i+j]);

                product += `
                    <div class="shadow special-product-item m-lg-2">
                        <div class="special-product-image position-relative">
                            <img src="${productsArray[i+j].imageUrl}" alt="${productsArray[i+j].productName}" class="special-product-img w-100">
                            <div class="position-absolute special-products-icons text-center w-100">
                                <i class="far fa-heart mx-md-1 p-2 shadow-lg bg-white rounded"></i>
                                <i class="fa-solid fa-eye mx-md-1 p-2 shadow-lg bg-white rounded"></i>
                            </div>
                        </div>
                        <p class="special-product-name text-center my-3">${productsArray[i+j].productName}</p>
                        <div class="special-product-info text-center pb-3 position-relative">
                            <div class="stars text-warning my-2">
                                ${findStars(productsArray[i+j].numberOfStars)}
                            </div>
                            <span class="currentPrice me-2">$${findPriceAfterDiscount(productsArray[i+j].realPrice ,productsArray[i+j].discount)}</span>
                            <span class="realPrice opacity-75 text-decoration-line-through">$${printPrice(`${productsArray[i+j].realPrice}`)}</span>
                            <div class="special-product-addBtn special-${i+j} w-100 h-100 position-absolute">

                            </div>
                        </div>
                    </div>
                `;
        }
        product += `</div>`;
    }
    setArrows(startColumn, endColumn, arrowsDocument, productsArray.length);
    productsDocument.innerHTML = product;
    for(let i = startColumn*2 ; i < endColumn*2 ; i++){
        addCartClick(document.querySelector(`.special-${i}`),productsArray[i]);
    }
}

function displayTempDeals(startColumn,endColumn, productsArray, arrowsDocument, productsDocument){
    if(startColumn < 0 || endColumn < 0 || startColumn > productsArray.length || endColumn > productsArray.length) return;
    let product = '';
    for(let i = startColumn ; i < endColumn ; i++){
        product += `
            <div class="special-product-item mx-auto my-3">
                        <div class="special-product-image position-relative">
                            <img src="${productsArray[i].imageUrl}" alt="${productsArray[i].productName}" class="special-product-img w-100">
                            <div class="position-absolute special-products-icons w-100 text-center">
                                <i class="far fa-heart mx-1 p-2 shadow-lg bg-white rounded"></i>
                                <i class="fa-solid fa-eye mx-1 p-2 shadow-lg bg-white rounded"></i>
                            </div>
                        </div>
                        <p class="special-product-name text-center my-3">${productsArray[i].productName}</p>
                        <div class="special-product-info text-center pb-3 position-relative">
                            <div class="stars text-warning my-4">
                                ${findStars(productsArray[i].numberOfStars)}
                            </div>
                            <span class="currentPrice me-2">$${findPriceAfterDiscount(productsArray[i].realPrice ,productsArray[i].discount)}</span>
                            <span class="realPrice opacity-50 text-decoration-line-through">$${printPrice(`${productsArray[i].realPrice}`)}</span>
                            <div class="special-product-addBtn deal-${i} w-100 h-100 position-absolute">

                            </div>
                        </div>
            </div>
        `;
    }
    setArrows(startColumn, endColumn, arrowsDocument, productsArray.length);
    setNextArrow(endColumn, arrowsDocument, productsArray.length);
    productsDocument.innerHTML = product;
    for(let i = startColumn ; i < endColumn ; i++){
        addCartClick(document.querySelector(`.deal-${i}`),productsArray[i]);
    }

}


function addCartClick(parentObj, obj){
        var o=document.createElement("div");
        o.innerHTML=`<i class="fa-solid fa-cart-plus"></i> Add To Cart`;
        o.classList.add('btn', 'btn-primary');

        o.onclick =  () => {
            addToCart(obj, true);
        }

        parentObj.appendChild(o);
}

function addToCart(productObj, displayScreen=false){
    

    let productIndex = cart.findIndex(item => item.productName === productObj.productName);
    // Checking the product's name isn't the most effective way and should be replaced with a unique product's ID
    if(productIndex === -1){
        let newObj = {...productObj,
            quantity: 1};

        cart.push(newObj);
    } else {
        cart[productIndex].quantity++;
    }

    displayCartNumber();
    
    updateCartLocalStorage();

    if(displayScreen) displayAddedProduct(productObj);

}

function displayAddedProduct(productObj){
    var topContainer = document.createElement("div");
    topContainer.classList.add('w-100', 'h-100', 'position-fixed', 'add-to-cart-container');

    var background = document.createElement("div");
    background.classList.add('w-100', 'h-100', 'position-absolute', 'bg-dark', 'opacity-75');
    background.onclick = closeAddedProduct;

    var displayScreen = document.createElement("div");
    displayScreen.classList.add('w-50', 'h-30', 'position-absolute', 'bg-white', 'add-to-cart-content');

    let displayContent = document.createElement("div");
    displayContent.classList.add('w-100', 'h-100', 'd-flex', 'flex-row', 'position-relative');

    let cartValues = findCartTotalAmount(cart);
    
    displayCartNumber();

    let content = ` <div class="w-35 h-100 position-relative d-flex flex-row add-to-cart-leftside">
                        <div class="w-60 h-100 position-relative">
                            <img src="${productObj.imageUrl}" alt="${productObj.productName}" class="w-60 h-50 position-relative rounded h-v-center">
                        </div>
                        <div class="me-2 h-100 w-40 text-center">
                            <p class="position-relative vertical-center add-to-cart-productName">${productObj.productName}</p>
                        </div>
                    </div>
                    <div class="w-65 h-100 position-relative add-to-cart-rightside text-center">
                        <p class="mt-3 fs-5 text-styles text-primary">Added to cart!</p>
                        <div class="text-start d-flex flex-row justify-content-evenly fs-6 font-bold">
                            <div class="d-flex flex-column">
                                <p>Products count:</p>
                                <p>Total Price:</p>
                            </div>
                            <div class="d-flex flex-column">
                                <p>${cartValues.quantity}</p>
                                <p>${printPrice(`${cartValues.price}`)}$</p>
                            </div>
                        </div>
                        <div class="mb-5">
                            <div class="btn btn-primary" onclick="closeAddedProduct()">
                                Continue Shopping..
                            </div>
                            <a href="assets/html/cart.html" class="btn btn-primary">
                                Go to Checkout!
                            </a>
                        </div>
                    </div>`

    displayContent.innerHTML = content;

    displayScreen.appendChild(displayContent);

    
    topContainer.appendChild(background);
    topContainer.appendChild(displayScreen);

    document.body.insertAdjacentElement('afterbegin',topContainer);

}

function closeAddedProduct(){
    var container = document.querySelector('.add-to-cart-container');
    container.style.transform= 'scale(0.01)';
    container.style.visibility = "hidden";
    setTimeout(() => {
        document.body.removeChild(container);
    }, 500);
}


function findCartTotalAmount(cart){
    let quantity=0, price = 0;
    cart.forEach(item => {
        quantity += item.quantity;
        price += (item.quantity * parseFloat(findPriceAfterDiscount(item.realPrice, item.discount)));
    });
    return {quantity, price};
}

function findPriceAfterDiscount(price,discount){
    return printPrice(`${(100.0 - discount)/100 * price}`);
}

function printPrice(price){
    if(price.length >= 5)       return price.substring(0,5);
    else if(price.length === 4) return price+ "0";
    else                        return price+ ".00";
    
}

function findStars(numberOfStars){
    let stars = "";
    let i;
    for(i = 0 ; i < numberOfStars && i < 5 ; i++){
        stars += `<i class="fas fa-star"></i>`;
    }
    for(let j = i ; j < 5 ; j++){
        stars += `<i class="far fa-star"></i>`;
    }
    return stars;
}