import SliderItem from "./slideritem.model";
import Arrow from "./arrow.model";

export default class Slider {
    constructor(name, nameListContainer, nameBubblesContainer, current) {
        this.el = document.querySelector('*[data-name="' + name + '"]');
        this.arrows = this.getArrows(name);
        this.sliderItems = null;
        this.current = current;
        this.listEl = this.el.querySelector('*[data-name="' + nameListContainer + '"]');
        this.bubblesEl = this.el.parentNode.querySelector('*[data-name="' + nameBubblesContainer + '"]');
        //this.timer = setInterval(this.moveSliderItem, 7000);
    };

    init() {
        this.loadDatas();
        document.addEventListener("move", this.move.bind(this));
    };

    moveSliderItem() {
        let event = new CustomEvent("move", {detail: {directionUnit: 1}});
        document.dispatchEvent(event);
    };

    move(e) {
        let active = this.listEl.querySelector(".slider_item_active");
        let idActive = active.id.substr(active.id.length - 1);
        let futurActive = 0;
        if (e.detail.directionUnit != null) {
            futurActive = parseInt(idActive) + parseInt(e.detail.directionUnit);
            if (futurActive == -1) {
                futurActive = this.sliderItems.length - 1;
            }
            else if (futurActive == this.sliderItems.length) {
                futurActive = 0;
            }
        }
        else if (e.detail.directionId != null) {
            futurActive = parseInt(e.detail.directionId);
        }
        this.changeCurrentItem(futurActive);
        this.resetTimer();
    };

    resetTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(this.moveSliderItem, 7000);
    };

    build(datas) {
        this.sliderItems = this.getItems(datas);
        this.buildSliderItems();
        this.buildBubblesItems();
        this.changeCurrentItem(this.current);
    };

    changeCurrentSliderItem(current) {
        let futurActive = document.getElementById("listnews_products_item_" + current);
        let active = document.querySelector(".slider_item_active");
        if (active != null) {
            active.classList.remove("slider_item_active");
        }
        futurActive.classList.add("slider_item_active");
    };

    changeCurrentBubbleItem(current) {
        let futurActive = document.getElementById("slider_image_" + current);
        let active = this.bubblesEl.querySelector(".slider_image_active");
        if (active != null) {
            active.classList.remove("slider_image_active");
        }
        futurActive.classList.add("slider_image_active");
    };

    changeCurrentItem(current) {
        this.changeCurrentSliderItem(current);
        this.changeCurrentBubbleItem(current);
        this.sliderItems[current].startAnimation(15);
    };

    getItems(datas) {
        let items = [];
        let i = 0;
        let l = datas.length;
        for (i; i < l; i++) {
            items[i] = new SliderItem(i, datas[i]);
        }
        return items;
    };

    getArrows(name) {
        let arrowsEl = document.querySelectorAll('*[data-target="' + name + '"]');
        let i = 0;
        let l = arrowsEl.length;
        let arrows = [];
        for (i; i < l; i++) {
            arrows[i] = new Arrow(arrowsEl[i]);
            arrows[i].init();
        }
        return arrows;
    };

    loadDatas() {
        let req = new XMLHttpRequest();
        req.open("GET", "datas/slider.json");
        req.addEventListener("readystatechange", this.datasLoaded.bind(this, req));
        req.send();
    };

    datasLoaded(req) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                this.build(JSON.parse(req.responseText));
            } else {
                console.log('Erreur');
            }
        } else {
            switch (req.readyState) {
                case 0:
                    console.log('init');
                    break;
                case 1:
                    console.log('open');
                    break;
                case 2:
                    console.log('sended');
                    break;
                case 3:
                    console.log('got');
                    break;

            }
        }
    };

    buildSliderItems() {
        let i = 0;
        let l = this.sliderItems.length;
        for (i; i < l; i++) {
            let sliderItem = document.createElement("li");
            sliderItem.classList.add("listnews_products_item");
            sliderItem.id = ("listnews_products_item_" + i);
            sliderItem.innerHTML = this.sliderItems[i].html;
            this.sliderItems[i].el = sliderItem;
            this.listEl.appendChild(sliderItem);
        }
    };

    buildBubblesItems() {
        let i = 0;
        let l = this.sliderItems.length;
        for (i; i < l; i++) {
            let bubbleItem = document.createElement("img");
            bubbleItem.classList.add("slider_image");
            bubbleItem.id = ("slider_image_" + i);
            bubbleItem.src = this.sliderItems[i].image;
            bubbleItem.addEventListener("click", function () {
                let id = this.id.substr(this.id.length - 1);
                let event = new CustomEvent("move", {detail: {directionId: id}});
                document.dispatchEvent(event);
            });
            this.bubblesEl.appendChild(bubbleItem);
        }
    };
}