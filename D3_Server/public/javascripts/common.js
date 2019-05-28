

	function heightmain(){
        var box1_w = $('.main_visual').height();  
        $('.main_visual .cover').css({"height": box1_w});		  	
		if($(window).width() < 640) {
			var device = $('.home').height();  
			$('.main_visual').css({"height": device});
			$('.main_visual .box').css({"height": device / 2 - 25});
		}		
    };
    $(window).ready(function(){heightmain();});
    $(window).resize(function(){heightmain();});
	
	/*
    function heightmain2(){	  	
		if($(window).width() < 640) {
			var device = $('.home').height();  
			$('.main_visual').css({"height": device});
			$('.main_visual .box').css({"height": device / 2 - 25});
		}
    };
    $(window).ready(function(){heightmain2();});
	*/
	
$(function () {    
    $(window).scroll(function () {
        scT = $(window).scrollTop();
        var scroll_con = $('.header');
        if (scT >=  200) { 
            $(scroll_con).addClass('simple');   
        } else {
            $(scroll_con).removeClass('simple');
        }
    });
    $(window).ready(function () {
        scT = $(window).scrollTop();
        var scroll_con = $('.header');
        if (scT >=  200) { 
            $(scroll_con).addClass('simple');   
        } else {
            $(scroll_con).removeClass('simple');
        }
    });
});

var btn = $('.btn_family');
var contant = $('.family_con');
$(btn).click(function () {
    $(contant).slideToggle();
    $(this).toggleClass('on');
    return false;
});

    
if ($('html').hasClass('lt-ie9')) {
  $('.wow').css({'opacity':'1'});
  $('.animated').css({'opacity':'1'});
  $('.wow').removeClass('wow');
  $('.animated').removeClass('wow');
}



var SlickSlider = {
    init: function() {
        this.slick_js();
        this.slick_banner();
        this.slick_01();        
    },
    slick_js: function() { //html markup slick
        $('.slick_js').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover:false,
            pauseOnDotsHover:false
        });
        $('.slick_js').slick('setPosition');
    }, 
    slick_banner: function() { 
        $('.slick_banner').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 1000,
            arrows:false,
            fade: true,
            dots :true,
            dotsClass : 'slick-dots ver-dots',
            pauseOnHover:false,
            pauseOnDotsHover:false
        });
        $('.slick_js').slick('setPosition');
    },

    slick_01: function() {
      $('.slick_partner').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots:false,
        autoplay:false,
        pauseOnHover:false,
        pauseOnDotsHover:false,
        responsive:[{
            breakpoint:788,//誘몃쭔遺���
            settings:{
                slidesToShow: 3,
            }
        },{
            breakpoint:481,//誘몃쭔遺���
            settings:{
                slidesToShow: 2,
            }
        }]
      });
      $('.slick_partner').slick('setPosition'); 
    }
};



