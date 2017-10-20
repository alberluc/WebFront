export default class Hamburger {
    constructor(name, container) {
        this.el = document.querySelector("." + name);
        this.containerEl = document.querySelector("." + container);
        this.containerNameActive = container + "_menu-active";
    };

    init() {
        this.el.addEventListener('click', this.changeState.bind(this));
    };

    changeState() {
        if (this.containerEl.classList.contains(this.containerNameActive)) {
            this.containerEl.classList.remove(this.containerNameActive);
        }
        else {
            this.containerEl.classList.add(this.containerNameActive);
        }
    };
}