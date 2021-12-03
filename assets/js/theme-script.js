/* ------------------------------------------------
  Project:   Winck - Bootstrap 5 Multipurpose Landing Page
  Author:    ThemeHt
------------------------------------------------ */
/* ------------------------
    Table of Contents

  1. Predefined Variables
  2. Preloader  
  3. FullScreen
  4. Counter
  5. Owl carousel
  6. Testimonial Carousel
  7. Dropdown
  8. Magnific Popup
  9. Scroll to top
  10. Fixed Header
  11. Text Color, Background Color And Image
  12. Contact Form
  13. Countdown
  14. Rangeslider
  15. Btnproduct
  16. LightSlider
  17. Wow Animation
  18. Particles
  19. Window load and functions
  

------------------------ */

"use strict";

/*------------------------------------
  HT Predefined Variables
--------------------------------------*/
var $window = $(window),
  $document = $(document),
  $body = $('body'),
  $fullScreen = $('.fullscreen-banner') || $('.section-fullscreen'),
  $halfScreen = $('.halfscreen-banner');

//Check if function exists
$.fn.exists = function () {
  return this.length > 0;
};


/*------------------------------------
  HT PreLoader
--------------------------------------*/
function preloader() {
  $('#ht-preloader').fadeOut();
};

/*------------------------------------
  HT FullScreen
--------------------------------------*/
function fullScreen() {
  if ($fullScreen.exists()) {
    $fullScreen.each(function () {
      var $elem = $(this),
        elemHeight = $window.height();
      if ($window.width() < 768) $elem.css('height', elemHeight / 1);
      else $elem.css('height', elemHeight);
    });
  }
  if ($halfScreen.exists()) {
    $halfScreen.each(function () {
      var $elem = $(this),
        elemHeight = $window.height();
      $elem.css('height', elemHeight / 2);
    });
  }
};


/*------------------------------------
  HT Counter
--------------------------------------*/
function counter() {
  $('.count-number').countTo({
    refreshInterval: 2
  });
};


/*------------------------------------
  HT Owl Carousel
--------------------------------------*/
function owlcarousel() {
  $('.owl-carousel').each(function () {
    var $carousel = $(this);
    $carousel.owlCarousel({
      items: $carousel.data("items"),
      slideBy: $carousel.data("slideby"),
      center: $carousel.data("center"),
      loop: true,
      margin: $carousel.data("margin"),
      dots: $carousel.data("dots"),
      nav: $carousel.data("nav"),
      autoplay: $carousel.data("autoplay"),
      autoplayTimeout: $carousel.data("autoplay-timeout"),
      navText: ['<span class="la la-angle-left"><span>', '<span class="la la-angle-right"></span>'],
      responsive: {
        0: {
          items: $carousel.data('xs-items') ? $carousel.data('xs-items') : 1
        },
        576: {
          items: $carousel.data('sm-items')
        },
        768: {
          items: $carousel.data('md-items')
        },
        1024: {
          items: $carousel.data('lg-items')
        },
        1200: {
          items: $carousel.data("items")
        }
      },
    });
  });
};

/*------------------------------------
  HT Testimonial Carousel
--------------------------------------*/
function testimonialcarousel() {
  $('.testimonial-carousel').on('slide.bs.carousel', function (evt) {
    $('.testimonial-carousel .controls li.active').removeClass('active');
    $('.testimonial-carousel .controls li:eq(' + $(evt.relatedTarget).index() + ')').addClass('active');
  })
};



/*------------------------------------
  HT Dropdown
--------------------------------------*/
function dropdown() {
  $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');

    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
      $('.dropdown-submenu .show').removeClass("show");
    });

    return false;
  });
};


/*------------------------------------
  HT Magnific Popup
--------------------------------------*/
function magnificpopup() {
  $('.popup-gallery').magnificPopup({
    delegate: 'a.popup-img',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function (item) {
        return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
      }
    }
  });
  if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  }

};


