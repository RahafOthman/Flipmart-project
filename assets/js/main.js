var specialProducts = [
    {productName: "Canon EOS 5D",
      discount: 20.0,
      realPrice:  43.08,
      numberOfStars: 5,
      imageUrl: "https://i.im.ge/2022/06/19/uMlrux.jpg",
      description: ""

    },
    {productName: "Canon EOS 5D",
      discount: 20.0,
      realPrice:  43.08,
      numberOfStars: 5,
      imageUrl: "https://i.im.ge/2022/06/19/uMlrux.jpg",
      description: "",
    
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
    {productName: "Canon EOS 5D",
      discount: 20.0,
      realPrice:  43.08,
      numberOfStars: 4,
      imageUrl: "https://i.im.ge/2022/06/19/uMlrux.jpg",
      description: ""
    
    },
    {productName: "Canon EOS 5D",
      discount: 20.0,
      realPrice:  43.08,
      numberOfStars: 3,
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
    {productName: "Canon EOS 5D",
      discount: 20.0,
      realPrice:  43.08,
      numberOfStars: 5,
      imageUrl: "https://i.im.ge/2022/06/19/uMlrux.jpg",
      description: ""
    
    },
    {productName: "Canon EOS 5D",
      discount: 20.0,
      realPrice:  43.08,
      numberOfStars: 5,
      imageUrl: "https://i.im.ge/2022/06/19/uMlrux.jpg",
      description: ""
    
    }
];

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


let start = 0, end = 3;
let startDeals = 0, endDeals=1;

window.onload = () => {
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
                product += `
                    <div class=" special-product-item m-lg-2">
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
                            <span class="realPrice opacity-50 text-decoration-line-through">$${printPrice(`${productsArray[i+j].realPrice}`)}</span>
                            <div class="special-product-addBtn w-100 h-100 position-absolute">
                                <div class="btn btn-primary"><i class="fa-solid fa-cart-plus"></i> Add To Cart</div>
                            </div>
                        </div>
                    </div>
                `;
        }
        product += `</div>`;
    }
    setArrows(startColumn, endColumn, arrowsDocument, productsArray.length);
    productsDocument.innerHTML = product;
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
                            <div class="special-product-addBtn w-100 h-100 position-absolute">
                                <div class="btn btn-primary"><i class="fa-solid fa-cart-plus"></i> Add To Cart</div>
                            </div>
                        </div>
            </div>
        `;
    }
    console.log((product));
    setArrows(startColumn, endColumn, arrowsDocument, productsArray.length);
    setNextArrow(endColumn, arrowsDocument, productsArray.length);
    productsDocument.innerHTML = product;
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
    for(i = 0 ; i < numberOfStars ; i++){
        stars += `<i class="fas fa-star"></i>`;
    }
    for(let j = i ; j < 5 ; j++){
        stars += `<i class="far fa-star"></i>`;
    }
    return stars;
}