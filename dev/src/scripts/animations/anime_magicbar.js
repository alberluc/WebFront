var magicline = document.createElement("div");
var active = document.getElementsByClassName("active")[0];
var menu = document.getElementsByClassName('header_menu')[0];
var menu_items = document.getElementsByClassName('header_menu_item');

magicline.classList.add("magicline");
menu.appendChild(magicline);

var leftDistanceWindowsActive = active.getBoundingClientRect().left;

window.addEventListener("resize", function () {
    leftDistanceWindowsActive = active.getBoundingClientRect().left;
});

moveMagicBar(active);
setTimeout(function(){
    magicline.style.transition = "all 0.5s ease-out";
}, 500);

for(var i = 0; i < menu_items.length; i++){
    menu_items[i].addEventListener("mouseenter", function(){
        moveMagicBar(this);
    });
    menu_items[i].addEventListener("mouseout", function(){
        moveMagicBar(active);
    });
}

function moveMagicBar(elem){
    magicline.style.transform = "translate3d(" + (elem.getBoundingClientRect().left - leftDistanceWindowsActive) + "px" + ", 0px, 0px)";
    magicline.style.width = elem.offsetWidth + "px";
}