$(document).ready(function(){
    $(".def-dropdown p").hide();
    $(".def-dropdown a").click(function () {
        console.log("yo");
        $(this).parent(".def-dropdown").children("p").slideToggle("100");
        $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
    });
});