/*------------------------------------
  HT Scroll to top
--------------------------------------*/
function scrolltop() {
  var pxShow = 300,
    goTopButton = $(".scroll-top")
  // Show or hide the button
  if ($(window).scrollTop() >= pxShow) goTopButton.addClass('scroll-visible');
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= pxShow) {
      if (!goTopButton.hasClass('scroll-visible')) goTopButton.addClass('scroll-visible')
    } else {
      goTopButton.removeClass('scroll-visible')
    }
  });
  $('.smoothscroll').on('click', function (e) {
    $('body,html').animate({
      scrollTop: 0
    }, 3000);
    return false;
  });
};


/*------------------------------------
  HT Fixed Header
--------------------------------------*/
function fxheader() {
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 300) {
      $('#header-wrap').addClass('fixed-header');
    } else {
      $('#header-wrap').removeClass('fixed-header');
    }
  });
};


/*------------------------------------------
  HT Text Color, Background Color And Image
---------------------------------------------*/
function databgcolor() {
  $('[data-bg-color]').each(function (index, el) {
    $(el).css('background-color', $(el).data('bg-color'));
  });
  $('[data-text-color]').each(function (index, el) {
    $(el).css('color', $(el).data('text-color'));
  });
  $('[data-bg-img]').each(function () {
    $(this).css('background-image', 'url(' + $(this).data("bg-img") + ')');
  });
};


/*------------------------------------
  HT Contact Form
--------------------------------------*/
function contactform() {
  $('#contact-form').validator();

  // when the form is submitted
  $('#contact-form').on('submit', function (e) {

    // if the validator does not prevent form submit
    if (!e.isDefaultPrevented()) {
      var url = "php/contact.php";

      // POST values in the background the the script URL
      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function (data) {
          // data = JSON object that contact.php returns

          // we recieve the type of the message: success x danger and apply it to the 
          var messageAlert = 'alert-' + data.type;
          var messageText = data.message;

          // let's compose Bootstrap alert box HTML
          var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

          // If we have messageAlert and messageText
          if (messageAlert && messageText) {
            // inject the alert to .messages div in our form
            $('#contact-form').find('.messages').html(alertBox).show().delay(2000).fadeOut('slow');
            // empty the form
            $('#contact-form')[0].reset();
          }
        }
      });
      return false;
    }
  })
};


/*------------------------------------
  HT Countdown
--------------------------------------*/
function countdown() {
  $('.countdown').each(function () {
    var $this = $(this),
      finalDate = $(this).data('countdown');
    $this.countdown(finalDate, function (event) {
      $(this).html(event.strftime('<li><span>%-D</span><p>Days</p></li>' + '<li><span>%-H</span><p>Hours</p></li>' + '<li><span>%-M</span><p>Minutes</p></li>' + '<li><span>%S</span><p>Seconds</p></li>'));
    });
  });
};



/*------------------------------------
  HT btnproduct
--------------------------------------*/
function btnproduct() {
  $('.btn-product-up').on('click', function (e) {
    e.preventDefault();
    var numProduct = Number($(this).next().val());
    if (numProduct > 1) $(this).next().val(numProduct - 1);
  });
  $('.btn-product-down').on('click', function (e) {
    e.preventDefault();
    var numProduct = Number($(this).prev().val());
    $(this).prev().val(numProduct + 1);
  });
};


/*------------------------------------
  HT LightSlider
--------------------------------------*/
function lightSlider() {
  $('#imageGallery').lightSlider({
    gallery: true,
    item: 1,
    verticalHeight: 450,
    thumbItem: 4,
    slideMargin: 0,
    speed: 600,
    autoplay: true,
  });
};



/*------------------------------------
  HT Wow Animation
--------------------------------------*/
function wowanimation() {
  var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: false,
    live: true
  });
  wow.init();
}

/*------------------------------------
  HT Particles
--------------------------------------*/

