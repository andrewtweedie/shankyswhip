(function ($) {
  $(function () {
    if ($(".product").length > 0) {
      function syncTitleHeight() {
        if ($(window).width() > 991) {
          let titleHeight = 0;
          $(".product").each(function () {
            let thisTitleHeight = $(this).find(".product__title").outerHeight();
            if (thisTitleHeight > titleHeight) {
              titleHeight = thisTitleHeight;
            }
          });
          $(".product__title").css("height", titleHeight + "px");
        }
      }
      syncTitleHeight();
      $(window).on("resize", syncTitleHeight());
    }

    var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split("&"),
        sParameterName,
        i;
      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split("=");
        if (sParameterName[0] === sParam) {
          return typeof sParameterName[1] === undefined
            ? true
            : decodeURIComponent(sParameterName[1]);
        }
      }
      return false;
    };

    $(".newsletter-close, .newsletter-bg").on("click", function () {
      $("#newsletter-modal").fadeOut();
      $(".newsletter-bg").fadeOut();
      Cookies.set("shankys-newsletter-modal", "shown", {
        expires: 3,
        path: "/",
      });
    });
    function checkNewsletter() {
      if (
        Cookies.get("shankys-newsletter-modal") !== "shown" &&
        top.location.pathname !== "/pages/privacy-policy"
      ) {
        setTimeout(function () {
          $("#newsletter-modal").fadeIn();
          $(".newsletter-bg").fadeIn();
        }, 5000);
      }
    }

    if (
      Cookies.get("shankys-age-verification") !== "true" &&
      top.location.pathname !== "/pages/privacy-policy" &&
      top.location.pathname !== "/pages/terms-of-use"
    ) {
      $(".age-gate-wrap").addClass("show-this");
    } else {
      checkNewsletter();
    }

    $(".yes-btn").on("click", function (e) {
      e.preventDefault();
      Cookies.set("shankys-age-verification", "true", { path: "/" });
      $(".age-gate-wrap").hide();
      $(".age-gate-wrap").removeClass("show-this");
      checkNewsletter();
    });

    if ($(".trigger-buy-modal").length > 0) {
      $(".trigger-buy-modal").on("click", function (e) {
        e.preventDefault();
        $("body").addClass("where-to-buy-shown");
        $(".buy-modal-bg").fadeIn();
      });
      $(".order-close-icon, .buy-modal-bg").on("click", function () {
        $("body").removeClass("where-to-buy-shown");
        $(".buy-modal-bg").fadeOut();
      });
    }

    // Phone nav click function
    $(".hamburger").click(function () {
      $("body").addClass("navShown");
    });
    $(".close-menu, .close-area").click(function () {
      $("body").removeClass("navShown");
    });

    if ($(".newsletter-item-wrap").length) {
      $(".newsletter-item-wrap").slick({
        arrows: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 1500,
        speed: 700,
        navigation: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 3,
            },
          },
        ],
      });

      $(window).on("resize", function () {
        $(".newsletter-item-wrap").slick("resize");
      });
    }

    var $animation_elements = $(".anim, .thumb-animate");
    var $window = $(window);

    function check_if_in_view() {
      var window_height = $window.height() / 1.3;
      var window_top_position = $window.scrollTop();
      var window_bottom_position = window_top_position + window_height;
      $.each($animation_elements, function () {
        var $element = $(this);
        var element_top_position = $element.offset().top;
        if (element_top_position <= window_bottom_position) {
          $element.addClass("in-view");
        } else {
        }
      });
    }
    $window.on("scroll resize", check_if_in_view);
    $window.trigger("scroll");

    if ($(".split-heading").length) {
      var res = Splitting({
        target: ".split-heading",
        by: "lines",
      });

      Splitting();

      res.forEach((splitResult) => {
        const wrappedLines = splitResult.lines
          .map(
            (wordsArr) => `
              <span class="line"><span class="mask-up">
              ${wordsArr
                .map(
                  (word) => `${word.outerHTML}<span class="whitespace">
              </span>`
                )
                .join("")}
              </span></span>`
          )
          .join("");
        splitResult.el.innerHTML = wrappedLines;
      });
      inView.threshold(0.75);
      inView(".split-heading").on("enter", function (el) {
        if (!el.classList.contains("has-animated")) {
          anime({
            targets: el.querySelectorAll(".mask-up"),
            translateY: ["100%", "0%"],
            duration: 700,
            delay: anime.stagger(500),
            easing: "easeOutQuad",
            autoplay: true,
          });
          el.classList.add("has-animated");
        }
      });
    }

    $(".cart-trigger").on("click", function () {
      $("body").addClass("cartShow");
    });
    $(".back-arrow, .product-cart-wrap").on("click", function () {
      $("body").removeClass("cartShow");
    });
    $(".product-cart-main-area").on("click", function (e) {
      e.stopPropagation();
    });

    // if ($('.merch-item-wrap').length) {
    //     $('.merch-item-wrap').slick({
    //         autoplay: false,
    //         autoplaySpeed: 1500,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         mobileFirst: true,
    //         arrows: false,
    //         dots:true,
    //         infinite: false,
    //         responsive: [
    //             {
    //                     breakpoint: 768,
    //                     settings: 'unslick'
    //             }
    //         ]
    //     })

    //     $(window).on('resize', function () {
    //         $('.merch-item-wrap').slick('resize');
    //         });
    // }

    $(window).on("scroll", function () {
      var windowScrollPos = $(this).scrollTop() / 15;
      setTimeout(function () {
        $(".anim-parallax").css(
          "transform",
          `translateY(${-windowScrollPos}px)`
        );
      }, 65);
    });

    //19-07-22
    var thisSrc = $(".story-btn a").attr("href");
    $(".story-btn a").click(function (e) {
      e.preventDefault();
      $("#video-player").attr(
        "src",
        thisSrc + "?autoplay=1&showinfo=0&modestbranding=1&rel=0&controls=1"
      );
      $(".story-video").fadeIn();
      $("body").addClass("video-show");
    });

    $(".story-video").click(function () {
      $(".story-video").fadeOut();
      $("body").removeClass("video-show");
      $("#video-player").attr("src", "");
    });

    if (window.location.hash != "" && window.location.hash != "#") {
      let target = window.location.hash;
      if (!$(target).length) {
        return;
      } else {
        $("body").removeClass("navShown");
        if ($(window).width() > 768) {
          $("html, body").animate(
            {
              scrollTop: $(target).offset().top,
            },
            1000
          );
        } else {
          $("html, body").animate(
            {
              scrollTop: $(target).offset().top - 100,
            },
            1000
          );
        }
      }
    }
    $(".main-nav ul li a").on("click", function () {
      $("body").removeClass("navShown");
    });

    // $(".recipes-item a").click(function (e) {
    //   e.preventDefault();
    //   let modal = $(this).data("modal");
    //   $("#" + modal + ", .recipe-modal-bg").fadeIn();
    // });
    $(".coctail-close,.recipe-modal-bg").on("click", function () {
      $(".cocktail-modal-wrap, .recipe-modal-bg").fadeOut();
    });


    $(".shop-select").on("click", function (e) {
      e.preventDefault();
      $(".shop-modal, .recipe-modal-bg").fadeIn();
    });

    $(".shop-close,.recipe-modal-bg").on("click", function () {
      $(".shop-modal, .recipe-modal-bg").fadeOut();
    });

    if ($(".testimonial-slider").length > 0) {
      $(".testimonial-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        prevArrow: $(".prev-arrow"),
        nextArrow: $(".next-arrow"),
      });
    }

    if ($(".product-image-slider").length > 0) {
      $(".product-image-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        speed: 300,
        autoplay: false,
        dots: true,
        arrows: false,
        adaptiveHeight: true,
        customPaging: function (slider, i) {
          return (
            '<button class="tab"><img src="' +
            $(".product-image-slide:nth-child(" + (i + 1) + ")").data(
              "thumbnail-image"
            ) +
            '" width="140" height="140" /></button>'
          );
        },
      });
      $(".product-image-slider").on("init", function (event, slick) {
        $(".product-image-slider").slick("resize");
      });
    }

    $(".recipes-item-wrap").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        prevArrow: "<div class='recipes__slider-arrow recipes__slider-arrow_left'></div>",
        nextArrow: "<div class='recipes__slider-arrow recipes__slider-arrow_right'></div>",
        responsive: [{
            breakpoint: 769,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    $(".accordion__container .accordion-item:nth-child(1) .accordion__head").addClass("active")
    $(".accordion__container .accordion-item:nth-child(1) .accordion__content").slideDown()

    $(".accordion__head").on("click", function() {
      $(this).hasClass("active") ? ($(this).siblings(".accordion__content").slideUp(), 
        $(this).removeClass("active")) : ($(".accordion__content").slideUp(), 
        $(".accordion__head").removeClass("active"), 
        $(this).siblings(".accordion__content").slideToggle(), 
        $(this).toggleClass("active"))
    })

    $( "#day" ).focus();

    $(".the-selection").on("input", function() {

        var selectedYear = $("#year").val();
        var selectedMonth = $("#month").val();
        var selectedDay = $("#day").val();
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        console.log('current year' + currentYear);
        var currentMonth = currentDate.getMonth() + 1;
        console.log('current month' + currentMonth);
        var currentDay = currentDate.getDate();
        console.log('current day' + currentDay);
        var ageInMonths = (currentYear - selectedYear) * 12 + (currentMonth - selectedMonth);
        var ageInDays = (currentYear - selectedYear) * 365 + (currentMonth - selectedMonth) * 30 + (currentDay - selectedDay);



    // days
        var btn_active = "false";
        if (selectedDay > 31) {
          $('#day').addClass('error');
        } else {
          $('#day').removeClass('error');
        }
        if (selectedMonth > 12) {
          $('#month').addClass('error');
        } else {
          $('#month').removeClass('error');
        }

        if (selectedYear != '' && selectedMonth != '' && selectedDay != '') {


          if (selectedDay > 31 || selectedMonth > 12) {
            $('.yes-btn').removeClass('btn-active');
          } else {
            if (ageInDays <= 21 * 365) {
              $('.yes-btn').removeClass('btn-active');
            } else {
              $('.yes-btn').addClass('btn-active');
            }
          }

        }

      });


      $('.age-gate__select-label').click(function(e) {
        e.stopPropagation();
        $(this).parent().toggleClass('age-gate__select-open');
      });
      $(document).click(function() {
        $('.age-gate__select-item').removeClass('age-gate__select-open');
      });

      $('.the-selection').keyup(function(e) {
        console.log('keyup');
        if (this.value.length === this.maxLength) {
            var next = $(this).attr('data-next');
            $(next).focus();
        }
    });

    var videos_btn = $(".video-play-btn a");
    $("#gallery-video-player")[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*"), videos_btn.each(function(index) {
        $(this).click(function(e) {
            e.preventDefault();
            var videosrc = $(this).attr("href");
            $("#gallery-video-player").attr("src", videosrc + "?autoplay=1&showinfo=0&modestbranding=1&rel=0&controls=1"), $(".gallery-video").fadeIn(), $("body").addClass("video-show")
        })
    }), $(".gallery-video").click(function() {
        $(".gallery-video").fadeOut(), $("body").removeClass("video-show"), $("#gallery-video-player").attr("src", "")
    }), $(".video-item-wrap").slick({
        infinite: !1,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: !0,
        prevArrow: "<div class='gallery__slider-arrow gallery__slider-arrow_left'></div>",
        nextArrow: "<div class='gallery__slider-arrow gallery__slider-arrow_right'></div>",
        responsive: [{
            breakpoint: 769,
            settings: {
                slidesToShow: 1
            }
        }]
    });








  }); // End ready function.

  /* Slick needs no get Reinitialized on window Resize after it was destroyed */
  $(window).on("load resize orientationchange", function () {
    $(".carousel-wrap").each(function () {
      var $carousel = $(this);
      // slick on mobile
      if ($(window).width() > 767) {
        if ($carousel.hasClass("slick-initialized")) {
          $carousel.slick("unslick");
        }
      } else {
        if (!$carousel.hasClass("slick-initialized")) {
          $carousel.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: true,
            infinite: true,
            dots: false,
            autoplay: true,
            prevArrow: $(".billing-solutions-section .prev-btn"),
            nextArrow: $(".billing-solutions-section .next-btn"),
          });
        }
      }
    });
  });
  // End the solutin card carousel
})(jQuery);
