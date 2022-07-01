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

