let showContent;
$(document).ready(function () {

    showContent = false; // #scrollToBody Click Check   // For Mouse Wheel
    
    // Stop Body, HTML scroll
    // $('body, html').css('overflow-y', 'hidden');
    
    
    horzSliderFirstSlideActive();
    horzSliderAutoPlay();


    // Scroll To Body
    scrollToBody();

    verticalSliderHandling();

    // Mouse Wheel Slider Animation
    // $(document.body).on('DOMMouseScroll mousewheel', function (e) {
    //     var dir = 'up'; // wheel scroll direction
    //     if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
    //         dir = 'down';
    //         $('#scrollToBody').click();
    //         $('html, body').animate({
    //             scrollTop: $("#main-content").offset().top
    //         }, 1000);
            
    //     } else {
    //         return false;
    //     }
        
    // });

});

// VERTICAL SLIDER
function scrollToBody(){
    $('#scrollToBody').click(function() {
        showContent = true; // For Mouse Wheel
        // $('body, html').css('overflow-y', 'initial');
        
        // horzSliderFirstSlideActive();
        // horzSliderAutoPlay();
    });
}
function verticalSliderHandling(){

    $('.nav-slider a:first-child').addClass('active');
    $('#main-slider .slide:first-child').addClass('slide-active');

    // Link Click Slider Animation
    $('.nav-slider a').click(function(){
        // Get Slide Id
        let slideId = $(this).attr('data-slide');

        // Add Link Active
        $(this).addClass('active');
        $('.nav-slider a').not($(this)).removeClass('active');

        // Change Slide Bottom
        $('.slide').not($(slideId)).css("bottom", "-100%");
        $(slideId).css("bottom", "0");

        // Add Active Class To Slide
        setTimeout(function(){
            $(slideId).addClass('slide-active');
        }, 500);
        $('.slide').not($(slideId)).removeClass('slide-active');
        
        //repeat Canvas Animation
        if($(slideId).is(':first-child')){
            clearFrame();
        }

        
        clearInterval(Anim);
        // setInterval(verticalSliderAnimInterval, 9500);
        Anim = setInterval(function(){
            if($('.nav-slider a.active').is(':last-child')){
                $('.nav-slider a:first-child').click();
            }else{
                $('.nav-slider a.active').next().click();
            }
        }, 7500);
        
    });

    let Anim = setInterval(function(){
        if($('.nav-slider a.active').is(':last-child')){
            $('.nav-slider a:first-child').click();
        }else{
            $('.nav-slider a.active').next().click();
        }
    }, 7500);
    

    // Mouse Wheel Slider Animation
    // $(document.body).on('DOMMouseScroll mousewheel', function (e) {
    //     if(showContent === false){
    //         var dir = 'up'; // wheel scroll direction
    //         if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
    //             dir = 'down';

    //             if($('.nav-slider a.active').is(':last-child')){
    //                 $('.nav-slider a:first-child').click();
    //             }else{
    //                 $('.nav-slider a.active').next().click();
    //             }

                
    //         } else {
    //             dir = 'up';
    //             if($('.nav-slider a.active').is(':first-child')){
    //                 $('.nav-slider a:last-child').click();
    //             }else{
    //                 $('.nav-slider a.active').prev().click();
    //             }
                
    //         }
    //     }else{
    //         return false;
    //     }
        
    // });
}



// HORIZONTAL SLIDER 
// First Slide Acitve
function horzSliderFirstSlideActive(){
    $('#horz-slider .horz-slide').removeClass('active');
    setTimeout(function() {
        $('#horz-slider .horz-slide:first-child').addClass('active');
        let slideNum = $('#horz-slider .horz-slide:first-child').attr('data-num');
        let slideTit = $('#horz-slider .horz-slide:first-child').attr('data-title');
        $('.horz-slide-tit').text(slideTit);
        $('.horz-slide-active-num').text(slideNum);

        $('.horz-slides-wrapper').css('left', '0px');
    }, 500);
}
// Auto Play Slides 
function horzSliderAutoPlay(){
    setInterval(function() {
        $('.horz-slide-next').click();
    }, 5500);
}
// Move Slides
function horzSliderMove(dir){

    // Get Active Slide
    let activeSlide = $('.horz-slide.active');
    // Remove Active Class
    activeSlide.removeClass('active');

    // Calculate Slides Wrapper Left
    let slideWhidth = $('#horz-slider').width();
    let wrapperLeft = $('.horz-slides-wrapper').css('left');
    let wrapperLeftVal = wrapperLeft.slice(0, -2);

    let slidesNo = $('#horz-slider .horz-slide').length;
    let slidesWrapperFullWidth = slidesNo * slideWhidth
    

    setTimeout(function(){
        if(dir === 'next'){
            // IF Last Child Get First Child  & Move Wrapper to its Start
            // ELSE Get Next Child  & Move Wrapper to Next Slide
            if(activeSlide.is(':last-child')){
                $('#horz-slider .horz-slide:first-child').addClass('active');
                $('.horz-slides-wrapper').css('left', '0px');
            }else{
                activeSlide.next().addClass('active');
                
                let leftVal = parseInt(wrapperLeftVal)-parseInt(slideWhidth);

                if(leftVal >= slidesWrapperFullWidth - slideWhidth){
                    $('.horz-slides-wrapper').css('left', '0 px');
                }else{
                    $('.horz-slides-wrapper').css('left', leftVal+'px');
                }
            
            } 
        }else if(dir === 'prev'){
            // IF First Child Get Last Child & Move Wrapper to its end 
            // ELSE Get Previous Child Child  & Move Wrapper to Previous Slide
            if(activeSlide.is(':first-child')){
                $('#horz-slider .horz-slide:last-child').addClass('active');
                $('.horz-slides-wrapper').css('left', -((($('.horz-slides-wrapper .horz-slide').length)-1)*slideWhidth)+'px');
            
            }else{
                activeSlide.prev().addClass('active');
                $('.horz-slides-wrapper').css('left', parseInt(wrapperLeftVal)+parseInt(slideWhidth)+'px');
            } 
        }

        let slideNum = $('.horz-slide.active').attr('data-num');
        let slideTit = $('.horz-slide.active').attr('data-title');
        

        $('.horz-slide-tit').text(slideTit);
        $('.horz-slide-active-num').text(slideNum);
       
        $('.horz-slide-prev').removeClass('disabled');
        $('.horz-slide-next').removeClass('disabled');

    }, 1200);
}

$(document).ready(function(){
    let slidesTot = $('.horz-slides-wrapper .horz-slide').length;
    $('.horz-slide-total-num').text(slidesTot);
    $('.horz-slide-next').click(function(){
        $(this).addClass('disabled');
        horzSliderMove('next');
    });
    $('.horz-slide-prev').click(function(){
        $(this).addClass('disabled');
        horzSliderMove('prev');
    });
});