
//onLoad
$(document).ready(closeAllDefs());

//unhide definitions when it's heading is clicked in the menu
// $(document).ready(()=>{
//     $(".def-dropdown a").click(function(){
//         $(this).parent(".def-dropdown").children("p").slideToggle("100");
//     });
// });

//definition bar functions
function openNav() {
    document.getElementById("renderCanvas").style.width = "calc(100% - 350px)";
    document.getElementById("sideNav").style.width = "350px";
}

function closeNav() {
    document.getElementById("renderCanvas").style.width = "100%";
    document.getElementById("sideNav").style.width = "0";
}

function closeAllDefs(){
    $(".def-dropdown").children("p").hide();
}

function openDef(term, closeAll = true){
    openNav();
    if(closeAll == true){
        $(".def-dropdown[id!='" + term + "']").children("p").slideUp("100");
    }

    $(document).ready( ()=>{
        $("#" + term).children("p").slideDown("100");
    });
}

function openFromDef(term, func){
    $("#" + term).children("a").click(
        function(){
            console.log(term);
            func();
            $(".def-dropdown[id!='" + term + "']").children("p").slideUp("100");
            $(this).parent().children("p").slideDown("100");
            // document.getElementById(term).scrollIntoView(true);
        }
    );
}