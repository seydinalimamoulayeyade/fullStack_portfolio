/**
 * @file detailler-projet.js
 * @description Point d'entrée JS de la page détail projet (detailler-projet.html).
 *              Charge le socle commun via main.js, puis initialise
 *              le rendu dynamique selon le paramètre ?id= de l'URL.
 *
 * Modules actifs sur cette page :
 *   ✓ initNav()              — via main.js (menu mobile)
 *   ✓ initScrollAnimations() — via main.js (animations au scroll)
 *   ✓ initProjectDetail()    — rendu dynamique selon ?id=
 *
 * @version 2.1.0
 */

import "../style.css";
import "./main.js";
import { initProjectDetail } from "./modules/project-detail.js";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectDetail);
} else {
  initProjectDetail();
}
