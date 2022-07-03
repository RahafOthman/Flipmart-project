
var email = document.getElementById('email-input');
var password = document.getElementById('password-input');
var categoriesItems = document.getElementById("home-page-categories-items");

window.ready = function(){
    console.log("this is test");
}

/*login validation */
function validate(){
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
}
var categories = [] ; 
var subCategories=[] ; 
var subSubCategories=[] ;
/* categories variable */
curentIndex = 0 ;  
var categoryInput = document.getElementById("category-input");
var addCategoryBtn = document.getElementById("add-category");
var displayCategoriesDiv = document.getElementById("display-categories");
/* categories variable */

/*sub categories variable */
var SubcategoryInput = document.getElementById("sub-category-input");
var addSubCategoryBtn = document.getElementById("add-sub-category");
var displaySubCategoriesDiv = document.getElementById("display-sub-categories");
var displaySubCategoriesTable = document.getElementById("display-sub-categories-table");
var categoryName = document.getElementById("category-name");
categoryId = 0 ;
categorySubId = 0 
/*sub categories variable */

/*sub  categories variable */
var SubSubcategoryInput = document.getElementById("sub-sub-category-input");
var addSubSubCategoryBtn = document.getElementById("add-sub-sub-category");
var displaySubSubCategoriesDiv = document.getElementById("display-sub-sub-categories");
var displaySubSubCategoriesTable = document.getElementById("display-sub-sub-categories-table");
var subcategoryName = document.getElementById("sub-category-name");
subCategoryId= 0 ; 
childId=0 ; 
/*sub categories variable */

/*start categories section*/

if (localStorage.getItem("categoriesList") == null ){
    var categories = [] ; 
}else {
    categories = JSON.parse(localStorage.getItem("categoriesList"));
    displayCategories() ; 
}

addCategoryBtn.onclick= function(){
   if(addCategoryBtn.innerText == "Add Category"){
        createCategory() ; 
    }
    else{
        updateCategory();
    }    
    displayCategories() ; 
}

function createCategory(){
    var category={
        categoryName: categoryInput.value,
    } 
    categories.push(category);
    localStorage.setItem("categoriesList", JSON.stringify(categories));
    displayCategories();
    categoryInput.value='';
}

function displayCategories(){  
    var result = "" ; 
    for (i = 0 ; i < categories.length ; i++){
        result+= `
            <tr class="text-center">
                <td class="col-4" >${i}</td>
                <td class="col-4">${categories[i].categoryName}</td>
                <td><button class="admin-categories-btn" onclick="getData(${i})"><i class="fa-solid fa-pen"></i></button></td>
                <td><button class="admin-categories-btn" onclick="deleteCategory(${i})"><i class="fa fa-solid fa-trash"></i></button></td>
                <td><button class="admin-categories-btn" onclick="displaySubCategories(${i})">+</button></td>
            </tr> 
        `;
    }
    displayCategoriesDiv.innerHTML = result ; 
}

function getData(index){
    var category = categories[index];
    categoryInput.value =category.categoryName ; 
    addCategoryBtn.innerHTML = "update" ; 
    curentIndex = index ;
}

function updateCategory(){
    var category = {
        categoryName : categoryInput.value ,
    };
    categories[curentIndex].categoryName = category.categoryName ; 
    localStorage.setItem("categoriesList", JSON.stringify(categories));
    addCategoryBtn.innerHTML = "Add Category" ; 
    categoryInput.value='';
}
function searchCategory(name){
    var result = "" ; 
    for (i = 0 ; i < categories.length ; i++){
        if (categories[i].categoryName.toLowerCase().includes(name.toLowerCase())){
            result+= `
            <tr class="text-center">
                <td class="col-4" >${i}</td>
                <td class="col-4">${categories[i].categoryName}</td>
                <td><button class="admin-categories-btn" onclick="getData(${i})"><i class="fa-solid fa-pen"></i></button></td>
                <td><button class="admin-categories-btn" onclick="deleteCategory(${i})"><i class="fa fa-solid fa-trash"></i></button></td>
                <td><button class="admin-categories-btn" onclick="displaySubCategories(${i})">+</button></td>
            </tr> 
        `;
    }
}
    displayCategoriesDiv.innerHTML = result ;  
}
/*end categories section*/
/*display categories in home page onload 
    categoriesHomeItems();

function categoriesHomeItems(){
    console.log("homepage");
    var result = "" ; 
    for (i = 0 ; i < categories.length ; i++){
        result += `  
        <li>${categories[i].categoryName}</li>     
        `;
    }
    categoriesItems.innerHTML =""+ result ; 
}*/
/*display categories in home page*/


/*start sub categories section*/