var navMobile = {
    init: function() {
        this.moAction();
    },
    moAction: function() {
        var depth_1 = $('.mo_gnb_nav .depth01');
        var depth_2 = $('.mo_gnb_nav .depth02');
        var depth_3 = $('.mo_gnb_nav .depth03');
        var depth_1_down = $('.mo_gnb_nav .depth01_down');
        var depth_2_down = $('.mo_gnb_nav .depth02_down');
        var nav_bg = $('.nav_bg');
        
        $(depth_2).hide();
        $(depth_3).hide();
        $(nav_bg).css({'opacity':'0'})//hide();

        $(depth_1).children('a').click(function(){
            if ( $(this).next('div').css('display') === 'none') {
                $(depth_1).children('a').removeClass('selected1');
                $(this).addClass('selected1');
                $(depth_3).hide();
                $(depth_2_down).children('a').removeClass('selected2');
                $(depth_2).slideUp(300);
                $(this).next().stop().slideDown(300);
            } else{
                $(this).next('div').slideUp(200); 
                $(depth_1).children('a').removeClass('selected1');       
            }
            return false;
        });

        $(depth_2_down).children('a').click(function(){
            if($(this).next('div').css('display') === 'none'){
                $(depth_2_down).children('a').removeClass('selected2');
                $(this).addClass('selected2');
                $(depth_3).slideUp(300);
                $(this).next().stop().slideDown(300);
            }else{
                $(this).next('div').slideUp(200);
                $(depth_2_down).children('a').removeClass('selected2');
            }
            return false;
        });

        // 硫붾돱
        var navopen = $('.m_nav_btn_box .nav_btn');
        var navclose = $('.m_nav_btn_box .on');
        $(navopen).on('click',function(){ 
            $('.mo_gnb_nav').slideToggle({direction:"left"},500); //�꾩뿉�� �좉�
            // $('.mo_gnb_nav').stop().animate({'left':'0'},300,function(){
                // $(this).css({'transition':'right 0.5s'});                            
                $(nav_bg).css({'opacity':'0.6'});
                $(nav_bg).toggleClass('on');                
                $(navopen).toggleClass('on');
                $(depth_2).hide();
                $(depth_1).children('a').removeClass('selected1');
                $(depth_2_down).children('a').removeClass('selected2');
                // $(nav_bg).slideToggle({direction:"left"},500);
                $('html').toggleClass('htmloverflow');                
            // })                  
        });

    }
};


/**
 *gnb 硫붾돱 蹂댁씠怨� 媛먯텛湲�
 */
var navFun = {
    init: function() {
        this.navAction();
        this.navAction2();
    },
    navAction: function() {
        var gnb_link = $('.gnb_wrap .depth01').children('a');
        var url = window.location.href;
        var src = url.split('/')[url.split('/').length-1].split('.')[0];

        src = src.split('?')[0];
        src = src.split('-')[0];
        src = src.split('_')[0];
         
        gnb_link.each(function(){
            var href = $(this).attr('href');
            if (href.split('/')[href.split('/').length-1].split('.')[0].split('_')[0]==src) {
                $(this).addClass('active');
            }else{
                $(this).removeClass('active')
            }
        });


        var all_a = $('.gnb-box .all-link');
        var depth_02 = $('.gnb_wrap .depth01 .depth02_box');
        var nav_bg = $('.nav_bg_pc');

        gnb_link    .on('mouseover focus',onOn);
        all_a.on('mouseover',onOver);

        $('.gnb_wrap').on('mouseleave', function(){
           depth_02.fadeOut('fast');
           // nav_bg.fadeOut(200);
        });


        function onOn(){
            depth_02.fadeOut('fast');
            // depth_02.fadeIn(200); 
            // nav_bg.fadeIn(200); 
            $(this).parent('.depth01').children('.depth02_box').fadeIn('fast');
        }

        

        function onOver(){
            if(depth_02.css('display') === 'none'){
                
            $(depth_02).show(); 
                nav_bg.show();
            }else{
                depth_02.hide();
                nav_bg.fadeOut(150);
            }            
        }

    },
    //紐⑤컮�� �쒕툕�ㅻ퉬 
    navAction2: function() {

        // var gnb_link = $('.sub_nav li a');
        var gnb_link = $('.sub_nav_list li a');
        var url = window.location.href;
        var src = url.split('/')[url.split('/').length-1].split('.')[0];
          src = src.split('?')[0];
        src = src.split('-')[0];
         
        // gnb_link.css('border', 'solid 2px red');

          gnb_link.each(function(){
            var href = $(this).attr('href');
            if (href.split('/')[href.split('/').length-1].split('.')[0]==src) {
                //active�� �쒕툕留곹겕媛믪� 留곹겕瑜� �놁븻��.
                $(this).addClass('active');//.attr("href","javasciprt:;void(0)");
                $(this).next().show();
            }else{
                $(this).removeClass('active')
            }
        });
   }
};

// �쒕툕 ��찓��
// var sub_menu = {
//     init: function() {
//         this.navAction();
//     },
//     navAction: function() {
//         var gnb_link = $('.gnb_wrap .depth01').children('a');
//         var url = window.location.href;
//         var src = url.split('/')[url.split('/').length-1].split('.')[0];

