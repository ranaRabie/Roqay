function fixedHeader(){
    try {
        const headerDiv = document.getElementById("header-wrap");
        const navBar = document.querySelector('.navbar');
        if(window.pageYOffset  >= 35 ){ //&& window.innerWidth >= 768
            headerDiv.classList.add('header-fixed');
        }
        else{
            headerDiv.classList.remove('header-fixed');
        }
    }
    catch(err) {
        return false;
    }
}


function initiateAnimation(){
    AOS.init({
        easing: 'ease-in-out-sine',
        duration: 800,
        once: true,
    });
}

function mobCloseMainMenu(){
    // $('.navbar-collapse').delay(0).animate({left: '-300px'}, 1000);
    $('.navbar-collapse').fadeOut();
    $('.navbar-collapse').removeClass('active-nav');
}

function mobOpenMainMenu(){
    // $('.navbar-collapse').delay(0).animate({left: '0'}, 1000);
    $('.navbar-collapse').fadeIn();
    $('.navbar-collapse').addClass('active-nav');
}

// function loaderHandler(){
//     function onReady(callback) {
//         var intervalId = window.setInterval(function() {
//           if (document.getElementsByTagName('body')[0] !== undefined) {
//             window.clearInterval(intervalId);
//             callback.call(this);
//           }
//         }, 1000);
//       }
      
//       function setVisible(selector, visible) {
//         document.querySelector(selector).style.display = visible ? 'block' : 'none';
//       }
      
//     onReady(function() {
//         setVisible('.page-wrapper', true);
//         setVisible('#loader', false);
//     });
// }

// loaderHandler();

document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
         document.querySelector('.page-wrapper').style.visibility="hidden";
    } else if (state == 'complete') {
        setTimeout(function(){
           document.getElementById('loader').style.visibility="hidden";
           document.querySelector('.page-wrapper').style.visibility="visible";
        },1000);
    }
}

function textActiveAnimation(){
    $('.counter-desc-item:first-child').addClass('active');
    
    setInterval(() => {
        let activeText = $('.counter-desc-item.active');
        $('.counter-desc-item').removeClass('active');
        if(activeText.is(':last-child')){
            $('.counter-descs .counter-desc-item:first-child').addClass('active');
        }else{
            activeText.next().addClass('active');
        } 
    
    }, 1000);
    
    

}

function slidingTit(){
    if($('.contact-tit')){
        $('.contact-tit p:first-child').addClass('active');
        
        setInterval(function(){
            let activeP = $('.contact-tit p.active');
            if(activeP.is(':last-child')){
                $('.contact-tit p:first-child').addClass('active');
            }else{
                activeP.next().addClass('active');
            }
            setTimeout(function(){
                activeP.removeClass('active');
            }, 300);
            
        }, 2500);
        
    }
}

function toggleTeam(){
    let logoShowCheck = $('.about-logo-team').css('display');
    if(logoShowCheck === 'none'){
        $('.about-logo-team').fadeIn();
        $('.team-membs-container').fadeOut();
        $('.tit-toggle-team').text('hold to show heroes');
        setTimeout(function(){
            $('.about-logo-team').css('transform', 'scale(1)');
        }, 100);        
    }else{
        $('.about-logo-team').css('transform', 'scale(1.5)');
        $('.tit-toggle-team').text('hold to hide heroes');
        setTimeout(function(){
            $('.about-logo-team').fadeOut();
            $('.team-membs-container').fadeIn();

        }, 1000);   
    }
}

function activeTeamMember(member){
    $('.team-member-item').not($(member)).removeClass('active');
    $(member).toggleClass('active');
}

function toggleCareers(){
    let careers = $('.careers-blk');
    careers.toggleClass('active');

    if(careers.hasClass('active')){
        $('.careers-toggler p').text('click to hide positions');
        $('.careers-toggler-arrow i').addClass('fa-angle-right');
    }else{
        $('.careers-toggler p').text('click to show positions');
        $('.careers-toggler-arrow i').removeClass('fa-angle-right');
    }
    
    
}
function servicesSlider(){
    let servicesSlider = $('#services-slider .owl-carousel');
    servicesSlider.owlCarousel({
        items:1,
        // loop:true,
        margin:10,
        nav: true,
        animateOut: 'fadeOut',
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true
    });

    setTimeout(function(){
        let horzSlidesNo = $('#services-slider .owl-stage > div').length;
        let sliderNumHTML = `<span class="horz-slide-num">
                <span class="horz-slide-active-num">1</span>
                /
                <span class="horz-slide-total-num">`+horzSlidesNo+`</span>
            </span>`;
        let slideTitHTML = `<div class="horz-slide-tit"></div>`;
    
        $(sliderNumHTML).insertBefore('#services-slider .owl-next');
        $(slideTitHTML).insertBefore('#services-slider .owl-nav');

        $('.horz-slide-tit').text($('#services-slider .owl-item:first-child .horz-slide').attr('data-title'));
    }, 300);

    servicesSlider.on('changed.owl.carousel', function(event) {
        setTimeout(function(){
            let slideNum = $('#services-slider .active .horz-slide').attr('data-num');
            let slideTit = $('#services-slider .active .horz-slide').attr('data-title');
            
            $('.horz-slide-tit').text(slideTit);
            $('.horz-slide-active-num').text(slideNum);
        }, 300);
    });
    

}

let distance;
$(window).scroll(function() {
    fixedHeader();
    if($('div').hasClass('counters-blk-wrapper')){
        if ( $(window).scrollTop() >= distance ) {
            // Your div has reached the top
            // number count for stats, using jQuery animate
    
            $('.counting').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                
                $({ countNum: $this.text()}).animate({
                countNum: countTo
                },
            
                {
            
                duration: 7000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            
                });  
            
            });
        }
    }
    
});

$(document).ready(function () {
    initiateAnimation();
    textActiveAnimation();
    slidingTit();
    
    if($('#services-slider')){
        servicesSlider();
    }
    
    var ua = navigator.userAgent.toLowerCase(); 
    if (ua.indexOf('safari') != -1) { 
        if (ua.indexOf('chrome') > -1) {
            // alert("1") // Chrome
        } else {
            // alert("2") // Safari
            $('.mocks-mob').addClass('mocks-none');
            $('.mocks-mob').removeClass('mocks-mob');
        }
    }

    if($('#project-carousel')){
        $('#project-carousel.mob-carousel').owlCarousel({
            center: true,
            items:5,
            loop:true,
            margin:10,
            // autoplay: true,
            dots: true,
            responsive:{
                0:{
                    items:1
                },
                576:{
                    items:3
                },
                992:{
                    items:5
                }
            }
        });

        $('#project-carousel.web-carousel').owlCarousel({
            margin:30,
            loop:true,
            autoWidth:true,
            // items:4
        })
    }

    // if($('img').hasClass('about-logo-team')){
    //     $('.about-logo-team').click(function(){
    //         // alert('clicked');
    //         showTeam();
    //     });
    // }
    

    if($('div').hasClass('counters-blk-wrapper')){
        distance = $('#counters-blk').offset().top;
    }

    try {
        $('#datepicker').datepicker();
    }
    catch(err) {
        // NO DATE PICKER IN PAGE
    }
});