if(localStorage.getItem("SubCategoriesList") == null){
    var subCategories=[];
}else{
    subCategories = JSON.parse(localStorage.getItem("SubCategoriesList"));
    displayData(categoryId);
    displayCategoryName(categoryId);
}
addSubCategoryBtn.onclick= function(){
    if(addSubCategoryBtn.innerText == "Add"){
        createSubCategory(categoryId) ; 
    }
    else{
        updateSubCategory(categoryId);
    }    
    displayData(categoryId) ; 
 }
function displaySubCategories(index){
    categoryId=index;
    if(localStorage.getItem("SubCategoriesList") == null){
        var subCategories=[];
    }else{
        subCategories = JSON.parse(localStorage.getItem("SubCategoriesList"));
        displayData(categoryId);  
        displayCategoryName(categoryId);
    }
}

function displayCategoryName(index){
    console.log("index:" + index)
    console.log("Name"+categories[index].categoryName);
    categoryName.innerHTML= ""+categories[index].categoryName;
}

function createSubCategory(index){
    var Subcategory={
        SubcategoryName: SubcategoryInput.value,
        categoryId:index,
    }
    subCategories.push(Subcategory);
    localStorage.setItem("SubCategoriesList", JSON.stringify(subCategories));
    displayData(index);
    SubcategoryInput.value='';
}
/*<button class="admin-categories-btn" onclick=dropDownCategory(${i})>
    <i class="fa fa-thin fa-angle-down" dropDownCategory(${i})>
       <ul class="subCategoryDropDown">
        </ul>
    </i>  </button></td> */
function displayData(index){
    console.log("display data here: " +index);
    var result = "" ; 
    for (i = 0 ; i < subCategories.length ; i++){
        if(subCategories[i].categoryId == index){
            result += `  
            <tr class="text-center">
                <td class="col-4" >${i}</td>
                <td class="col-4">${subCategories[i].SubcategoryName}</td>
                <td><button class="admin-categories-btn" onclick=getSubData(${i})><i class="fa-solid fa-pen"></i></button></td>
                <td><button class="admin-categories-btn" onclick=deleteSubCategory(${i})><i class="fa fa-solid fa-trash"></i></button></td>
                <td><button class="admin-categories-btn" onclick="displaySubSubCategories(${i})">+</button></td>
            </tr>      
            `;
        }
    }
    displaySubCategoriesTable.innerHTML = result ; 
}
function dropDownCategory(index){
    console.log("dropdown" + index);
    dropDown = document.getElementsByClassName("subCategoryDropDown");
    var result='' ; 
    result+=`
        <li>this is list</li>
        <li>this is list</li>
        <li>this is list</li>
    `;
    dropDown.innerHTML = result ; 
}
function getSubData(index){
    var Subcategory = subCategories[index];
    SubcategoryInput.value =Subcategory.SubcategoryName ; 
    addSubCategoryBtn.innerHTML = "update" ; 
    categorySubId = index ;
}

function updateSubCategory(){
    var Subcategory={
        SubcategoryName: SubcategoryInput.value,
    }
    subCategories[categorySubId].SubcategoryName = Subcategory.SubcategoryName ; 
    localStorage.setItem("SubCategoriesList", JSON.stringify(subCategories));
    addSubCategoryBtn.innerHTML = "Add" ; 
    SubcategoryInput.value='';
}

function searchSubCategory(name){
    var result = "" ; 
    for (i = 0 ; i < subCategories.length ; i++){
        if (subCategories[i].SubcategoryName.toLowerCase().includes(name.toLowerCase())){
            result += `  
            <tr class="text-center">
                <td class="col-4" >${i}</td>
                <td class="col-4">${subCategories[i].SubcategoryName}</td>
                <td><button class="admin-categories-btn" onclick=getSubData(${i})><i class="fa-solid fa-pen"></i></button></td>
                <td><button class="admin-categories-btn" onclick=deleteSubCategory(${i})><i class="fa fa-solid fa-trash"></i></button></td>
                <td><button class="admin-categories-btn" onclick="displaySubSubCategories(${i})">+</button></td>
            </tr>      
            `;
    }
}
    displaySubCategoriesTable.innerHTML = result ;  
}

/*end sub categories section*/