function particles() {
  jQuery("#particles-js").each(function () {
    particlesJS({
      "particles": {
        "number": {
          "value": 160,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#01a479"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#ffffff"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 1,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 4,
            "size_min": 0.3,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 600
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "bubble"
          },
          "onclick": {
            "enable": true,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 250,
            "size": 0,
            "duration": 2,
            "opacity": 0,
            "speed": 3
          },
          "repulse": {
            "distance": 400,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });

  })
}


/*------------------------------------
  HT Window load and functions
--------------------------------------*/
$(document).ready(function () {
  fullScreen(),
    owlcarousel(),
    counter(),
    testimonialcarousel(),
    dropdown(),
    magnificpopup(),
    scrolltop(),
    fxheader(),
    databgcolor(),
    contactform(),
    countdown(),
    btnproduct(),
    lightSlider(),
    particles();
});


$window.resize(function () { });


/*------------------------------------
 Change language 
--------------------------------------*/
function changeLanguage(lang) {
  location.hash = lang;
  location.reload();
}
$(window).on('load', function () {
  preloader(),
    wowanimation();
});
var current_active = 'Orders_features'
var language = {
  Ar: {
    nav: {
      nav_Home: "الرئيسية",
      nav_service: "الخدمات",
      nav_about_us: "من نحن",
      nav_contact: "تواصل معنا"

    },
    header: {
      heder_title: "شركة الدرة الانشائية",
      header_body: "شركة متخصصة في جميع اعمال البناء والصيانة والنظافة وخدمات التشغيل المتخصصة وإدارة المشاريع",
      contcat_us: "تواصل معنا "
    },
    about_us: {
      aboutHeader_1: ". من نحــــن",
      aboutbody_1: " شركة الدرة الانشائية متخصصة في جميع اعمال البناء والصيانة والنظافة وخدمات التشغيل المتخصصة وإدارة المشاريع ونقوم بتقديم خدمات فورية ذات جودة عالية مع الاهتمام بأدق ِ التفاصيل ، وذلك عن طريق فرق العمل المتخصصة لدينا والمدربة على أحدث الانظمة والتقنيات الحديثة من مهندسين وفنيين وعمال ومشرفين وموظفين وخدمة عملاء في جميع محافظات دولة الكويت .",

      aboutHeader_2: ". رؤيــتنا",
      aboutbody_2: " تتطلع شركة الدرة الانشائية الى التوسع في الأعمال المستقبلية المتطوره مع رؤية الدولة (2035) التي تسعى الى تطبيق التكنولوجيا والطاقة البديلة الصديقة للبيئة وتنفيذ الأفكار الذكية في مشاركتها للشركات الناجحة ; لكي تصل لأعلى المستويات الاقليمية لتقديم الخدمات بأعلي جودة واحترافية .",

      aboutHeader_3: ". رسالـتنا",
      aboutbody_3_1: " نشر ثقافة الجودة بمفهومها الحقيقي في مجال المقاولات العامة في دولة الكويت .",
      aboutbody_3_2: "  خلق تنافس حقيقي بين كافة الشركات ّ والمؤسسات التي تقدم خدمات المقاولات العامة .",
      aboutbody_3_3: " توفير خدمات متميزة لجميع القطاعات العام والخاص والافراد .",

      aboutHeader_4: " . هدفــنا",
      aboutbody_4_1: "بناء شراكات طويلة الامد مع الكثير من عملائها في دولة الكويت .",
      aboutbody_4_2: " تلبية طموحات واحتياجات عملائها الحالية والمستقبلية .",
      aboutbody_4_3: " السير وفق خطة منظمة لتوسيع نشاطاتها ولتغطي خدماتها كافة ارجاء دولة الكويت ."

    },
    service: {
      s_heder: "الخـــدمات",
      s_subheader: "نعمل وفقا للقيم العالمية ، مع الالتزام بأعلى المعايير الأخلاقية",
      f_header_1: "المخططات الهندسية",
      f_body_1: "   تعتمد التصامیم والمخططات على ایدي مهندسین ذوي خبرة وکفائة عالیة في عمل المخططات المعماریة التکنولوجیة والانشائیة بستخدام احدث البرامج",
      f_header_2: "الإنشاءات",
      f_body_2: "تتمـثل هذه الاعمال في تنــفیذ اعمال التسلیح لمختلف المباني والمنشئات مع عمل کل ما یتعلق بالبنیة التحتیة وفق المعاییر المعماریة ",
      f_header_3: "التشطيبات العامة",
      f_body_3: "یراعی في اعمال التشطیبات العامة تورید أعلى المواد جودة في السوق المحلي او السوق العالمي للطلبات الخاصة وتنفیذها تحت اشراف مهندسین متخصصین وعلى ایدي فنیین ذوي خبرة وکفائة عالیة ",
      f_header_4: "تنفيذ المشاريع",
      f_body_4: "تقوم شرکة الدرة الانشائیة بالإدارة على تنفيذ المشاريع ومتابعة تنفيذ الخطط التفصيلية للأعمال , والقيام بالمتابعة الميدانية لأعمال المقاولين والاستشاريين للتأكد من التزام في التنفيذ وفق متطلبات العقود المبرمة من حيث الشروط والمواصفات الفنية والبرامج الزمنية "
    },
    contact: {
      contact_header: "تواصل معنا",
      user_name_: "الاسم",
      user_phone_: "رقم الهاتف",
      message_: "الرسالة",
      user_email_: "البريد ",
      address_conatct: "العقيلة - مجمع الدرة- برج اي - الدور4 - مكتب 2"


    },
    footer: {
      header_footer: "شركة الدرة الانشائية",
      address_footer: "العقيلة - مجمع الدرة- برج  - الدور4 - مكتب 2",
      copyright_footer: "©2021 جميع الحقوق محفوظة"
    }
  },
  Eng: {
    nav: {
      nav_Home: "Home",
      nav_service: "Service",
      nav_about_us: "About ",
      nav_contact: "Contact "
    },
    header: {
      heder_title: "Al-Durra Construction Company ",
      header_body: "Construction company working in all construction, maintenance, cleaning, operating services and project management",
      contcat_us: "Contact us "
    },
    about_us: {
      aboutHeader_1: " Who we are",
      aboutbody_1: "Al-Durra Company is a construction company working in all construction, maintenance, cleaning, operating services and project management, and it provide immediate services of high quality with attention to the smallest details, and thid is through specialized work teams and trained on the latest systems and modern technologies, including engineers, technicians, workers, supervisors, employees and customer service in all governorates of the State of Kuwait .",

      aboutHeader_2: " Our Vision",
      aboutbody_2: "Al-Durra Construction Company is looking forward to expanding in the developed future business with the state’s vision (2035), which seeks to apply technology and alternative environmentally friendly energy and implement smart ideas in its participation in successful companies; in order to reach the highest regional levels to provide services of the highest quality and professionalism .  ",

      aboutHeader_3: "Our mission",
      aboutbody_3_1: "publishing  the culture of quality in its true sense in the field of general contracting in the State of Kuwait.",
      aboutbody_3_2: " Creating real competition between all companies and institutions that provide general contracting services. ",
      aboutbody_3_3: " Providing distinguished services to all public and private sectors and individuals .",

      aboutHeader_4: " Our Goal",
      aboutbody_4_1: " Building long-term partnerships with many of its clients in the State of Kuwait .",
      aboutbody_4_2: "  Meeting the aspirations and needs of its current and future clients .",
      aboutbody_4_3: "  Meeting the aspirations and needs of its current and future clients ."

    },
    service: {
      s_heder: "Service",
      s_subheader: "We work in accordance with universal values",
      f_header_1: "Engineering Charts",
      f_body_1: " The designs and schemes depend on the hands of experienced and efficient engineers in the work of architectural and construction plans using the latest technology programs.",
      f_header_2: "Construction",
      f_body_2: " These project is about consist in the implementation of repair work for various buildings and facilities, and carrying out everything related to the infrastructure in accordance with architectural standards .",
      f_header_3: "General finishes",
      f_body_3: " In general finishing works, it is taken into account to supply the highest quality materials in the local market or the international market for special requests and implement them under the supervision of specialized engineers and by highly qualified and experienced technicians . ",
      f_header_4: "Supervising the implementation of projects  ",
      f_body_4: " Al-Durra Construction Company manages the implementation of projects, follow-up on the implementation of detailed plans for works, and field follow-up to the work of contractors and consultants to ensure compliance in implementation in accordance with the requirements of the contracts concluded in terms of conditions, technical specifications and contractual time schedules ."
    },
    contact: {
      contact_header: "Contact Us",
      user_name_: "Name",
      user_phone_: "Phone",
      message_: "message",
      user_email_: "Email",
      address_conatct: "Egaila - Al-Durra Complex - Tower A - Floor 4 - Office 2"

    },
    footer: {
      header_footer: "Al-Durra Company",
      address_footer: "Egaila - Al-Durra Complex - Tower A - Floor 4 - Office 2",
      copyright_footer: " Copyright ©2021 All rights reserved "

    }

  },

};


if (window.location.hash) {

  if (window.location.hash == "#Ar") {

    nav_Home.textContent = language.Ar.nav.nav_Home;
    nav_service.textContent = language.Ar.nav.nav_service;
    nav_about_us.textContent = language.Ar.nav.nav_about_us;

    heder_title.textContent = language.Ar.header.heder_title;
    header_body.textContent = language.Ar.header.header_body;
    contcat_us.textContent = language.Ar.header.contcat_us;

    aboutHeader_1.textContent = language.Ar.about_us.aboutHeader_1;
    aboutbody_1.textContent = language.Ar.about_us.aboutbody_1;

    aboutHeader_2.textContent = language.Ar.about_us.aboutHeader_2;
    aboutbody_2.textContent = language.Ar.about_us.aboutbody_2;

    aboutHeader_3.textContent = language.Ar.about_us.aboutHeader_3;
    aboutbody_3_1.textContent = language.Ar.about_us.aboutbody_3_1;
    aboutbody_3_2.textContent = language.Ar.about_us.aboutbody_3_2;
    aboutbody_3_3.textContent = language.Ar.about_us.aboutbody_3_3;

    aboutHeader_4.textContent = language.Ar.about_us.aboutHeader_4;
    aboutbody_4_1.textContent = language.Ar.about_us.aboutbody_4_1;
    aboutbody_4_2.textContent = language.Ar.about_us.aboutbody_4_2;
    aboutbody_4_3.textContent = language.Ar.about_us.aboutbody_4_3;

    aboutHeader_4.textContent = language.Ar.about_us.aboutHeader_4;
    aboutbody_4_1.textContent = language.Ar.about_us.aboutbody_4_1;
    aboutbody_4_2.textContent = language.Ar.about_us.aboutbody_4_2;
    aboutbody_4_3.textContent = language.Ar.about_us.aboutbody_4_3;


    contact_header.textContent = language.Ar.contact.contact_header;
    user_name_.textContent = language.Ar.contact.user_name_;
    user_phone_.textContent = language.Ar.contact.user_phone_;
    user_email_.textContent = language.Ar.contact.user_email_;
    message_.textContent = language.Ar.contact.message_;


    var address_footer = document.getElementById('address_footer');
    var address_footer_AR = document.createElement('span');
    en_op.innerHTML = ` <span id="address_footer" class=" text-cutome2">
    الدور4 -  مكتب 2 - A برج  <span style="font-size: 0.1rem; color: transparent;">A</span> - العقيلة - مجمع الدره
 
  </span>`;


    address_footer.parentNode.replaceChild(address_footer, address_footer_AR);

    
    address_conatct.textContent = language.Ar.contact.address_conatct;

    var address_conatct = document.getElementById('address_conatct');
    var address_footer_AR = document.createElement('span');
    en_op.innerHTML = ` <span id="address_footer" class=" text-cutome2">

    الدور4 -  مكتب 2 - A برج  <span style="font-size: 0.1rem; color: transparent;">A</span> - العقيلة - مجمع الدره
   
  </span>`;


    address_footer.parentNode.replaceChild(address_footer, address_footer_AR);

    


    s_heder.textContent = language.Ar.service.s_heder;
    s_subheader.textContent = language.Ar.service.s_subheader;

    f_header_1.textContent = language.Ar.service.f_header_1;
    f_body_1.textContent = language.Ar.service.f_body_1;

    f_header_2.textContent = language.Ar.service.f_header_2;
    f_body_2.textContent = language.Ar.service.f_body_2;

    f_header_3.textContent = language.Ar.service.f_header_3;
    f_body_3.textContent = language.Ar.service.f_body_3;

    f_header_4.textContent = language.Ar.service.f_header_4;
    f_body_4.textContent = language.Ar.service.f_body_4;

    header_footer.textContent = language.Ar.footer.header_footer;



    copyright_footer.textContent = language.Ar.footer.copyright_footer;

    send.textContent = 'إرسال'

    document.getElementById('navbarNav').classList.remove("direng")
    document.getElementById('navbarNav').classList.add("dirAR")

    document.getElementById('header_body').classList.remove("header-secondry_eng")
    document.getElementById('header_body').classList.add("header-secondry_ar")

    document.getElementById('contcat_Us').classList.remove("contact_eng")
    document.getElementById('contcat_Us').classList.add("contact_ar")


    document.getElementById('aboutHeader_1').classList.remove("header-secondry_eng")
    document.getElementById('aboutHeader_1').classList.add("header-secondry_ar")

    document.getElementById('aboutbody_1').classList.remove("direng_about")
    document.getElementById('aboutbody_1').classList.add("dirAR_about")

    document.getElementById('aboutbody_2').classList.remove("direng_about")
    document.getElementById('aboutbody_2').classList.add("dirAR_about")

    document.getElementById('row_about').classList.remove("direng_about")
    document.getElementById('row_about').classList.add("dirAR_about")


    document.getElementById('row_about2').classList.remove("direng_about")
    document.getElementById('row_about2').classList.add("dirAR_about")

    document.getElementById('aboutHeader_2').classList.remove("header-secondry_eng")
    document.getElementById('aboutHeader_2').classList.add("header-secondry_ar")

    document.getElementById('aboutHeader_3').classList.remove("header-secondry_eng")
    document.getElementById('aboutHeader_3').classList.add("header-secondry_ar")

    document.getElementById('aboutHeader_4').classList.remove("header-secondry_eng")
    document.getElementById('aboutHeader_4').classList.add("header-secondry_ar")
    //
    document.getElementById('f_body_4').classList.remove("text-left")
    document.getElementById('f_body_4').classList.add("text-right")

    document.getElementById('f_body_3').classList.remove("text-left")
    document.getElementById('f_body_3').classList.add("text-right")

    document.getElementById('f_body_2').classList.remove("text-left")
    document.getElementById('f_body_2').classList.add("text-right")

    document.getElementById('f_body_1').classList.remove("text-left")
    document.getElementById('f_body_1').classList.add("text-right")
    //

    document.getElementById('f_body_1').classList.remove("text-left")
    document.getElementById('f_body_1').classList.add("text-right")

    document.getElementById('container_contact').classList.remove("custome-c")

    document.getElementById('card2').classList.remove("cardeng")
    document.getElementById('card2').classList.add("cardAR")

    document.getElementById('card3').classList.remove("cardeng")
    document.getElementById('card3').classList.add("cardAR")

    document.getElementById('card4').classList.remove("cardeng")
    document.getElementById('card4').classList.add("cardAR")

    selectdlang.textContent = "العربية"
    var ar_op = document.getElementById('ar_op');
    var en_op = document.createElement('a');
    en_op.innerHTML = `<a style="padding-left: 2px;
        margin-left: 9px;" id="eng_op"  class="dropdown-item" onclick="changeLanguage('eng')" href="main#eng"><img class="img-fluid" width="20px" src="assets/images/icon/united-kingdom.svg" alt=""> English</a>`;
    ar_op.parentNode.replaceChild(ar_op, en_op);

  } else if (window.location.hash == "#Eng") {
    document.getElementById('navbarNav').classList.remove("dirAR")
    document.getElementById('navbarNav').classList.add("direng")

    document.getElementById('header_body').classList.remove("header-secondry_ar")
    document.getElementById('header_body').classList.add("header-secondry_eng")


    document.getElementById('contcat_Us').classList.remove("contact_ar")
    document.getElementById('contcat_Us').classList.add("contact_eng")


    document.getElementById('aboutHeader_1').classList.remove("header-secondry_ar")
    document.getElementById('aboutHeader_1').classList.add("header-secondry_eng")

    document.getElementById('row_about').classList.remove("dirAR_about")
    document.getElementById('row_about').classList.add("direng_about")


    document.getElementById('row_about2').classList.remove("dirAR_about")
    document.getElementById('row_about2').classList.add("direng_about")

    document.getElementById('aboutHeader_2').classList.remove("header-secondry_ar")
    document.getElementById('aboutHeader_2').classList.add("header-secondry_eng")

    document.getElementById('aboutbody_1').classList.remove("dirAR_about")
    document.getElementById('aboutbody_1').classList.add("direng_about")

    document.getElementById('aboutbody_2').classList.remove("dirAR_about")
    document.getElementById('aboutbody_2').classList.add("direng_about")

    document.getElementById('aboutHeader_3').classList.remove("header-secondry_ar")
    document.getElementById('aboutHeader_3').classList.add("header-secondry_eng")

    document.getElementById('aboutHeader_4').classList.remove("header-secondry_ar")
    document.getElementById('aboutHeader_4').classList.add("header-secondry_eng")


    document.getElementById('container_contact').classList.add("custome-c")


    document.getElementById('f_body_1').classList.remove("text-right")
    document.getElementById('f_body_1').classList.add("text-left")

    document.getElementById('f_body_2').classList.remove("text-right")
    document.getElementById('f_body_2').classList.add("text-left")

    document.getElementById('f_body_3').classList.remove("text-right")
    document.getElementById('f_body_3').classList.add("text-left")

    document.getElementById('f_body_4').classList.remove("text-right")
    document.getElementById('f_body_4').classList.add("text-left")

    //

    document.getElementById('card1').classList.remove("cardAR")
    document.getElementById('card1').classList.add("cardeng")

    document.getElementById('card2').classList.remove("cardAR")
    document.getElementById('card2').classList.add("cardeng")

    document.getElementById('card3').classList.remove("cardAR")
    document.getElementById('card3').classList.add("cardeng")

    document.getElementById('card4').classList.remove("cardAR")
    document.getElementById('card4').classList.add("cardeng")

    document.getElementById('card2_3').classList.remove("cardAR2")
    document.getElementById('card2_3').classList.add("cardeng2")

    document.getElementById('card2_2').classList.remove("cardAR2")
    document.getElementById('card2_2').classList.add("cardeng2")

    document.getElementById('card2_1').classList.remove("cardAR2")
    document.getElementById('card2_1').classList.add("cardeng2")

    document.getElementById('message_goal').classList.remove("text-right")
    document.getElementById('message_goal').classList.add("text-left")

    document.getElementById('about_goal').classList.remove("text-right")
    document.getElementById('message_goal').classList.remove("text-right")


    document.getElementById('row_about2').classList.add("p-0")

    document.getElementById('row_about').classList.add("p-0")
    document.getElementById('message_goal').classList.add("p-0")


    selectdlang.textContent = "English"
    var eng_op = document.getElementById('eng_op');
    var ar_op = document.createElement('a');
    ar_op.innerHTML = `  
    <a style="font-size: 1rem;
    font-weight: 600;
    color: #666666;" id="ar_op" class="dropdown-item" onclick="changeLanguage('Ar')" href="#Ar">
    العربية</a>
 `;

    eng_op.parentNode.replaceChild(ar_op, eng_op);

    nav_Home.textContent = language.Eng.nav.nav_Home;
    nav_service.textContent = language.Eng.nav.nav_service;
    nav_about_us.textContent = language.Eng.nav.nav_about_us;
    nav_contact.textContent = language.Eng.nav.nav_contact;

    heder_title.textContent = language.Eng.header.heder_title;
    header_body.textContent = language.Eng.header.header_body;
    contcat_us.textContent = language.Eng.header.contcat_us;

    aboutHeader_1.textContent = language.Eng.about_us.aboutHeader_1;
    aboutbody_1.textContent = language.Eng.about_us.aboutbody_1;

    aboutHeader_2.textContent = language.Eng.about_us.aboutHeader_2;
    aboutbody_2.textContent = language.Eng.about_us.aboutbody_2;

    aboutHeader_3.textContent = language.Eng.about_us.aboutHeader_3;
    aboutbody_3_1.textContent = language.Eng.about_us.aboutbody_3_1;
    aboutbody_3_2.textContent = language.Eng.about_us.aboutbody_3_2;
    aboutbody_3_3.textContent = language.Eng.about_us.aboutbody_3_3;

    aboutHeader_4.textContent = language.Eng.about_us.aboutHeader_4;
    aboutbody_4_1.textContent = language.Eng.about_us.aboutbody_4_1;
    aboutbody_4_2.textContent = language.Eng.about_us.aboutbody_4_2;
    aboutbody_4_3.textContent = language.Eng.about_us.aboutbody_4_3;

    contact_header.textContent = language.Eng.contact.contact_header;
    user_name_.textContent = language.Eng.contact.user_name_;
    user_phone_.textContent = language.Eng.contact.user_phone_;
    user_email_.textContent = language.Eng.contact.user_email_;
    message_.textContent = language.Eng.contact.message_;

    
    var address_f = document.getElementById('address_footer');

    var address_ff = document.createElement('span');
    address_ff.innerHTML = ` <span id="address_footer" class=" text-cutome2">
    Egaila - Al-Durra Complex - Tower A - Floor 4 - Office 2   
  </span>`;


  address_f.parentNode.replaceChild(address_ff, address_f);

    

    var address_conatctf = document.getElementById('address_conatct');
    var address_conatct_en = document.createElement('span');
    address_conatct_en.innerHTML = ` <span id="address_footer" class=" text-cutome2">
    Egaila - Al-Durra Complex - Tower A - Floor 4 - Office 2   
  </span>`;


  address_conatctf.parentNode.replaceChild(address_conatct_en, address_conatctf);


    s_heder.textContent = language.Eng.service.s_heder;
    s_subheader.textContent = language.Eng.service.s_subheader;

    f_header_1.textContent = language.Eng.service.f_header_1;
    f_body_1.textContent = language.Eng.service.f_body_1;

    f_body_2.textContent = language.Eng.service.f_body_2;
    f_header_2.textContent = language.Eng.service.f_header_2;
    f_body_2.textContent = language.Eng.service.f_body_3;
    f_header_3.textContent = language.Eng.service.f_header_3;
    f_body_3.textContent = language.Eng.service.f_body_3;
    f_header_4.textContent = language.Eng.service.f_header_4;
    f_body_4.textContent = language.Eng.service.f_body_4;

    header_footer.textContent = language.Eng.footer.header_footer;
    address_footer.textContent = language.Eng.footer.address_footer;
    copyright_footer.textContent = language.Eng.footer.copyright_footer;

    send.textContent = 'Send'

  }



}



