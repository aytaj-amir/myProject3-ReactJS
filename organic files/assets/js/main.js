/*header menu*/
$(document).ready(function($) {
 var mnav = document.querySelector('.mobilenav');
 var menu = document.querySelector('.menu');

 mnav.addEventListener('click',function(){
    menu.classList.toggle('navactive');
 });

});


/*slider-1*/

   $('.carousel').owlCarousel({
    loop:true,
    margin:10,
    autoplay:true,
    autoplaySpeed:500,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
});
   
   /*slider-2*/


  $('.loop').owlCarousel({
    center: true,
    items: 1,
    loop: true,
    margin: 10,
    responsive: {
      600: {
        items: 1
      }
    }
  });


$("#showMore").click(function(){
    $("#boxs .box:hidden").slice(0,3).slideDown();
    if($("#boxs .box:hidden").length == 0){
      $("#showMore").fadeOut("slow");
    }


})
 

         