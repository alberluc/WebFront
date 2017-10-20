const NB_SECTION_GRAPH = 8;

export default class GraphSellers{

    constructor(elementId, elementLegendId){
        this.el = document.getElementById(elementId);
        this.legendEl = document.getElementById(elementLegendId);
        this.legendElCtx = this.legendEl.getContext('2d');
        this.graphItems = [];
        this.elCtx = this.el.getContext('2d');
        this.width = this.el.offsetWidth;
        this.height = this.el.offsetHeight;
        this.maxValueSellerItem = 0;
        this.el.width = this.width;
        this.el.height = this.height;
        this.sectionHeight = this.height / NB_SECTION_GRAPH;
        window.addEventListener("resize", (function () {
            this.clearCanvas();
            this.width = this.el.offsetWidth;
            this.height = this.el.offsetHeight;
            this.el.width = this.width;
            this.el.height = this.height;
            this.sectionHeight = this.height / NB_SECTION_GRAPH;
            this.drawGraph();
        }).bind(this))
    }

    clearCanvas() {
        this.elCtx.clearRect(0,0,this.width,this.height);
    }

    init(){
        this.loadDatas();
    }

    loadDatas() {
        let req = new XMLHttpRequest();
        req.open("GET", "datas/sellers.json");
        req.addEventListener("readystatechange", this.datasLoaded.bind(this, req));
        req.send();
    }

    datasLoaded(req){
        if (req.readyState === 4) {
            if (req.status === 200) {
                this.buildGraphSellersItems(JSON.parse(req.responseText));
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
    }

    buildGraphSellersItems(datasJson) {
        let Elements = [];
        for(let elemItem in datasJson["elements"]){
            if(datasJson["elements"].hasOwnProperty(elemItem)) {
                Elements[elemItem] = new SellerItemElement(datasJson["elements"][elemItem]);
            }
        }
        for(let sellerItem in datasJson["sellers"]){
            if(datasJson["sellers"].hasOwnProperty(sellerItem)){
                this.graphItems[sellerItem] = [];
                for(let i = 0; i < datasJson["sellers"][sellerItem].length; i++) {
                    this.graphItems[sellerItem].push(new GraphSellerItem(sellerItem, datasJson["sellers"][sellerItem][i], Elements[datasJson["sellers"][sellerItem][i].type]));
                }
            }
        }
        for(let k in this.graphItems){
            for (let i in this.graphItems[k]){
                if(this.graphItems[k].hasOwnProperty(i) && this.maxValueSellerItem < this.graphItems[k][i].value){
                    this.maxValueSellerItem = this.graphItems[k][i].value;
                }
            }
        }
        this.drawLegend(Elements);
        this.drawGraph();
    }

    drawGraph() {
        this.drawBackgroundGradient();
        this.drawLines();
        this.drawCursorsSellers();
    }

    drawLines() {
        this.elCtx.beginPath();
        for(let x = this.sectionHeight; x < this.height - this.sectionHeight; x = x + this.sectionHeight){
            this.elCtx.moveTo(0, x);
            this.elCtx.lineTo(this.width, x);
        }
        this.elCtx.strokeStyle = "white";
        this.elCtx.lineWidth = 1;
        this.elCtx.stroke();
    }

    drawCursorsSellers() {
        let x = (this.width / Object.keys(this.graphItems).length) / 2;
        for(let mounth in this.graphItems){
            this.writeMounth(x, mounth);
            for (let cursor in this.graphItems[mounth]){
                if(this.graphItems[mounth].hasOwnProperty(cursor)){
                    let y = (this.height - this.sectionHeight) - ((this.graphItems[mounth][cursor].value / 100) * this.sectionHeight);
                    this.drawCursor(x, y, this.graphItems[mounth][cursor].SellerItemElement, this.elCtx);
                }
            }
            x = x + this.width / Object.keys(this.graphItems).length;
        }
    }

    writeMounth(x, mounth) {
        this.elCtx.font="15px Arial";
        this.elCtx.textAlign="center";
        this.elCtx.fillStyle = "white";
        this.elCtx.fillText(mounth, x, this.height - 20);
    }

    drawCursor(x, y, sellerItemElement, context){
        context.beginPath();
        switch (sellerItemElement.style){
            case "circle" :
                this.drawCursorCircle(x, y, context);
                break;
            case "square" :
                this.drawCursorSquare(x, y, context);
                break;
            case "triangle" :
                this.drawCursorTriangle(x, y, context);
                break;

        }
        context.fillStyle = sellerItemElement.color;
        context.fill();
        context.strokeStyle = "#ff3f0c";
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
    }

    drawCursorCircle(x, y, context) {
        context.arc(x,y,5,0,2*Math.PI);
    }

    drawCursorSquare(x, y, context) {
        context.fillRect(x - 5, y - 5, 10, 10);
    }

    drawCursorTriangle(x, y, context){
        context.moveTo(x+6,y+5);
        context.lineTo(x,(y)-8);
        context.lineTo(x-6,y+5);
    }

    drawLegend(Elements) {
        let positionLeft = 40;
        for(let elementName in Elements){
            this.drawCursor(positionLeft, 6, Elements[elementName], this.legendElCtx);
            this.legendElCtx.font="15px Arial";
            this.legendElCtx.textAlign="left";
            this.legendElCtx.fillStyle = "white";
            this.legendElCtx.fillText(elementName, positionLeft + 10, 10);
            positionLeft += 120;
        }
    }

    drawBackgroundGradient() {
        let gradient = this.elCtx.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, '#ff3f0c');
        gradient.addColorStop(0.25, '#d8350a');
        gradient.addColorStop(0.5, '#d8350a');
        gradient.addColorStop(0.75, '#d8350a');
        gradient.addColorStop(1, '#ff3f0c');
        this.elCtx.beginPath();
        this.drawShape(0, 0);
        this.elCtx.fillStyle = gradient;
        this.elCtx.fill();
    }

    drawShape(xoff, yoff) {
        this.elCtx.moveTo(38 + xoff, 6 * this.sectionHeight + yoff);
        this.elCtx.bezierCurveTo(54 + xoff, 140 + yoff, 85 + xoff, 26 + yoff, 188 + xoff, 69 + yoff);
        this.elCtx.bezierCurveTo(262 + xoff, 100 + yoff, 247 + xoff, 175 + yoff, 304 + xoff, 175 + yoff);
        this.elCtx.bezierCurveTo(333 + xoff, 175 + yoff, 384 + xoff, 115 + yoff, 430 + xoff, 107 + yoff);
        this.elCtx.bezierCurveTo(488 + xoff, 97 + yoff, 565 + xoff, 211 + yoff, this.width + xoff, 6 * this.sectionHeight + yoff);
    }

}

class GraphSellerItem{
    constructor(mounth, dataJson, SellerItemElement){
        this.mounth = mounth;
        this.value = dataJson["value"];
        this.type = dataJson["type"];
        this.SellerItemElement = SellerItemElement;
    }
}

class SellerItemElement{
    constructor(dataJson){
        this.color = dataJson["color"];
        this.style = dataJson["style"];
    }
}