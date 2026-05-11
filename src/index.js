import timer from "./module/timer";
import menu from "./module/menu";
import modal from "./module/modal";
import smoothScroll from "./module/smoothScroll";
import inputValidation from "./module/inputValidation";
import blur from "./module/blur";
import tabs from "./module/tabs";
import slider from "./module/slider";

timer("20 may 2026");
menu();
modal();
smoothScroll();
inputValidation();
blur();
tabs();

slider({
  sliderSelector: ".portfolio-content",
  slideSelector: ".portfolio-item",
  nextBtnSelector: "#arrow-right",
  prevBtnSelector: "#arrow-left",
  activeSlideClass: "portfolio-item-active",
  activeDotClass: "dot-active",
});