//         src = src.split('?')[0];
//         src = src.split('-')[0];

//     var gnb_sub_link = $('.sub-menu-list li').children('a');
//         gnb_sub_link.each(function(){
//         var href = $(this).attr('href');
//      if (href.split('/')[href.split('/').length-1].split('.')[0]==src) {
//             $(this).addClass('active');
//         }else{
//             // $(this).removeClass('active')
//         }
//     });
//     }
// };
var sub_menu = {
    init: function() {
        this.navAction();
    },
    navAction: function() {
        // var gnb_link = $('.gnb_wrap .depth01').children('a');
        var url = window.location.href;
            src = url.split('/')[url.split('/').length-1].split('.')[0];
            src01 = src.split('?')[0].split('-')[0].split('_')[0];
            src02 = src.split('?')[0].split('-')[0].slice(0, -3);
            src03 = src.split('?')[0].split('-')[0];


        var gnb_link_02     = $('.sub-menu-list li').children('a');
        var gnb_link_03     = $('.sub_dep03 li').children('a');

        gnb_link_02.each(function(){   
            var this_href = $(this).attr('href'); 
            var href =  this_href.split('/')[this_href.split('/').length-1].split('.')[0].split('-')[0].slice(0, -3);
            if (href==src02) {
                $(this).addClass('active');
            }else{
                $(this).removeClass('active')
            }
        });

        gnb_link_03.each(function(){
          var this_href = $(this).attr('href');
          var href3 = this_href.split('/')[this_href.split('/').length-1].split('.')[0];          
              if (href3==src03) {
                $(this).addClass('active');
            }else{
                $(this).removeClass('active')
            }
        });
    }
};


var mainScroll = {
    init: function() {
        this.Scroll_01();
    },
    Scroll_01: function() {            
        $('.scroll-con-y').mCustomScrollbar({
            axis:'y',
            theme:'dark-thin',
            advanced:{autoExpandHorizontalScroll:true}
        });        
    },
};
/**
 * tab.js
 * ��쓣 �대┃�섎㈃ 而⑦뀗痢좉� 蹂댁씠怨� �④린寃� �섍린
 *
 */
// var tabFun = {
//     init: function() {
//         this.tabShowHide();
//         this.tabAjax();
//     },
//     tabShowHide: function() {
//         var tab = $('.tab-wrap .tab a'),
//             tab_content = $('.tab-wrap .tab-content'),
//             tab_wrap = $('.tab-wrap');

//         // �섏씠吏��먯꽌 泥ル쾲吏� .tab-content 蹂댁씠湲�
//         tab_wrap.each(function() {
//             $(this).children('.tab-content').first().show();
//         });


//         tab.on('click', function(event) {
//             var idx = $(this).data('index');
//             // this �� �뺤젣 �듭빱�� active �대옒�� �쒓굅
//             $(this).parent().siblings().children('a').removeClass('active');
//             // this �� active �대옒�� 異붽�
//             $(this).addClass('active');
//             // this �� 遺�紐⑥씤 ul �뺤젣�ㅼ쨷�먯꽌 tab-content �④린湲�
//             $(this).parents('ul').siblings('.tab-content').hide();
//             // this �� 媛숈� �꾩씠�붾쭔 蹂댁씠湲�
//             $('#' + idx).show();

//         });
//     },
//     tabAjax: function() {
//         var containerId = '#tabs-container';
//         var tabsId = '#tabs';

//         $(document).ready(function(){
//             // Preload tab on page load
//             if($(tabsId + ' li.current a').length > 0){
//                 loadTab($(tabsId + ' li.current a'));
//             }
            
//             $(tabsId + ' a').mouseenter(function(){
//                 if($(this).parent().hasClass('current')){ return false; }
                
//                 $(tabsId + ' li.current').removeClass('current');
//                 $(this).parent().addClass('current');
                
//                 loadTab($(this));       
//                 return false;
//             });
//         });

