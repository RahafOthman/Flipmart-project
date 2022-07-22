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

let imageURLHolder;
let checkImg=true;
var productInputs = document.querySelectorAll('.productInputs')
var productsContainer = document.getElementById('products');
var inputsRegex = [
                   /^[A-Z][A-Za-z 0-9]{2,24}$/ 
                 , /^([0-9]{1,2}(\.{1}[0-9]{1,5}|\.{0})|100)$/
                 , /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|1000)(\.{1}[0-9]{1,5}|\.{0})$/ 
                 , /^[0-5]$/
                 , /^[A-Za-z 0-9 \.\?\,]{0,1000}$/
                 , /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
                ];
var inputsErrorMessage = [
                    "Name should start with a capital letter & with a length of 3-25",
                    "Range of Discount should be between 0.0 - 100.0",
                    "Range of Price should be between 1.0 - 1000 with a decimal number of 5 digits maximum",
                    "Number of stars should be between 0-5",
                    "Maximum description length is 1000 characters",
                    "Please enter a valid image"
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

    // products.forEach((item,index) => {
    //     item = {...item, imageName:""};
    //     products.splice(index, 1, item);
    // });
    // updateLocalStorage();
    checkAvailableProducts();
}

function updateLocalStorage(){
    localStorage.setItem("specialProducts", JSON.stringify(products));
}

productInputs.forEach((input,index) => {

    input.addEventListener("keyup", function(){
        checkInput(input,index)
    });

    input.addEventListener("change", function(){
        if(input.getAttribute("id") === "inputProductImage1"){
            const reader = new FileReader();
            reader.addEventListener("load", ()=>{
                imageURLHolder=reader.result;
                checkImg = true;
            });
            reader.readAsDataURL(inputProductImage.files[0]);
        }
        checkInput(input,index)
    });

});

function checkInput(input,index){
    if((index === productInputs.length-1) && !checkImg) return;

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
        checkAllInputs();
        productInputs[index].classList.remove("is-invalid");
        productInputs[index].classList.add("is-valid");
        if(input.parentElement.childElementCount == 3){
            //This next lines is used to remove the paragraph with the error message        
            input.parentElement.removeChild(input.parentElement.children[2]);
        }
    }
}

function checkAllInputs(){
    for(let i = 0 ; i < productInputs.length ; i++) {
        if((i === productInputs.length-1) && !checkImg) break;

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
    checkImg = true;
    addBtn.setAttribute("disabled","true");
}

function fillForm(index){
    clearForm();

    let product = products[index];

    console.log(product);

    inputProductName.value = product.productName;
    inputProductDiscount.value = product.discount;
    inputProductPrice.value = product.realPrice;
    inputProductDescription.value = product.description;
    inputProductStars.value = product.numberOfStars;

    checkImg = false;

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
                                <i class="fa-solid fa-eye mx-1 p-2 shadow-lg bg-white rounded" onclick="popupScreen(${i})"></i>
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

function addProduct(){

    var product = {
        productName: inputProductName.value,
        discount: inputProductDiscount.value,
        realPrice:    inputProductPrice.value,
        imageUrl:    imageURLHolder,
        imageName:    inputProductImage.files[0].name,
        numberOfStars:    inputProductStars.value,
        description: inputProductDescription.value
    }
    console.log(product);
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
                    imageUrl:     products[updateIndex].imageUrl,
                    imageName:    products[updateIndex].imageName,
                    numberOfStars:    inputProductStars.value,
                    description: inputProductDescription.value
                }

                if(checkImg){
                    product['imageUrl'] = imageURLHolder;
                    product['imageName'] = inputProductImage.files[0].name;
                }
                console.log(product);
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
                                        <i class="fa-solid fa-eye mx-1 p-2 shadow-lg bg-white rounded" onclick="popupScreen(${i})"></i>
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


function popupScreen(productIndex){
    let section = document.createElement('div');
    
    section.classList.add('popup-section','position-fixed','start-0','w-100','h-100');

    let popupHTML= `
            <div class="position-absolute w-100 h-100 bg-black bg-opacity-75" onClick="closePopupScreen()"></div>
            <div class="position-absolute top-0 end-0 text-white m-3"><i class="fa-solid fa-xmark popup-xmark fs-2" onClick="closePopupScreen()"></i></div>
            <div class="popup-section-body bg-light position-absolute text-white d-flex flex-column">
                <h3 class="fs-3 text-center text-secondary text-styles py-3 border-bottom">${products[productIndex].productName}'s Description</h3>
                <div class="w-100 popup-content col-6 text-dark opacity-75 text-styles p-2">
                    <p>${products[productIndex].description}</p>
                </div>
            </div>
        `;
    section.innerHTML = popupHTML;
    document.body.appendChild(section);
}

function closePopupScreen(){
    let section = document.querySelector('.popup-section');
    if(section === null) return;
    section.style.top = '-100%';
    section.style.visibility = "hidden";
    setTimeout(() => {
        document.body.removeChild(section);
    }, 600);
}