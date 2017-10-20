export default class SliderItem {
    constructor(i, datas) {
        this.el = null;
        this.image = datas.image;
        this.title = datas.title;
        this.description = datas.description;
        this.url = datas.url;
        this.animation = datas.animation;
        this.html = this.gerenateHml();
    }

    gerenateHml () {
        return "            <article class='news_product_item'>" +
            "                  <img class='new_product_image' src='" + this.image + "' alt='Image vélo nouveauté'>" +
            "                   <div class='new_product_content'>" +
            "                       <div class='new_product_text'><h2 class='new_product_title'>" + this.title + "</h2>" +
            "                       <p class='new_product_descr'>" + this.description + "</p></div>" +
            "                       <a src='" + this.url + "' class='button button-link button-link-large button_link-anime button_link-anime-green new_product_button'>commander</a>" +
            "                   </div>" +
            "            </article>";
    };

    getParams () {
        let Param = {};
        switch (parseInt(this.animation)) {
            case 1:
                Param.image = {
                    x: -4,
                    y: 0
                };
                Param.text = {
                    x: 0,
                    y: -6
                };
                Param.button = {
                    x: 0,
                    y: 7
                };
                break;
            case 2:
                Param.image = {
                    x: 3,
                    y: 0
                };
                Param.text = {
                    x: 6,
                    y: 0
                };
                Param.button = {
                    x: 0,
                    y: 5
                };
                break;
            case 3:
                Param.image = {
                    x: 0,
                    y: -5
                };
                Param.text = {
                    x: -5,
                    y: 0
                };
                Param.button = {
                    x: 9,
                    y: 0
                };
                break;
            default:
                Param.image = {
                    x: 20,
                    y: 30
                };
                Param.text = {
                    x: 0,
                    y: 0
                };
                Param.button = {
                    x: 0,
                    y: 0
                };
        }
        return Param;
    };

    startAnimation (coeff) {
        let tabParams = this.getParams();
        let imageEl = this.el.querySelector(".new_product_image");
        let textEl = this.el.querySelector(".new_product_text");
        let buttonEl = this.el.querySelector(".new_product_button");
        TweenMax.fromTo(imageEl, 1, {x: (tabParams.image.x * coeff), y: (tabParams.image.y * coeff), opacity: 0}, {
            x: 0,
            y: 0,
            opacity: 1
        });
        TweenMax.fromTo(textEl, 1, {x: (tabParams.text.x * coeff), y: (tabParams.text.y * coeff), opacity: 0}, {
            x: 0,
            y: 0,
            opacity: 1
        });
        TweenMax.fromTo(buttonEl, 1, {
            x: (tabParams.button.x * coeff),
            y: (tabParams.button.y * coeff),
            opacity: 0
        }, {x: 0, y: 0, opacity: 1});
    };
}