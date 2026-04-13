import "./main.js";
import { initFilter } from "./modules/filter.js";
import { initProjectsList } from "./modules/projects-list.js";

function init() {
  initProjectsList(); // injecte les cartes + déclenche 'projects-list:ready'
  initFilter(); // se branche sur 'projects-list:ready' si cartes pas encore là
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