//         function loadTab(tabObj){
//             if(!tabObj || !tabObj.length){ return; }
//             $(containerId).addClass('loading');
//             // $(containerId).fadeOut('fast');
            
//             $(containerId).load(tabObj.attr('href'), function(){
//                 $(containerId).removeClass('loading');
//                 // $(containerId).fadeIn('fast');
//             });
//         }
//     }
// };
var tabFun = {
    init: function() {
        this.tab01();
    }
    ,tab01: function(){
        var tabBtn = $('.tab-wrap .tab li > a');
        var tab1st = $('.tab-wrap .tab li').eq(0).find('a');
        var conAll = $('.tab-wrap .tab-content');
        var con1st = $('.tab-wrap .tab-content').eq(0);
        $(tab1st).addClass('active');
        $(conAll).hide();
        $(con1st).show();
        $(tabBtn).click(function () {
            $(conAll).hide();
            tabHref = $(this).attr('href');
            $(tabHref).show();
            $(tabBtn).removeClass('active');
            $(this).addClass('active');
            return false;
        });
    } 
};


/*var wow = new WOW({
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       200,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
      },
        scrollContainer: null // optional scroll container selector, otherwise use window
    }
);*/
var wowrap = $('.wowrap');
$(wowrap).each(function() {
    $(this).find('.wow').each(function(index){
        var eq = (index)/4+"s"; //2.5s �� 異붽�
        $(this).attr('data-wow-delay',eq);
    });
    $(this).find('.animated').each(function(index){
        var eq = (index)*250;
        $(this).attr('data-id','delay-'+eq);
    });
});
var faqconFun = {
    init: function() {
        this.fapShowHide();
        this.fapShowHide2();
    },
    fapShowHide: function() {
        var table = $('.faq-box'),
            link = table.find('a');
            
        link.on('click', function(event) {
            event.preventDefault();
            // console.log( $(this).parent().next().attr('class') );
            if ( $(this).parent().next().css('display') === 'none'){
                // block
                 table.find('.faq-con').slideUp(500);//css('display','none');
                $(this).parent().next().slideDown(500);//.css('display','block');

                //  class add
                 link.attr('class','faq-link');
                 $(this).addClass('selected');
            } else {
                // none
                $(this).parent().next().slideUp(500);//.css('display','none');

                //  class add
                $(this).removeClass('selected');
            }
        });

    },
    fapShowHide2: function() {
        var table = $('.clause_table'),
            link = table.find('a');
            
        link.on('click', function(event) {
            event.preventDefault();
            // console.log( $(this).parent().next().attr('class') );
            if ( $(this).parent().next().css('display') === 'none'){
                // block
                 // table.find('.con').slideUp(500);//css('display','none');
                $(this).parent().next().slideDown(500);//.css('display','block');
            } else {
                // none
                $(this).parent().next().slideUp(500);//.css('display','none');
            }
        });

    }
};


         /**
   * popup plugins
   */
/*(function(){
    'use strict';
    $('.popup_link').magnificPopup({
        type: 'ajax',
        //overflowY: 'scroll',
        // callbacks: {
        // beforeOpen: function() {
        //     $.fn.fullpage.setAllowScrolling(false);
        //     },
        //     beforeClose: function() {
        //         $.fn.fullpage.setAllowScrolling(true);
        //     }
        // }
    });
})();*/

