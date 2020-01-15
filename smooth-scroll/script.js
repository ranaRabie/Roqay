// Initialize the plugin with no custom options
$(document).ready(function () {
    // None of the options are set
    $("#makeMeScrollable").smoothDivScroll({
        hotSpotScrolling: false,
        touchScrolling: true,
        manualContinuousScrolling: true,
        mousewheelScrolling: false,
        // autoScrollingMode: "onStart",
        // startAutoScrolling: true
    });
});

$("#makeMeScrollable").bind("mouseleave", function(){
    $("#makeMeScrollable").smoothDivScroll("startAutoScrolling");
}).bind("mouseup", function(){
    $("#makeMeScrollable").smoothDivScroll("startAutoScrolling");
}).bind("mouseout", function(){
    $("#makeMeScrollable").smoothDivScroll("startAutoScrolling");
}).bind("mouseover", function(){
    $("#makeMeScrollable").smoothDivScroll("startAutoScrolling");
}).bind("mousemove", function(){
    $("#makeMeScrollable").smoothDivScroll("startAutoScrolling");
}).bind("mousedown", function(){
    $("#makeMeScrollable").smoothDivScroll("startAutoScrolling");
});