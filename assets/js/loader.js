$(document).ready(function(){
    setTimeout(()=>{
        $('.loader > div').fadeOut(1200, () => {
            $('.loader').fadeOut(2000, () => {
                $('div').remove('.loader');
                $('body').css("overflow","auto");
                if(location.href.includes("index.html")){
                    Swal.fire({
                        icon: 'warning',
                        title: "You can login as admin to update the product's list\n\nEmail: admin@gmail.com\n\nPassword: admin",
                        showConfirmButton: false,
                        timer: 7500
                    });
                }
            }); 
        });
    }, 2000)

});
