const slider = tns({
    container: '.carousel_inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    nav: false,
    controls: false,
    responsive: {
        640: {
          edgePadding: 30,
          gutter: 20,
          items: 1
        },
        700: {
          gutter: 30
        },
        900: {
          items: 1
        }
      }
});
document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });
  
  (function($) {
    $(function() {

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
      
    });
    })(jQuery);

  
    function toggleClass (item) {
      $(item).each(function (i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  
        })
      })
    }
toggleClass('.catalog-item__link');
toggleClass('.catalog-item__back');

//modal
$('[data-modal=consultation').on('click', function() {
  $('.overlay, #consultation').fadeIn('fast');
})

$('.modal__close').on('click', function() {
  $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
 })



 $('.button_mini').each(function(i) {
   $(this).on('click', function() {
    $('#order .modal__descr').text($('.catalog-item__subtittle').eq(i).text());
    $('.overlay, #order').fadeIn('fast');
  })
 });

 $('form').submit(function(e){
   e.preventDefault();
   $.ajax({
     type: "POST",
     url: "mailer/smart.php",
     data: $(this).serialize() 
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();


      $('form').trigger('reset');
    });
    return false;
 });

 //arrow up and smoothly
$(window).scroll(function() {
  if ($(this).scrollTop() > 1600) {
    $(".pageup").fadeIn();
  } else {
    $(".pageup").fadeOut()
  }
});

$(document).ready(function(){
  // Добавить плавную прокрутку до всех ссылок
  $("a").on('click', function(event) {

    // Убедись в этом что .hash имеет значение перед переопределением поведения по умолчанию
    if (this.hash !== "") {
      // Запретить поведение щелчка якоря по умолчанию
      event.preventDefault();

      // Хранить хэш
      var hash = this.hash;

      // Использование метода animate() jQuery для добавления плавной прокрутки страницы
      // Необязательное число (800) указывает количество миллисекунд, необходимых для прокрутки до указанной области
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Добавить хэш (#) для URL-адреса после завершения прокрутки (поведение щелчка по умолчанию)
        window.location.hash = hash;
      });
    } // Конец, если
  });
});