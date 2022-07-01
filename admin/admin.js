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