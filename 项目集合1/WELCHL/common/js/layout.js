$(function () {

    if (typeof Swiper != 'undefined') {
        var indexSwiper = new Swiper('.banner', {
            paginationClickable: true,
            loop: true,
            autoplay: 6000,
            speed: 1200,
            pagination: '.banner .indexbannerindeo',
            autoplayDisableOnInteraction: false,
            simulateTouch: false,
            onTransitionEnd: function (swiper) {
                $(".banner ul li").eq(swiper.activeIndex).addClass("active").siblings().removeClass("active");
            }
        });

        var productSwiper = new Swiper('.indexproduct-list', {
            paginationClickable: true,
            loop: false,
            slidesPerView: 3,
            nextButton: '.indexproduct-list .product-right',
            prevButton: '.indexproduct-list .product-left',
            autoplayDisableOnInteraction: false,
            simulateTouch: false,
            breakpoints: {
                1200: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 1

                }
            }
        });

        var solutionSwiper = new Swiper('.solution-swiper', {
            paginationClickable: true,
            //loop: true,
            slidesPerView: 5,
            slidesPerColumn: 2,
            slidesPerColumnFill: 'row',
            speed: 800,
            nextButton: '.solution-wraper .product-right',
            prevButton: '.solution-wraper .product-left',
            autoplayDisableOnInteraction: false,
            simulateTouch: false,
            roundLengths: true,
            breakpoints: {
                640: {
                    slidesPerView: 2
                }
            }
        });

        var recomSwiper = new Swiper('.recom-product', {
            paginationClickable: true,
            //loop: true,
            slidesPerView: 4,
            speed: 800,
            nextButton: '.recommended-box .product-right',
            prevButton: '.recommended-box .product-left',
            autoplayDisableOnInteraction: false,
            simulateTouch: false,
            roundLengths: true,
            spaceBetween: 26,
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 1
                }
            }
        });

        var mobileSwiper = new Swiper('.mobile-swiper', {
            paginationClickable: true,
            loop: false,
            autoplay: 6000,
            speed: 1200,
            pagination: '.mobile-swiper .indexbannerindeo',
            autoplayDisableOnInteraction: false,
            simulateTouch: false
        });

        var proSwiper = new Swiper('.small-box', {
            paginationClickable: true,
            autoplay: false,
            speed: 1200,
            loop: true,
            nextButton: '.small-right',
            prevButton: '.small-left',
            slidesPerView: 3,
            autoplayDisableOnInteraction: false,
            simulateTouch: false
        });

        var relatedSwiper = new Swiper('.related-list', {
            paginationClickable: true,
            loop: true,
            slidesPerView: 3,
            speed: 800,
            nextButton: '.related-right',
            prevButton: '.related-left',
            autoplayDisableOnInteraction: false,
            simulateTouch: false,
            roundLengths: true,
            spaceBetween: 28,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 1,
                }
            }
        })

    }

    $(".select-box dl").each(function () {
        if ($(this).find(".proitem").height() > $(this).find(".prod-height").height()) {
            $(this).find(".arrormore-btn").show();
        } else {
            $(this).find(".arrormore-btn").hide();
        }

    });

    $("nav ul li").each(function () {
        var htmltext = $(this).find(".subnav");
        if (htmltext.length == 0) {
            $(this).find(".arrorright-btn").remove();
        }
    });

    $(".product-nav dl").each(function () {
        var htmltext = $(this).find("dd a");
        if (htmltext.length == 0) {
            $(this).addClass("remove");
        }
    });

    $(".arrormore-btn").click(function () {
        var obj = $(this).parents("dd").find(".prod-height");
        if (!obj.hasClass("add")) {
            $(this).addClass("cur");
            obj.addClass("add");
        } else {
            obj.removeClass("add");
            $(this).removeClass("cur");
        }

    })
    //绛夐珮
    function Itemheight(item) {
        var heightArr = [];
        // default
        $(item).find(".sameheight").css('height', 'auto');
        // maxheight
        $(item).each(function () {
            heightArr.push($(this).find('.sameheight').outerHeight());
        });
        var maxHeight = Math.max.apply(Math, heightArr);
        $(item).find(".sameheight").css('height', maxHeight);
    }

    //鑽ｈ獕璧勮川

    function getSlide($origin) {
        var $thumb = $origin.find('img');
        var $thumbtext = $origin.find('.hour-title');
        var $thumbSwiper = $(".thumb-popup .swiper-wrapper").html(''); //绌�
        var slide_length = $thumb.length;
        for (var i = 0; i < slide_length; i++) {
            var $item = $('<li class="swiper-slide"><img src="' + $thumb[i].src + '"><p>' + $thumbtext[i].innerText + '</p></li>');
            $thumbSwiper.append($item);
        }
    }

    function imgpopSwiperInit(index) {
        var thumbCopySwiper = new Swiper(".thumb-copy-wrapper", {
            initialSlide: index,
            loop: false,
            prevButton: '.swiper-left',
            nextButton: '.swiper-right',
            paginationClickable: true
        })
    }

    $(document).on("click", ".hour-list li", function () {
        $(".thumb-popup").fadeIn(300);
        getSlide($('.hour-list'));
        imgpopSwiperInit($(this).index());
        var $height = $(window).height();
        $(".thumb-popup ul li").css("height", $height);
    });

    $(".thumb-popup .close").click(function () {
        $(".thumb-popup").fadeOut(300);
        $(".thumb-copy-wrapper .swiper-wrapper").empty();

    });

    //瑙嗛鎾斁 
    var host = location.protocol + '//' + location.host;
    var videoObject = {
        container: '#videobox1', //瀹瑰櫒鐨処D鎴朿lassName
        variable: 'player', //鎾斁鍑芥暟鍚嶇О
        autoplay: true, //鏄惁鑷姩鎾斁
        debug: true, //鏄惁寮€鍚皟璇曟ā寮�
        drag: 'start', //鎷栧姩鐨勫睘鎬�
        seek: 0, //榛樿璺宠浆鐨勬椂闂�
        playbackrate: -1,
        mobileCkControls: false
    };
    // palybtn
    function ckplayerX($showbtn, $hidebtn) {
        var player;
        $(document).on('click', $showbtn, function () {
            $(".recruitmentfloat").fadeIn(300);
            _videofile = $(this).attr('rel');
            videoObject.video = _videofile;
            player = new ckplayer(videoObject);
        })

        $(document).on('click', $hidebtn, function () {
            player.videoPause()
            $('.recruitmentfloat').fadeOut(300);
            $(".recruitmentfloat .videobox").html("");
        });

    }

    ckplayerX('.propagandist ul li,.about-left dt,.videolistcon', '.recclosebtn');

    //浜у搧璇︽儏
    $(".small-box ul li:eq(0)").addClass("cur");
    var onesrc = $(".small-box ul li:eq(0)").attr("rel");
    $(".pro-bigimg img").attr("src", onesrc);
    $(".small-box ul li").each(function (index) {
        $(this).click(function () {
            $(this).addClass("cur").siblings().removeClass("cur");
            var imgsrc = $(this).attr("rel");
            $(".pro-bigimg img").attr("src", imgsrc);
        });
    });

    $(".product-tab a:eq(0)").addClass("cur");
    $(".mdeatils-box:eq(0)").show();
    $(".product-tab a").each(function (index) {
        $(this).click(function () {
            $(this).addClass("cur").siblings().removeClass("cur");
            $(".mdeatils-box").eq(index).show().siblings().hide();
        })
    });

    $(".select-arror").click(function () {
        if ($(this).parents(".question-select").find(".qselect-box").is(":hidden")) {
            $(this).parents(".question-select").find(".qselect-box").stop(true, true).slideDown(300);
        } else {
            $(this).parents(".question-select").find(".qselect-box").stop(true, true).slideUp(300);
        }

    });

    $(".qselect-box").each(function () {
        $(this).find("a").click(function () {
            var curtext = $(this).text();
            $(this).parents(".question-select").find(".select-arror").text(curtext);
            $(this).parents(".qselect-box").stop(true, true).slideUp(300);
        })
    })

    $(".problemcoment ul li").eq(0).addClass("cur");
    $(".CommonproblemContent").eq(0).show();
    $(document).on("click", ".problemcoment ul li h3", function () {
        if ($(this).next().is(":hidden")) {
            $(".CommonproblemContent").slideUp(300);
            $(".problemcoment li").removeClass("cur");
            $(this).parents("li").addClass("cur");
            $(this).next().slideDown(300);
        } else {
            $(this).parents("li").removeClass("cur");
            $(this).next().slideUp(300);
        }
    });

    //鎷涜仒
    var oldx = 0;
    var zpwinscroll = $(window).scrollTop();
    $(".hsh_zp04 li").eq(oldx).find("h3").addClass("cur");
    $(".hsh_zp04 li").eq(oldx).find(".zhaoptext04").show();
    $(document).on("click", ".hsh_zp04 li h3",
        function () {
            var thisoffsetTop = $(this).offset().top;
            var _this = $(this);
            if ($(this).next().is(":hidden")) {
                $(this).addClass('cur').parent().siblings().find("h3").removeClass("cur");
                $(this).next().slideDown(500);
                $(this).parents("ul").children("li").eq(oldx).find(".zhaoptext04").slideUp(500, function () {
                    thisoffsetTop = _this.offset().top;
                    if ($(window).width() < 992) {
                        $("html,body").animate({
                            scrollTop: thisoffsetTop - 70
                        }, 500);
                    } else {
                        $("html,body").animate({
                            scrollTop: thisoffsetTop
                        }, 500);
                    }
                });
                oldx = _this.parents("li").index();
            } else {
                $(this).removeClass("cur");
                $(this).next().slideUp();
                if (oldx == 0) {
                    oldx = -1;
                } else {
                    oldx = 0;
                };

            };
        });

    //var backtop = $(".rightfixed");
    //var wint = $(window).scrollTop();
    //$(window).on('scroll', function() {
    //	wint = $(window).scrollTop();
    //	if(wint <= 400) {
    //		backtop.fadeOut(300);
    //	};
    //	if(wint > 400) {
    //		backtop.fadeIn(300);
    //	};
    //});




    //宸︿晶瀵艰埅
    $(".common-nav ul li h4").click(function () {
        if ($(this).parents("li").find(".three-nav").is(":hidden")) {
            $(this).parents("li").find(".three-nav").slideDown().parents("li").siblings().find(".three-nav").slideUp();
            $(this).parents("li").addClass("cur").siblings().removeClass("cur");

        } else {
            $(this).parents("li").find(".three-nav").slideUp();
            $(this).parents("li").removeClass("cur");
        }
    });

    $(".common-nav ul li").each(function () {
        if ($(this).hasClass("cur")) {
            $(this).find(".three-nav").show();
        } else {
            $(this).find(".three-nav").hide();
        }
    });



    $(".search-icon").off("click").on("click", function () {
        $(".mobnav-btn").removeClass("g_close");
        $(".language-tab,nav").hide();

        if ($(".search-box").is(":hidden")) {
            $(".search-box").stop(true, true).slideDown(300);
        } else {
            $(".search-box").stop(true, true).slideUp(300);
        }

    });

    judescreen();
    Itemheight(".recom-product ul li");
    Itemheight(".cunum-list li");
    $(window).load(function () {
        judescreen();
    })
    $(window).resize(function () {
        judescreen();
        Itemheight(".recom-product ul li");
        Itemheight(".cunum-list li");
    });

    function judescreen() {
        var winW = $(window).width();
        var overscroll = window.innerWidth - document.body.clientWidth;

        $(".nszyzdsbacktop").hide();
        if (winW + overscroll >= 1200) {
            var wbacktop = $("a.nszyzdsbacktop");
            var wwint = $(window).scrollTop();
            $(window).on('scroll', function () {
                wwint = $(window).scrollTop();
                if (wwint <= 400) {
                    wbacktop.fadeOut(300);
                };
                if (wwint > 400) {
                    wbacktop.fadeIn(300);
                };
            });
            wbacktop.on('click', function () {
                $("html,body").stop(false, true).animate({
                    "scrollTop": 0
                }, 500);
                return false;
            });
        } else {
            $(".nszyzdsbacktop").hide();
        }


        if (winW + overscroll >= 1024) {
            $(".search-icon,.footer-list li h4,.com-title,.product-nav dl dt,nav ul li h4").off("click");
            $("nav,.search-box,.common-nav,.footersub-nav").show();
            //鎼滅储
            $(".language-box").off("mouseenter mouseleave").hover(function () {
                $(".language-tab").stop(true, true).slideDown(300);
            }, function () {
                $(".language-tab").stop(true, true).slideUp(300);
            });
            $(".subnav").hide();
            $("nav ul li").off("mouseenter mouseleave").hover(function () {

                $(this).find(".subnav").stop(true, true).slideDown(300);
            }, function () {
                $(this).find(".subnav").hide();
            });

        } else {

            $("nav,.subnav").hide();
            $(".language-box,nav ul li").off("mouseenter mouseleave");
            $(".language-box").off("click").on("click", function () {
                $(".search-box,nav").hide();
                $(".mobnav-btn").removeClass("g_close");
                if ($(".language-tab").is(":hidden")) {
                    $(".language-tab").stop(true, true).slideDown(300);
                } else {
                    $(".language-tab").stop(true, true).slideUp(300);
                }
            })
            //绉诲姩绔睍寮€涓嬫媺
            $(".mobnav-btn").off("click").on("click", function () {
                $(".language-tab,.search-box").hide();
                if ($("nav").is(":hidden")) {
                    $(this).addClass("g_close");
                    $("nav").slideDown(300);
                } else {
                    $("nav").slideUp();
                    $(this).removeClass("g_close");
                }
            });

            //绉诲姩绔簩绾у鑸�
            $("nav ul li h4").off("click").on("click", function () {
                if ($(this).parents("li").find(".subnav").is(":hidden")) {
                    $(this).parents("li").find(".subnav").slideDown().parents("li").siblings().find(".subnav").slideUp();
                    $(this).parents("li").addClass("cur").siblings().removeClass("cur");

                } else {
                    $(this).parents("li").find(".subnav").slideUp();
                    $(this).parents("li").removeClass("cur");
                }
            });

            //涓夌骇
            $(".product-nav dl dt").off("click").on("click", function () {
                if ($(this).parents("dl").find("dd").is(":hidden")) {
                    $(this).parents("dl").find("dd").slideDown().parents("li").siblings().find(".subnav").slideUp();
                    $(this).parents("dl").addClass("cur").siblings().removeClass("cur");

                } else {
                    $(this).parents("dl").find("dd").slideUp();
                    $(this).parents("dl").removeClass("cur");

                }
            });


            //搴曢儴
            $(".footersub-nav").css("display", "none");
            $(".footer-list li h4").off("click").on("click", function () {
                if ($(this).next().is(":hidden")) {
                    $(".footersub-nav").slideUp(300);
                    $(".footer-list li h4").removeClass("cur");
                    $(this).addClass("cur");
                    $(this).next().slideDown(300);
                } else {
                    $(this).removeClass("cur");
                    $(this).next().slideUp(300);
                }
            });

            //绉诲姩绔笅鎷�
            $(".com-title").off("click").on("click", function () {
                if ($(".common-nav").is(":hidden")) {
                    $(".common-nav").slideDown(300);
                } else {
                    $(".common-nav").slideUp(300);
                }
            })

        }

        if (winW + overscroll >= 768) {
            Itemheight(".curlhour-list li");
            Itemheight(".m-float");
            Itemheight(".talent-list li");
        } else {
            $(".curlhour-list li .sameheight,.m-float .sameheight,.talent-list li .sameheight").css("height", "auto");
        }
    }

})