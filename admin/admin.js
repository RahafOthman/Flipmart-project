var categorieBtn = document.getElementById("admin-categorie");
var accountBtn = document.getElementById("admin-account");

categorieBtn.onclick = function(){
    console.log("this is cat btn");
    Location.hrer="/categorie.html";
}
accountBtn.onclick = function(){
    console.log("this is account btn");
    Location.hrer = "/account.html"
}


var categories = [] ; 
var subCategories=[] ; 
var subSubCategories=[] ;

/*sub categories variable */
var SubcategoryInput = document.getElementById("sub-category-input");
var addSubCategoryBtn = document.getElementById("add-sub-category");
var displaySubCategoriesDiv = document.getElementById("display-sub-categories");
var displaySubCategoriesTable = document.getElementById("display-sub-categories-table");
/*sub categories variable */
/* categories variable */

curentIndex = 0 ;  
var categoryInput = document.getElementById("category-input");
var addCategoryBtn = document.getElementById("add-category");
var displayCategoriesDiv = document.getElementById("display-categories");
/* categories variable */

/*start categories section*/

if (localStorage.getItem("categoriesList") == null ){
    var categories = [] ; 
}else {
    categories = JSON.parse(localStorage.getItem("categoriesList"));
    displayCategories() ; 
    categoriesHomeItems();
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
        result += `  
        <tr class="text-center">
            <td class="col-4" >${i}</td>
            <td class="col-4">${categories[i].categoryName}</td>
            <td><button class="admin-categories-btn" onclick=getData(${i})><i class="fa-solid fa-pen"></i></button></td>
            <td><button class="admin-categories-btn" onclick="deleteCategory(${i})"><i class="fa fa-solid fa-trash"></i></button></td>
            <td><button class="admin-categories-btn" onclick="displaySubCategories(${i})">+</button></td>
        </tr>      
        `;
    }
    displayCategoriesDiv.innerHTML = result ; 
}

function deleteCategory(index ){
    categories.splice(index,1);
    localStorage.setItem("categoriesList", JSON.stringify(categories));
    displayCategories() ; 
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
    console.log("name: "+categories[curentIndex]);
    console.log("      "+category.categoryName);
    categories[curentIndex].categoryName = category.categoryName ; 
    localStorage.setItem("categoriesList", JSON.stringify(categories));
    addCategoryBtn.innerHTML = "Add Category" ; 
    categoryInput.value='';
}
/*end categories section*/
/*display categories in home page*/


function categoriesHomeItems(){
    console.log("homepage");
    var categoriesItems = document.getElementById("home-page-categories-items");
    var result = "" ; 
    for (i = 0 ; i < categories.length ; i++){
        result += `  
        <li>${categories[i].categoryName}</li>     
        `;
    }
    categoriesItems.innerHTML = result ; 
}
/*display categories in home page*/
/*start sub categories section*/
categoryId = 0 ;
var categoryName = document.getElementById("category-name");

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
        updateSubCategory();
    }    
    console.log("after updated"+categoryId);

    displayData(categoryId); 

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

function displayData(index){
    var result = "" ; 
    for (i = 0 ; i < subCategories.length ; i++){
        if(subCategories[i].categoryId == index){
            result += `  
            <tr class="text-center">
                <td class="col-4" >${i}</td>
                <td class="col-4">${subCategories[i].SubcategoryName}</td>
                <td><button class="admin-categories-btn" onclick=getSubData(${i})><i class="fa-solid fa-pen"></i></button></td>
                <td><button class="admin-categories-btn" onclick=deleteSubCategory(${i})><i class="fa fa-solid fa-trash"></i></button></td>
                <td>
                <button class="admin-categories-btn" onclick=dropDownCategory(${i})>
                    <i class="fa fa-thin fa-angle-down" dropDownCategory(${i})>
                        <ul class="subCategoryDropDown">
                        </ul>
                    </i>
                </button>
                </td>
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
    categoryId = index ;
}

function updateSubCategory(){
  
    var Subcategory={
        SubcategoryName: SubcategoryInput.value,
    }
    
    subCategories[categoryId].SubcategoryName = Subcategory.SubcategoryName ; 
    localStorage.setItem("SubCategoriesList", JSON.stringify(subCategories));
    console.log(categoryId);
    addSubCategoryBtn.innerHTML = "Add" ; 
    SubcategoryInput.value='';
}

function deleteSubCategory(index ){
    subCategories.splice(index,1);
    localStorage.setItem("SubCategoriesList", JSON.stringify(subCategories));

    displayData(categoryId) ; 
}
/*end sub categories section*/