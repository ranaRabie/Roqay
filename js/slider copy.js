$(document).ready(function () {

    let showContent = false; // #scrollToBody Click Check 
    
    // Stop Body, HTML scroll
    $('body, html').css('overflow', 'hidden');

    // Scroll To Body
    $('#scrollToBody').click(() => {
        showContent = true;
        $('body, html').css('overflow', 'initial');

        $('#horz-slider .horz-slide').removeClass('active');
        setTimeout(() => {
            $('#horz-slider .horz-slide:first-child').addClass('active');
        }, 500);

        // setInterval(() => {
        //     $('.horz-slide-next').click();
        // }, 4500);
        
    });

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
    });

    // Mouse Wheel Slider Animation
    $(document.body).on('DOMMouseScroll mousewheel', function (e) {
        if(showContent === false){
            var dir = 'up'; // wheel scroll direction
            if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
                dir = 'down';
                $('.nav-slider a.active').next().click();
            } else {
                dir = 'up';
                $('.nav-slider a.active').prev().click();
            }
        }else{
            return false;
        }
        
    });

});

$(document).ready(function(){

    

    $('.horz-slide-next').click(function(){
        // Get Active Slide
        let activeSlide = $('.horz-slide.active');
        // Remove Active Class
        activeSlide.removeClass('active');

        // Calculate Slides Wrapper Left
        let slideWhidth = $('#horz-slider').width();
        let wrapperLeft = $('.horz-slides-wrapper').css('left');
        let wrapperLeftVal = wrapperLeft.slice(0, -2);

        setTimeout(function(){
            // IF Last Child Get First Child  & Move Wrapper to its Start
            // ELSE Get Next Child  & Move Wrapper to Next Slide
            if(activeSlide.is(':last-child')){
                $('#horz-slider .horz-slide:first-child').addClass('active');
                $('.horz-slides-wrapper').css('left', '0px');
            }else{
                activeSlide.next().addClass('active');
                $('.horz-slides-wrapper').css('left', parseInt(wrapperLeftVal)-parseInt(slideWhidth)+'px');
            } 
        }, 1200);
    });
    $('.horz-slide-prev').click(function(){
        let activeSlide = $('.horz-slide.active');
        activeSlide.removeClass('active');

        let slideWhidth = $('#horz-slider').width();
        let wrapperLeft = $('.horz-slides-wrapper').css('left');
        let wrapperLeftVal = wrapperLeft.slice(0, -2);
        
        setTimeout(function(){
            // IF First Child Get Last Child & Move Wrapper to its end 
            // ELSE Get Previous Child Child  & Move Wrapper to Previous Slide
            if(activeSlide.is(':first-child')){
                $('#horz-slider .horz-slide:last-child').addClass('active');
                $('.horz-slides-wrapper').css('left', -((($('.horz-slides-wrapper .horz-slide').length)-1)*slideWhidth)+'px');
            
            }else{
                activeSlide.prev().addClass('active');
                $('.horz-slides-wrapper').css('left', parseInt(wrapperLeftVal)+parseInt(slideWhidth)+'px');
            } 
        }, 1200);
    });
});