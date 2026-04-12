import "./main.js";
import { initTypewriter } from "./modules/typewriter.js";

// Initialisation du typewriter après le chargement du DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTypewriter);
} else {
  initTypewriter();
}
