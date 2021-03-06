let cart = [];
let orders = [];

window.onload = () => {
    if(localStorage.getItem("cart") != null){
        cart = JSON.parse(localStorage.getItem("cart"));
        displayCartNumber();
        displayCartItems();
    } else {
        cart = [];
    }
}

function displayCartNumber(){
    let cartValues = findCartTotalAmount(cart);
    
    document.querySelector('.header__cart').innerHTML = `My Cart (${cartValues.quantity})`;
}

function updateCartLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateProductQuantity(productObj, quantity){
    
    let productIndex = cart.findIndex(item => item.productName === productObj.productName);
    // Checking the product's name isn't the most effective way and should be replaced with a unique product's ID
    if(productIndex !== -1){
        if(quantity <= 0) removeFromCart(productObj);
        else              cart[productIndex].quantity = quantity;
    }

    displayCartNumber();
    displayCartItems();
    updateCartLocalStorage();
}

function removeFromCart(productObj){
    let productIndex = cart.findIndex(item => item.productName === productObj.productName);
    // Checking the product's name isn't the most effective way and should be replaced with a unique product's ID

    if(productIndex !== -1){
        cart.splice(productIndex, 1);
    }

    displayCartNumber();
    displayCartItems();
    updateCartLocalStorage();
}

function displayCartItems(){
    let cartBody = document.querySelector('.cart-body__items');
    let cartItems = '';
    let totalPrice = 0;
    let itemPrice = 0;

    cart.forEach((item, index) => {
        itemPrice = (item.quantity * parseFloat(findPriceAfterDiscount(item.realPrice, item.discount)));
        totalPrice += itemPrice;
        cartItems += `
            <div class="cart-item-row w-100 pb-3 mb-3 d-flex flex-column flex-md-row justify-content-between"> 
                <div class="cart-item-row--leftside d-flex flex-column flex-md-row align-items-center pb-3">
                    <img src="${item.imageUrl}" alt="${item.productName}" class="cart-item-img w-50 w-md-20"/>
                    <h3 class="text-styles fs-4 ps-2 my-auto">${item.productName}</h3>
                </div>
                <div class="cart-item-row--rightside-${index} d-flex flex-row justify-content-end">
                    <p class="cart-item-row-price fs-6 font-bold my-auto">${printPrice(`${itemPrice}`)}$</p>
                </div>
            </div>
        `;
    });

    cartBody.innerHTML = cartItems;

    displayCartFooter(totalPrice);

    cart.forEach((item, index) => {
        let parentObj = document.querySelector(`.cart-item-row--rightside-${index}`);
        addQuantitySelector(parentObj, item);
        addCartTrash(parentObj, item);
    });

}

function displayCartFooter(totalPrice){
    if(!document.querySelector('.cart-footer')){
        var cartFooter = document.createElement('div');
        cartFooter.classList.add('cart-footer', 'w-100', 'mb-3', 'd-flex', 'flex-column', 'justify-content-center', 'mx-auto');

        var cartPriceContainer = document.createElement("div");
        cartPriceContainer.classList.add('w-100', 'mb-3', 'd-flex', 'flex-row', 'text-styles', 'font-bold', 'fs-6', 'justify-content-center');
        cartPriceContainer.innerHTML = ` <p class="me-4">Total Price:</p>
                        <p class="text-primary cart-total-price">${printPrice(`${totalPrice}`)}$</p>`;

        var cartCheckout = document.createElement("div");
        cartCheckout.classList.add('btn', 'btn-success');
        cartCheckout.innerHTML = "Checkout now!";
        cartCheckout.onclick = () => {
            if(cart.length !== 0){
                cartCheckoutItems();
                Swal.fire({
                    icon: 'success',
                    title: 'Thanks for dealing with us!',
                    showConfirmButton: false,
                    timer: 2500
                });
                displayCartNumber();
                displayCartItems();
                updateCartLocalStorage();
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Add items to the cart first!',
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        }

        cartFooter.appendChild(cartPriceContainer);
        cartFooter.appendChild(cartCheckout);

        document.querySelector('.cart-body-container').appendChild(cartFooter);
    } else {
        document.querySelector('.cart-total-price').innerHTML = printPrice(`${totalPrice}`) + '$';
    }
}

function cartCheckoutItems(){
    if(localStorage.getItem("orders") != null){
        orders = JSON.parse(localStorage.getItem("orders"));
    } else {
        orders = [];
    }


    if(cart.length !== 0) {
        orders.push(cart);
        localStorage.setItem("orders", JSON.stringify(orders));
        cart = [];
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Add items to the cart first!',
            showConfirmButton: false,
            timer: 2500
        });
    }
}

function addQuantitySelector(parentObj, obj){
    var o=document.createElement("input");
    o.setAttribute("type","number");
    o.setAttribute("id", "itemQuantity");
    o.classList.add('h-30', 'w-30', 'my-auto', 'font-bold', 'text-center', 'mx-3');

    o.value = obj.quantity;

    o.style.cursor = "pointer";

    o.addEventListener('change', ()=>{
        updateProductQuantity(obj, parseInt(o.value));
    });

    parentObj.appendChild(o);
}


function addCartTrash(parentObj, obj){
    var o=document.createElement("i");
    o.classList.add('text-danger', 'fa-solid', 'fa-trash', 'fs-4', 'my-auto');

    o.style.cursor = "pointer";

    o.onclick =  () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
          }).then((result) => {
            if (result.isConfirmed) {
                removeFromCart(obj);
                
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        });
    };

    parentObj.appendChild(o);
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

