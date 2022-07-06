$(document).ready(function(){
    setTimeout(()=>{
        $('body').css("overflow","auto");
        $('.loader > div').fadeOut(1200, function(){
            $('.loader').fadeOut(2000, function(){
                $('div').remove('.loader');
            }); 
        });
    }, 2000)

});