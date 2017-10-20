import Slider from './models/slider.model';
import Hamburger from './models/hamburger.model';
import VelosItems from './models/velosItems.model';
import GraphSellers from './models/graphSellers.model';
import {} from './animations/anime_magicbar';

if(document.readyState !== "loading"){
    run();
}
else{
    document.addEventListener("DOMContentLoaded", run);
}


function run() {
    let slider = new Slider("slider_news", "slider_news_list", "slider_buttons", 1);
    slider.init();
    let velosBestSeller = new VelosItems("bestseller", "listvelos", "bestseller_filter");
    velosBestSeller.init();
    let velosAllProducts = new VelosItems("allproducts", "listvelos", "all_models_filter", '#button_search');
    velosAllProducts.init();
    let hamburger = new Hamburger("header_hamburger", "site_page");
    hamburger.init();
    let graph = new GraphSellers("graph_sellers", "graph_sellers_legend");
    graph.init();
}