/*�대�吏� 由ъ궗�댁쫰*/
var imgResize = {
    init: function() {
        this.Resize02();
        this.Resize03();
    },

    Resize02: function() {
        // pc/mo�대�吏� 援먯껜
        var winW =$(window).width();
        var resize_img = $('.img_size img');

        $(resize_img).each(function(){
            var img1 = $(this).attr("src").replace("_m.png",".png"); 
            $(this).attr("src",img1);
        });

        if(winW < 1024){
            $(resize_img).each(function(){
                var img2 = $(this).attr("src").replace(".png","_m.png");  
                $(this).attr("src",img2);
            });
        }else{
            $(resize_img).each(function(){
                var img3 = $(this).attr("src").replace("_m.png",".png"); 
                $(this).attr("src",img3);
            });
        }
    },
    Resize03: function() {

        var btn_menu = $('.on_img');
        // on/off�대�吏� 援먯껜
        
        btn_menu.on('mouseover focus',function(){
           /*�대�吏� set*/
            $(this).find('img').each(function(){
              var img1 = $(this).attr("src").replace("_off.png","_on.png");  
               $(this).attr("src",img1);
            });       
       });
       btn_menu.on('mouseleave',function(){
            $(btn_menu).find('img').each(function(){
              var img1 = $(this).attr("src").replace("_on.png","_off.png");
               $(this).attr("src",img1);
            });   
        });

    },    
};

    //蹂��� 遺덈윭�ㅺ린 
$(document).ready(function(){
    imgResize.init(); 

    $(window).resize(function(){      
       mainScroll.init();
    })
    /*$().UItoTop({ 
      easingType: 'easeOutQuart',
      min:150
    });*/
 


    // �뚯씪泥⑤�
    function file_upload(){
      var tmp = $(this).val();
      $(this).siblings('p').text(tmp);
    };
    $('.file_box > input').change(file_upload);


	  function heightmain(){
		  var box1_w = $('html').height();
		  $('.hd_pops .modal-body').css({"max-height": box1_w - 200});
	  };
	  $(window).ready(function(){heightmain();});
	  $(window).resize(function(){heightmain();});


});



