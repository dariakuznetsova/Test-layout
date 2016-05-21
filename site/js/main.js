//main slider
var slider = (function () {

	var init       = function () {
		    _setUpListners();
	    },
	    block      = $('.slider__block'),
	    li         = $('.pagination__block'),
	    prev_click = $('.pagination__prev'),
	    next_click = $('.pagination__next'),
	    int        = setInterval(animate_next, 4000);

	block.eq(0).addClass('active__block').fadeIn(1000);

	var _setUpListners = function () {

		$(".pagination").mouseenter(function () {
			clearInterval(int);
		}).mouseleave(function () {
			int = setInterval(animate_next, 4000);
		});

		next_click.on('click', function (e) {
			e.preventDefault();
			animate_next();
		});

		prev_click.on('click', function (e) {
			e.preventDefault();
			animate_prev();
		});

	};

	function animate_next() {
		var length = block.length - 1;

		block.each(function (index) {

			if ($(this).hasClass('active__block') && index != length) {
				$(this).removeClass('active__block').fadeOut(1000).next(block).addClass('active__block').fadeIn(1000);
				pagination();
				return false;
			} else if (index == length) {
				$(this).removeClass('active__block').fadeOut(1000);
				block.eq(0).addClass('active__block').fadeIn(1000);
				pagination();
				return false;
			}
		});
	}


	function animate_prev() {

		block.each(function (index) {
			if ($(this).hasClass('active__block') && index != 0) {
				$(this).removeClass('active__block').fadeOut(1000).prev(block).addClass('active__block').fadeIn(1000);
				pagination();
				return false;
			} else if (block.eq(0).hasClass('active__block')) {
				$(this).removeClass('active__block').fadeOut(1000);
				block.eq(4).addClass('active__block').fadeIn(1000);
				pagination();
				return false;
			}
		});
	}

	function pagination() {
		var index_block = block.index($('.active__block'));

		li.each(function () {
			if ($(this).index() == index_block) {
				li.not($(this)).removeClass('active_pagination');
				$(this).addClass('active_pagination');
			}
		});
	}

	return {
		init : init
	};

})();


$(document).ready(function () {
	if ($('.slider__block')) {
		slider.init();
	}
});


//Смена графиков
(function () {
	var graph_link = $('.graph__item'),
	    img        = $('.graph__img img');

	graph_link.on('click', function () {
		var link_index = $(this).index();

		graph_link.not($(this)).removeClass('graph__item-active');
		$(this).addClass('graph__item-active');

		img.each(function () {
			if ($(this).index() == link_index) {
				img.not($(this)).fadeOut(300);
				$(this).fadeIn(300);
			}
		});

	});
}());

///Песок, щебень...
$(document).ready(function () {

	setInterval(function () {

		var material = $('.material'),
		    length   = material.length - 1;

		material.each(function (index) {
			if ($(this).hasClass('visible') && index != length) {
				$(this).removeClass('visible').next(material).addClass('visible');
				return false;
			} else if (index == length) {
				$(this).removeClass('visible');
				material.eq(0).addClass('visible');
				return false;
			}
		});

	}, 700);

});

//Скролл вверх
$.event.special.scrollToTop = {
	setup : function () {
		var e = $(this);
		e.on("scroll", $.event.special.scrollToTop.handler);
		e.data("top", null);
	},

	teardown : function () {
		$(this).off("scroll", $.event.special.scrollToTop.handler);
	},

	handler : function (event) {
		event.preventDefault();
		var e = $(this);

		if (e.data("top") > event.target.scrollingElement.scrollTop) {
			e.data("top", null);
			event.type = "scrollToTop";
			$.event.dispatch.apply(this, arguments);
		} else {
			e.data("top", event.target.scrollingElement.scrollTop);
		}
	}
};

// //Скролл вниз
$.event.special.scrollToBottom = {
	setup : function () {
		var e = $(this);
		e.on("scroll", $.event.special.scrollToBottom.handler);
		e.data("bottom", null);
	},

	teardown : function () {
		$(this).off("scroll", $.event.special.scrollToBottom.handler);
	},

	handler : function (event) {
		event.preventDefault();
		var e = $(this);

		if (e.data("bottom") !== null && e.data("bottom") < event.target.scrollingElement.scrollTop) {
			e.data("bottom", null);
			event.type = "scrollToBottom";
			$.event.dispatch.apply(this, arguments);
		} else {
			e.data("bottom", event.target.scrollingElement.scrollTop);
		}
	}
};

//Прокрутка первого экрана
if($('.slider-block').length) {
        var scrollFlag = true;

        $(window).on('scroll', function (event) {

            var sTop    = event.target.scrollingElement.scrollTop,
                wHeight = $(this).height();

            if (sTop < wHeight) {
                $(this).on('scrollToBottom', function () {
                    if (scrollFlag){
                        scrollFlag = false;
                        $('html, body').stop().animate({scrollTop : wHeight}, 'slow', function () {
                            scrollFlag = true;
                        });
                    }
                });
                $(this).on('scrollToTop', function () {
                    if (scrollFlag) {
                        scrollFlag = false;
                        $('html, body').stop().animate({scrollTop : 0}, 'slow', function () {
                            scrollFlag = true;
                        });
                    }
                });
            } else {
                return false;
            };
        });   
};


//Плавный переход по якорной ссылке на странице
$(document).ready(function () {

	$(".absolute__link").on("click", function (event) {
		event.preventDefault();

		var id  = $(this).attr('href'),
		    top = $(id).offset().top;

		$('body,html').animate({scrollTop : top}, 500);
	});

});

//Нижний слайдер
var silver_track = function () {

	var container = $(".my-track");
	var track     = $(".slider-container").silverTrack({
		perPage   : 1,
		itemClass : "item",
		cover     : true,
		mode      : "horizontal"
	});

	track.install(new SilverTrack.Plugins.Navigator({
		prev : $("a.prev", container),
		next : $("a.next", container)
	}));

	track.start();
};

if ($('.my-track').length) {
	silver_track();
}


//Модальное окно
(function () {
	$('.modal_link').bind('click', function (e) {
		e.preventDefault();
		$('.popup').bPopup();
	});
}());


//Смена меню в Нерудных материалах
(function () {
    var material_link = $('.materials-sidebar__link'),
        material_block = $('.material-block');

    material_link.on('click', function (e) {
        e.preventDefault();
        
        var link_index = $(this).parent().index();

        material_block.each(function () {
            if ($(this).index() == link_index) {

                material_block.not($(this)).stop(true,true).fadeOut(300);
                $(this).delay(300).stop(true,true).fadeIn(300);
            };
        });

    });
}());