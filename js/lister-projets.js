import "./main.js";
import { initFilter } from "./modules/filter.js";
import { initProjectsList } from "./modules/project-list.js";

function init() {
  initProjectsList();
  initFilter();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
