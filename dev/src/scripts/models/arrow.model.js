export default class Arrow {
    constructor(el){
        this.el = el;
        this.value = el.getAttribute("data-direction");
    };
    init(){
        this.el.addEventListener("click", this.sendMoveEvent.bind(this));
    };
    sendMoveEvent(){
        let event = new CustomEvent("move", {detail: {directionUnit: this.value}});
        document.dispatchEvent(event);
    };
}