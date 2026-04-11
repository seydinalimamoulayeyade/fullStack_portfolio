/**
 * @file main.js
 * @description Point d'entrée commun à toutes les pages du portfolio.
 *              Importe et initialise les modules partagés :
 *              - Navigation mobile (toutes les pages)
 *              - Animations au scroll (toutes les pages)
 *
 *              Ce fichier n'est jamais chargé directement par le HTML.
 *              Il est importé par chaque fichier de page (index.js,
 *              lister-projets.js, etc.) qui l'appellent en premier.
 *
 * @version 2.1.0
 */

import { initScrollAnimations } from "./modules/animate.js";
import { initNav } from "./modules/nav.js";

/**
 * Initialise les fonctionnalités communes à toutes les pages.
 * Appelé automatiquement au chargement du DOM.
 */
function initCommon() {
  initNav();
  initScrollAnimations();
}

// Démarrage dès que le DOM est prêt
// DOMContentLoaded est préféré à window.load car il n'attend pas
// les images et ressources externes — le JS peut s'exécuter plus tôt.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCommon);
} else {
  // Le DOM est déjà prêt (script chargé en différé)
  initCommon();
}
