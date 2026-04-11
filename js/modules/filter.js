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
      requestAnimationFrame(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      });
      visibleCount++;
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(8px)";
      setTimeout(() => {
        if (card.style.opacity === "0") card.style.display = "none";
      }, 250);
    }
  });

  return visibleCount;
}

export function initFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  const countEl = document.getElementById("visible-count");

  if (!buttons.length || !cards.length) return;

  cards.forEach((card) => {
    card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.filter;
      setActiveButton(buttons, btn);
      const count = filterCards(cards, category);
      if (countEl) countEl.textContent = count;
    });
  });
}