/*start sub sub categories section */
/*display data form local storage when open the page*/
subCategoryId= 0 ; 
childId=0 ; 
if(localStorage.getItem("SubSubCategoriesList") == null){
    var subSubCategories=[];
}else{
    subSubCategories = JSON.parse(localStorage.getItem("SubSubCategoriesList"));
    displaySubData(subCategoryId);  
    displaySubCategoryName(subCategoryId);
}
/*add sub sub categories btn click event */
addSubSubCategoryBtn.onclick= function(){
    if(addSubSubCategoryBtn.innerText == "Add"){
        createSubSubCategory(subCategoryId) ; 
    }
    else{
        updateSubSubCategory();
    }    
    displaySubData(subCategoryId); 
}
/*display sub sub categories data */
function displaySubSubCategories(index){
    subCategoryId=index;
    if(localStorage.getItem("SubSubCategoriesList") == null){
        var subSubCategories=[];
    }else{
        subSubCategories = JSON.parse(localStorage.getItem("SubSubCategoriesList"));
        displaySubData(subCategoryId);  
        displaySubCategoryName(subCategoryId);
    }
}
/*display sub category name function */
function displaySubCategoryName(index){
    subcategoryName.innerHTML= subCategories[index].SubcategoryName;
}
/*create sub sub categories function */
function createSubSubCategory(index){
    var SubSubcategory={
        SubSubcategoryName: SubSubcategoryInput.value,
        subCategoryId:index,
    } 
    subSubCategories.push(SubSubcategory);
    localStorage.setItem("SubSubCategoriesList", JSON.stringify(subSubCategories));
    displaySubData(index);
    SubSubcategoryInput.value='';
}
/*display sub sub categories function */
function displaySubData(index){
    console.log("sub data"+index);
    var result = "" ; 
    for (i = 0 ; i < subSubCategories.length ; i++){
        if(subSubCategories[i].subCategoryId == index){
            result += `  
            <tr class="text-center">
                <td class="col-4" >${i}</td>
                <td class="col-4">${subSubCategories[i].SubSubcategoryName}</td>
                <td><button class="admin-categories-btn" onclick=getSubSubData(${i})><i class="fa-solid fa-pen"></i></button></td>
                <td><button class="admin-categories-btn" onclick=deleteSubSubCategory(${i})><i class="fa fa-solid fa-trash"></i></button></td>
            </tr>      
            `;
        }
    }
    displaySubSubCategoriesTable.innerHTML =""+ result ; 
}
function searchSubSubCategory(name){
    var result = "" ; 
    for (i = 0 ; i < subSubCategories.length ; i++){
        if (subSubCategories[i].SubSubcategoryName.toLowerCase().includes(name.toLowerCase())){
            result += `  
            <tr class="text-center">
                <td class="col-4" >${i}</td>
                <td class="col-4">${subSubCategories[i].SubSubcategoryName}</td>
                <td><button class="admin-categories-btn" onclick=getSubSubData(${i})><i class="fa-solid fa-pen"></i></button></td>
                <td><button class="admin-categories-btn" onclick=deleteSubSubCategory(${i})><i class="fa fa-solid fa-trash"></i></button></td>
            </tr>      
            `;
    }
}
    displaySubCategoriesTable.innerHTML = result ;  
}

/*get data to update sub sub categories function */
function getSubSubData(index){
    var SubSubcategory = subSubCategories[index];
    SubSubcategoryInput.value =SubSubcategory.SubSubcategoryName ; 
    addSubSubCategoryBtn.innerHTML = "update" ; 
    childId = index ;
}
/*update sub sub categories function*/
function updateSubSubCategory(){
  
    var SubSubcategory={
        SubSubcategoryName: SubSubcategoryInput.value,
    }
    subSubCategories[childId].SubSubcategoryName = SubSubcategory.SubSubcategoryName ; 
    localStorage.setItem("SubSubCategoriesList", JSON.stringify(subSubCategories));
    displaySubData(); 

    addSubSubCategoryBtn.innerHTML = "Add" ; 
    SubSubcategoryInput.value='';
}
/*delete sub sub categories function*/
function deleteSubSubCategory(index ){
    subSubCategories.splice(index,1);
    localStorage.setItem("SubSubCategoriesList", JSON.stringify(subSubCategories));
    window.alert("deleted done successfully");
    displaySubData(subCategoryId) ; 
}
function deleteSubCategory(index ){

    if(checkSubSubCategories(index)){
        console.log("");
        window.alert("there's elements, can't deleted");
    }else{
        subCategories.splice(index,1);
        localStorage.setItem("SubCategoriesList", JSON.stringify(subCategories));
        window.alert("deleted done successfully");
        displayData(categoryId) ;
    }
}
function checkSubSubCategories(index){
    for (i=0 ; i <subSubCategories.length;i++){
        if(subSubCategories[i].subCategoryId == index ){
           return true;
        }  
    }
    return false;
}
/*category delete function */
function deleteCategory(index ){

    if(checkSubCategories(index)){
        console.log("");
        window.alert("there's elements, can't deleted");
    }else{
        console.log("deleted");
        categories.splice(index,1);
        localStorage.setItem("categoriesList", JSON.stringify(categories));
        window.alert("deleted done successfully");

        displayCategories() ; 
    }
}
function checkSubCategories(index){
    for (i=0 ; i <subCategories.length;i++){
        if(subCategories[i].categoryId == index ){
           return true;
        }  
    }
    return false;
}
/*end sub sub categories section */
