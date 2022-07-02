// text fields

var inputProductName = document.getElementById('inputProductName1');
var inputProductDiscount = document.getElementById('inputProductDiscount1');
var inputProductPrice = document.getElementById('inputProductPrice1');
var inputProductStars = document.getElementById('inputProductStars1');
var inputProductDescription = document.getElementById('inputProductDescription1');
var inputProductImage = document.getElementById('inputProductImage1');


// buttons
var addBtn = document.getElementById('addBtn');
var clearBtn = document.getElementById('clearBtn');
var deleteAllBtn = document.getElementById('deleteAllBtn');

clearBtn.onclick = clearForm;
deleteAllBtn.onclick = deleteAll;
addBtn.onclick = function(){
    checkAllInputs();

    if(inputsError.length !== 0) return;

    if(!updateFlag){
        addProduct();
        displayProducts();
        clearForm();
        checkAvailableProducts();
    }
    else updateItem();
}

// custom variables

var productInputs = document.querySelectorAll('.productInputs')
var productsContainer = document.getElementById('products');
var inputsRegex = [
                   /^[A-Z][A-Za-z 0-9]{2,24}$/ 
                 , /^([0-9]{1,2}(\.{1}[0-9]{1,5}|\.{0})|100)$/
                 , /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|1000)(\.{1}[0-9]{1,5}|\.{0})$/ 
                 , /^[0-5]$/
                 , /^[A-Za-z 0-9]{0,100}$/
                 , /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
                ];
var inputsErrorMessage = [
                    "Name should start with a capital letter & with a length of 3-25",
                    "Range of Discount should be between 0.0 - 100.0",
                    "Range of Price should be between 1.0 - 1000 with a decimal number of 5 digits maximum",
                    "Number of stars should be between 0-5",
                    "Maximum description length is 100 letter",
                    "Please enter a valid url"
                ];
var inputsError = [];
var products;
var updateIndex = 0;
var updateFlag = false;

window.onload = function(){
    if(localStorage.getItem("specialProducts") != null){
        products = JSON.parse(localStorage.getItem("specialProducts"));
        displayProducts();
    } else {
        products = [];
    }
    checkAvailableProducts();
}

function updateLocalStorage(){
    localStorage.setItem("specialProducts", JSON.stringify(products));
}

productInputs.forEach((input,index) => {
    console.log(input, input.value);
    input.addEventListener("keyup", function(){
        checkInput(input,index)
    });
    input.addEventListener("change", function(){
        checkInput(input,index)
    });
});

function checkInput(input,index){
    if(!inputsRegex[index].exec(productInputs[index].value)){
        productInputs[index].classList.remove("is-valid");
        productInputs[index].classList.add("is-invalid");
            
        //These next lines is used to add a paragraph with the error message
        if(input.parentElement.childElementCount < 3){
            const para = document.createElement(`p`);
            const node = document.createTextNode(inputsErrorMessage[index]);

            para.appendChild(node);
            para.classList.add("alert","alert-danger");
            input.parentElement.appendChild(para);
        }
    } else {
        productInputs[index].classList.remove("is-invalid");
        productInputs[index].classList.add("is-valid");
        if(input.parentElement.childElementCount == 3){
            //This next lines is used to remove the paragraph with the error message        
            input.parentElement.removeChild(input.parentElement.children[2]);
        }
    }
    checkAllInputs();
}

function checkAllInputs(){
    for(let i = 0 ; i < productInputs.length ; i++) {
        if(!inputsRegex[i].exec(productInputs[i].value)){
            addBtn.setAttribute("disabled","true");
            inputsError.push(inputsErrorMessage[i]);
            checkInput(productInputs[i], i);
            return;
        }
    }
    inputsError = [];
    addBtn.removeAttribute("disabled");
}

function clearForm(){
    for(let i = 0 ; i < productInputs.length ; i++) {
        productInputs[i].value = "";
        productInputs[i].classList.remove("is-valid");
        productInputs[i].classList.remove("is-invalid");
        if(productInputs[i].parentElement.childElementCount == 3){
            //This next lines is used to remove the paragraph with the error message        
            productInputs[i].parentElement.removeChild(productInputs[i].parentElement.children[2]);
        }
    }
    addBtn.innerHTML = "Add Product";
    updateFlag = false;
    addBtn.setAttribute("disabled","true");
}

function fillForm(index){
    let product = products[index];

    inputProductName.value = product.productName;
    inputProductDiscount.value = product.discount;
    inputProductPrice.value = product.realPrice;
    inputProductDescription.value = product.description;
    inputProductImage.value = product.imageUrl;
    inputProductStars.value = product.numberOfStars;

    addBtn.innerHTML = "Update Product";
    checkAllInputs();
    updateFlag = true;
    updateIndex = index;
}

