export default class VelosItems{
    constructor(containerClassName, listClassName, filterId, searchElQuery){
        this.el = document.getElementsByClassName(containerClassName)[0];
        this.listVelosEl = this.el.getElementsByClassName(listClassName)[0];
        this.filterEl = this.el.querySelector("#" + filterId);
        this.currentFilterValue = this.filterEl.querySelector("option[selected]").value;
        this.filterEl.addEventListener("change", this.filtreHasChange.bind(this));
        this.velosItems = [];
        this.velosItemsBase = [];
        if(typeof searchElQuery !== "undefined"){
            this.searchEl = this.el.querySelector(searchElQuery);
            this.searchEl.addEventListener("keyup", this.searchHasChange.bind(this));
        }
    };

    init(){
        this.loadDatas();
    };

    filtreHasChange(e) {
        this.velosItems = this.sortByAttribute(e.target.value);
        this.buildListVelos();
    };

    searchHasChange() {
        this.velosItems = this.sortBySearch(this.searchEl.value);
        this.buildListVelos();
    };

    sortByAttribute(name) {
        return this.velosItems.sort(function(a,b) {return (eval("a." + name) > eval("b." + name)) ? 1 : ((eval("b." + name) > eval("a." + name)) ? -1 : 0);} );
    };

    sortBySearch(value) {
        let arr = [];
        for(let i = 0; i < this.velosItemsBase.length; i++){
            if(this.velosItemsBase[i].name.indexOf(value) !== -1){
                arr.push(this.velosItemsBase[i]);
            }
        }
        return arr;
    }

    loadDatas() {
        let req = new XMLHttpRequest();
        req.open("GET", "datas/velos.json");
        req.addEventListener("readystatechange", this.datasLoaded.bind(this, req));
        req.send();
    };

    datasLoaded(req) {
        if (req.readyState === 4) {
            if (req.status === 200) {
                this.getVelosItems(JSON.parse(req.responseText));
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

    getVelosItems(datas) {
        datas.forEach((function (veloDatas) {
            this.velosItems.push(new VeloItem(veloDatas));
            this.velosItemsBase.push(new VeloItem(veloDatas));
        }).bind(this));
        this.velosItems = this.sortByAttribute(this.currentFilterValue);
        this.buildListVelos();
    };

    buildListVelos() {
        this.listVelosEl.innerHTML = "";
        this.velosItems.forEach((function (veloItem) {
           this.listVelosEl.appendChild(veloItem.el);
        }).bind(this));
    };
}

class VeloItem {
    constructor(datasJson){
        for (let k in datasJson){
            if(datasJson.hasOwnProperty(k))
                eval("this." + k + " = '" + datasJson[k] + "'");
        }
        this.el = this.buildVeloItem();
    };

    buildVeloItem() {
        let element = document.createElement("li");
        let stockDanger = "";
        element.classList.add("listvelos_item");
        if(this.stock <= 2){ stockDanger = " velo_item-limit"; }
        element.innerHTML =
            `<li class="listvelos_item">
                    <article class="velo_item${stockDanger}">
                        <img class="listvelos_item_image" alt="Photo du modèle" src="${this.image}">
                        <header class="velo_item-top">
                            <h1>${this.name}</h1>
                            <span class="velo_item_info">${this.type}</span>
                        </header>
                        <footer class="velo_item-bottom">
                            <span>${this.stock} en stock</span>
                        </footer>
                    </article>
                </li>`;
        return element;
    };
}