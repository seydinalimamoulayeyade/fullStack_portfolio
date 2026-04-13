const ACTIVE_CLASSES = ["bg-accent", "text-white", "border-transparent"];
const INACTIVE_CLASSES = ["border", "border-slate-700", "text-slate-400"];

/**
 * Met un bouton en état actif et retire l'état actif des autres.
 *
 * @param {NodeList} buttons - Tous les boutons de filtre
 * @param {HTMLElement} activeBtn - Le bouton à activer
 */
function setActiveButton(buttons, activeBtn) {
  buttons.forEach((btn) => {
    btn.classList.remove(...ACTIVE_CLASSES, "active");
    btn.classList.add(...INACTIVE_CLASSES);
  });
  activeBtn.classList.remove(...INACTIVE_CLASSES);
  activeBtn.classList.add(...ACTIVE_CLASSES, "active");
}

/**
 * Affiche ou masque les cartes selon la catégorie sélectionnée.
 *
 * @param {NodeList} cards    - Toutes les cartes de projet
 * @param {string}   category - Valeur du filtre ('all' ou une catégorie)
 * @returns {number}          - Nombre de cartes visibles après filtrage
 */
function filterCards(cards, category) {
  let visibleCount = 0;

  cards.forEach((card) => {
    const match = category === "all" || card.dataset.category === category;

    if (match) {
      card.style.display = "";
      // requestAnimationFrame garantit que le display='' est appliqué
      // avant de déclencher la transition CSS
      requestAnimationFrame(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      });
      visibleCount++;
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(8px)";
      // Retirer du flux seulement après la fin de la transition
      setTimeout(() => {
        if (card.style.opacity === "0") card.style.display = "none";
      }, 250);
    }
  });

  return visibleCount;
}

/**
 * Initialise le système de filtres sur la page liste des projets.
 * Requiert dans le HTML :
 *   - des <button data-filter="[valeur]" class="filter-btn">
 *   - des <article class="project-card" data-category="[valeur]">
 *   - un <span id="visible-count"> pour afficher le nombre de résultats
 *
 * S'exécute immédiatement si des cartes existent déjà dans le DOM,
 * ou attend l'événement 'projects-list:ready' si la liste est dynamique.
 */
export function initFilter() {
  function bind() {
    const buttons = document.querySelectorAll(".filter-btn");
    const countEl = document.getElementById("visible-count");

    if (!buttons.length) return;

    buttons.forEach((btn) => {
      // Supprimer l'ancien listener éventuel avant d'en ajouter un nouveau
      btn.replaceWith(btn.cloneNode(true));
    });

    // Récupérer les nouveaux boutons après le cloneNode
    const freshButtons = document.querySelectorAll(".filter-btn");

    freshButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cards = document.querySelectorAll(".project-card");
        const category = btn.dataset.filter;

        // Préparer les transitions sur les cartes actuelles
        cards.forEach((card) => {
          card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
        });

        setActiveButton(freshButtons, btn);
        const count = filterCards(cards, category);
        if (countEl) countEl.textContent = count;
      });
    });

    // Préparer les transitions sur les cartes au chargement initial
    document.querySelectorAll(".project-card").forEach((card) => {
      card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
  }

  // Si les cartes sont déjà dans le DOM (HTML statique) → brancher immédiatement
  if (document.querySelectorAll(".project-card").length > 0) {
    bind();
    return;
  }

  // Sinon attendre que projects-list:ready signale l'injection dynamique
  document.addEventListener("projects-list:ready", bind, { once: true });
}
