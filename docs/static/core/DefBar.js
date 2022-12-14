
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
    document.getElementById("resetButton").style.right = "400px";
}

function closeNav() {
    document.getElementById("renderCanvas").style.width = "100%";
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("resetButton").style.right = "70px";
}

function closeAllDefs(){
    $(".def-dropdown").children("p").hide();
}

function openDef(_term, _closeAll = true){
    openNav();
    if(_closeAll == true){
        $(".def-dropdown[id!='" + _term + "']").children("p").slideUp("100");
    }

    $(document).ready( ()=>{
        $("#" + _term).children("p").slideDown("100");
    });
}

//have to set onClick from parent as child doesn't exist when other scenes are loaded
function openFromDef(_term, _func){
    $("#defs").on('click', '#' + _term + ' a', // '#exhaust a'
        function(){
            _func();
            $(".def-dropdown[id!='" + _term + "']").children("p").slideUp("100");
            $(this).parent().children("p").slideDown("100");
            //document.getElementById(_term).scrollIntoView(true);
        }
    );
}

function switchDefs(_term, _index, _text){
    var li = $("<li class='def-dropdown' id='" + _term + "'></li>");
    
    var defTerm = $("<a>" + _term + "</a>");
    var defDef = $("<p></p>").text(_text);

    li.append(defTerm, defDef);
    $("#defs").append(li);

    //$(".def-dropdown").eq(index).attr("id", term);
    //$(".def-dropdown").eq(index).children("a").text(term);
    //$(".def-dropdown").eq(index).children("p").text(text);
}