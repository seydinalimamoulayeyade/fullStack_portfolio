import "./main.js";
import { initFeaturedProjects } from "./modules/featured-projects.js";
import { initTypewriter } from "./modules/typewriter.js";

function init() {
  initFeaturedProjects();
  initTypewriter();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
