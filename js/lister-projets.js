import "./main.js";
import { initFilter } from "./modules/filter.js";
import { injectStoredProjects } from "./modules/render-stored-projects.js";

function initPage() {
  // 1. Injecter les projets du localStorage dans la grille AVANT les filtres
  injectStoredProjects();

  // 2. Initialiser les filtres (ils voient maintenant toutes les cartes)
  initFilter();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage);
} else {
  initPage();
}