//SMOOTHSCROLL PLUGIN-------------------------------------------------------------------  
if (navigator.appVersion.indexOf("Win")!=-1) {
  // SmoothScroll for websites v1.2.1
  // Licensed under the terms of the MIT license.
  // People involved
  //  - Balazs Galambosi (maintainer)  
  //  - Michael Herf     (Pulse Algorithm)
!function(){function e(){var e=!1;e&&c("keydown",o),g.keyboardSupport&&!e&&u("keydown",o)}function t(){if(document.body){var t=document.body,r=document.documentElement,a=window.innerHeight,o=t.scrollHeight;if(x=document.compatMode.indexOf("CSS")>=0?r:t,w=t,e(),S=!0,top!=self)y=!0;else if(o>a&&(t.offsetHeight<=a||r.offsetHeight<=a)&&(r.style.height="auto",x.offsetHeight<=a)){var n=document.createElement("div");n.style.clear="both",t.appendChild(n)}g.fixedBackground||b||(t.style.backgroundAttachment="scroll",r.style.backgroundAttachment="scroll")}}function r(e,t,r,a){if(a||(a=1e3),d(t,r),1!=g.accelerationMax){var o=+new Date,n=o-T;if(n<g.accelerationDelta){var i=(1+30/n)/2;i>1&&(i=Math.min(i,g.accelerationMax),t*=i,r*=i)}T=+new Date}if(M.push({x:t,y:r,lastX:0>t?.99:-.99,lastY:0>r?.99:-.99,start:+new Date}),!C){var l=e===document.body,u=function(){for(var o=+new Date,n=0,i=0,c=0;c<M.length;c++){var s=M[c],d=o-s.start,f=d>=g.animationTime,p=f?1:d/g.animationTime;g.pulseAlgorithm&&(p=h(p));var m=s.x*p-s.lastX>>0,w=s.y*p-s.lastY>>0;n+=m,i+=w,s.lastX+=m,s.lastY+=w,f&&(M.splice(c,1),c--)}l?window.scrollBy(n,i):(n&&(e.scrollLeft+=n),i&&(e.scrollTop+=i)),t||r||(M=[]),M.length?E(u,e,a/g.frameRate+1):C=!1};E(u,e,0),C=!0}}function a(e){S||t();var a=e.target,o=l(a);if(!o||e.defaultPrevented||s(w,"embed")||s(a,"embed")&&/\.pdf/i.test(a.src))return!0;var n=e.wheelDeltaX||0,i=e.wheelDeltaY||0;return n||i||(i=e.wheelDelta||0),!g.touchpadSupport&&f(i)?!0:(Math.abs(n)>1.2&&(n*=g.stepSize/120),Math.abs(i)>1.2&&(i*=g.stepSize/120),r(o,-n,-i),void e.preventDefault())}function o(e){var t=e.target,a=e.ctrlKey||e.altKey||e.metaKey||e.shiftKey&&e.keyCode!==H.spacebar;if(/input|textarea|select|embed/i.test(t.nodeName)||t.isContentEditable||e.defaultPrevented||a)return!0;if(s(t,"button")&&e.keyCode===H.spacebar)return!0;var o,n=0,i=0,u=l(w),c=u.clientHeight;switch(u==document.body&&(c=window.innerHeight),e.keyCode){case H.up:i=-g.arrowScroll;break;case H.down:i=g.arrowScroll;break;case H.spacebar:o=e.shiftKey?1:-1,i=-o*c*.9;break;case H.pageup:i=.9*-c;break;case H.pagedown:i=.9*c;break;case H.home:i=-u.scrollTop;break;case H.end:var d=u.scrollHeight-u.scrollTop-c;i=d>0?d+10:0;break;case H.left:n=-g.arrowScroll;break;case H.right:n=g.arrowScroll;break;default:return!0}r(u,n,i),e.preventDefault()}function n(e){w=e.target}function i(e,t){for(var r=e.length;r--;)z[N(e[r])]=t;return t}function l(e){var t=[],r=x.scrollHeight;do{var a=z[N(e)];if(a)return i(t,a);if(t.push(e),r===e.scrollHeight){if(!y||x.clientHeight+10<r)return i(t,document.body)}else if(e.clientHeight+10<e.scrollHeight&&(overflow=getComputedStyle(e,"").getPropertyValue("overflow-y"),"scroll"===overflow||"auto"===overflow))return i(t,e)}while(e=e.parentNode)}function u(e,t,r){window.addEventListener(e,t,r||!1)}function c(e,t,r){window.removeEventListener(e,t,r||!1)}function s(e,t){return(e.nodeName||"").toLowerCase()===t.toLowerCase()}function d(e,t){e=e>0?1:-1,t=t>0?1:-1,(k.x!==e||k.y!==t)&&(k.x=e,k.y=t,M=[],T=0)}function f(e){if(e){e=Math.abs(e),D.push(e),D.shift(),clearTimeout(A);var t=D[0]==D[1]&&D[1]==D[2],r=p(D[0],120)&&p(D[1],120)&&p(D[2],120);return!(t||r)}}function p(e,t){return Math.floor(e/t)==e/t}function m(e){var t,r,a;return e*=g.pulseScale,1>e?t=e-(1-Math.exp(-e)):(r=Math.exp(-1),e-=1,a=1-Math.exp(-e),t=r+a*(1-r)),t*g.pulseNormalize}function h(e){return e>=1?1:0>=e?0:(1==g.pulseNormalize&&(g.pulseNormalize/=m(1)),m(e))}var w,v={frameRate:150,animationTime:500,stepSize:150,pulseAlgorithm:!0,pulseScale:6,pulseNormalize:1,accelerationDelta:20,accelerationMax:1,keyboardSupport:!0,arrowScroll:50,touchpadSupport:!0,fixedBackground:!0,excluded:""},g=v,b=!1,y=!1,k={x:0,y:0},S=!1,x=document.documentElement,D=[120,120,120],H={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},g=v,M=[],C=!1,T=+new Date,z={};setInterval(function(){z={}},1e4);var A,N=function(){var e=0;return function(t){return t.uniqueID||(t.uniqueID=e++)}}(),E=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(e,t,r){window.setTimeout(e,r||1e3/60)}}(),K=/chrome/i.test(window.navigator.userAgent),L="onmousewheel"in document;L&&K&&(u("mousedown",n),u("mousewheel",a),u("load",t))}();
};
//SMOOTHSCROLL END-------------------------------------------------