function displayProducts(){
    var holder="";
    for(let i = 0 ; i < products.length ; i++){
        holder += `
            <div class="special-product-item col-12 col-md-3 m-1">
                        <div class="special-product-image position-relative">
                            <img src="${products[i].imageUrl}" alt="${products[i].productName}" class="special-product-img w-100">
                            <div class="position-absolute special-products-icons w-100 text-center">
                                <i class="fa-solid fa-eye mx-1 p-2 shadow-lg bg-white rounded" onclick="viewProduct(${i})"></i>
                            </div>
                        </div>
                        <p class="special-product-name text-center my-3">${products[i].productName}</p>
                        <div class="special-product-info text-center pb-3 position-relative">
                            <div class="stars text-warning my-4">
                                ${findStars(products[i].numberOfStars)}
                            </div>
                            <div class="currentPrice me-2">Discount: ${products[i].discount}%</div>
                            <span class="currentPrice">Real Price: $${printPrice(`${products[i].realPrice}`)}</span>
                            <div class="special-product-buttons d-flex flex-column flex-md-row product-${i} w-100 h-100 position-absolute justify-content-evenly align-items-center">
                                <button type="button" onclick="deleteProduct(${i})" class="btn btn-danger w-35">Delete</button>
                                <button type="button" onclick="fillForm(${i})" class="btn btn-secondary w-35">Update</button>  
                            </div>
                        </div>
            </div>
        `;
    }
    productsContainer.innerHTML = holder;

}

function viewProduct(index){
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
}

function addProduct(){
    
    var product = {
        productName: inputProductName.value,
        discount: inputProductDiscount.value,
        realPrice:    inputProductPrice.value,
        imageUrl:    inputProductImage.value,
        numberOfStars:    inputProductStars.value,
        description: inputProductDescription.value
    }
    products.push(product);
    updateLocalStorage();
    Swal.fire({
        icon: 'success',
        title: 'New Product Added Successfully',
        showConfirmButton: false,
        timer: 2500
    });
}

function deleteProduct(index, approved=false){
    if(index >= 0 && index < products.length){
        // if approved = true, then we know that the confirmation is already approved
        // in our case (we confirmed it at deleteAll() function)
        if(!approved){
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
                    products.splice(index,1);
                    updateLocalStorage();
                    displayProducts();
                    checkAvailableProducts();
                    
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        } else {
            products.splice(index,1);
            updateLocalStorage();
            displayProducts();
        }
    }
}

function updateItem(){
    if(updateIndex >= 0 && updateIndex < products.length){
        

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update'
          }).then((result) => {
            if (result.isConfirmed) {
                var product = {
                    productName: inputProductName.value,
                    discount: inputProductDiscount.value,
                    realPrice:    inputProductPrice.value,
                    imageUrl:    inputProductImage.value,
                    numberOfStars:    inputProductStars.value,
                    description: inputProductDescription.value
                }
                products.splice(updateIndex,1,product);
                updateLocalStorage(); 
                
                displayProducts();
                checkAvailableProducts();
                clearForm();

                Swal.fire({
                    icon: 'success',
                    title: 'Updated successfully!',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }) 
        
    }
}

function deleteAll(){
    var size = products.length;
    
    Swal.fire({
        title: 'Are you sure you want to delete them all?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete them all!'
      }).then((result) => {
        if (result.isConfirmed) {          
            for(let i = size-1 ; i >= 0 ; i--){
                deleteProduct(i, true);
            }
            checkAvailableProducts();
            Swal.fire(
                'Deleted!',
                'All products has been deleted.',
                'success'
            )
        }
    })


    // We can do another way which is 
    // localStorage.removeItem("products");
    // products = []; or even products.splice(0, products.length);
    // displayProducts();
}


function searchProduct(name){
    var holder="";
    for(let i = 0 ; i < products.length ; i++){
        if(products[i].productName.toLowerCase().includes(name.toLowerCase())){
            holder += `
                    <div class="special-product-item col-12 col-md-3 m-1">
                                <div class="special-product-image position-relative">
                                    <img src="${products[i].imageUrl}" alt="${products[i].productName}" class="special-product-img w-100">
                                    <div class="position-absolute special-products-icons w-100 text-center">
                                        <i class="fa-solid fa-eye mx-1 p-2 shadow-lg bg-white rounded" onclick="viewProduct(${i})"></i>
                                    </div>
                                </div>
                                <p class="special-product-name text-center my-3">${products[i].productName}</p>
                                <div class="special-product-info text-center pb-3 position-relative">
                                    <div class="stars text-warning my-4">
                                        ${findStars(products[i].numberOfStars)}
                                    </div>
                                    <div class="currentPrice me-2">Discount: ${products[i].discount}%</div>
                                    <span class="currentPrice">Real Price: $${printPrice(`${products[i].realPrice}`)}</span>
                                    <div class="special-product-buttons d-flex flex-column flex-md-row product-${i} w-100 h-100 position-absolute justify-content-evenly align-items-center">
                                        <button type="button" onclick="deleteProduct(${i})" class="btn btn-danger w-35">Delete</button>
                                        <button type="button" onclick="fillForm(${i})" class="btn btn-secondary w-35">Update</button>  
                                    </div>
                                </div>
                    </div>
                    `;
        }
    }
    productsContainer.innerHTML = holder;
}

function checkAvailableProducts(){
    if(products.length === 0) deleteAllBtn.setAttribute("disabled","true");
    else                     deleteAllBtn.removeAttribute("disabled");
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