$(function() {
  //Smooth Scroll
  $('a').smoothScroll();
  
  //Parallax jQ
	function multiParallax() {
		var $winHeight	= $( window ).height();
		
		if($(window).width() > 767) {
			$('[data-parallax]').each(function() {
				var $position	= $(this).offset().top - $(document).scrollTop();

				if ( $winHeight >= $position ) {
					var $depth, $i, $layer, $layers, $len, $movement, $translate3d;
					var $layers		= $('[data-type="parallax"]');

					$($layers).each(function() {
						$parent		= $(this).parent();
						$curPos		= $($parent).offset().top - $(document).scrollTop();

						$depth 		= $(this).attr('data-depth');
						$movement	= $curPos * $depth;
						$translate 	= 'translate3d(0, ' + $movement + 'px, 0)';

						$(this).css({
							"-webkit-transform"	: $translate,	
							"-moz-transform"	: $translate,
							"-ms-transform"		: $translate,
							"-o-transform"		: $translate,
							"transform"			: $translate
						});
					});
				}
			});
		}
		$('[data-sliderParallax]').each(function() {

			var $scrollAmount 	= 150;
			var $objH = $(this).outerHeight();
			var $screenTopPos = $(document).scrollTop();
			var $screenBotPos = $screenTopPos + $winHeight;
			var $sliderTopPos = $(this).offset().top;
			var $sliderBotPos = $sliderTopPos + $objH;

			if ( ($screenBotPos >= $sliderTopPos) && ($screenTopPos < $sliderBotPos) ) {
				var $sdepth, $si, $slayer, $slayers, $slen, $smovement, $stranslate3d;
				var $slayers		= $('[data-type="sliderParallax"]');

				$($slayers).each(function() {
					var $sparent	= $(this).parent(),
					$sparentH		= $sparent.outerHeight(),
					$sparentTopPos  = $(this).offset().top,
					$sparentBotPos 	= $sparentTopPos + $sparentH,
					$totalScrollAmount = $sparentH + $winHeight,
					$sliderImg = $(this).find('img'),
					$sliderImgHeight = $sparentH + $scrollAmount;

					$sliderImg.css("height",$sliderImgHeight);

					$scurPos = ($(document).scrollTop() + $winHeight) - $(this).offset().top;
					$stranslate = (($scurPos / $totalScrollAmount)*$scrollAmount);
					$sliderImg.css({"object-position" : "50% calc( 50% - "+$stranslate+'px)'} );

				});
			}
		});
	}

	$(window).on('load scroll', function() {
		multiParallax();
	});


});