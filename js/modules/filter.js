const ACTIVE_CLASSES = ["bg-accent", "text-white", "border-transparent"];
const INACTIVE_CLASSES = ["border", "border-slate-700", "text-slate-400"];

let isBound = false;

/**
 * Met un bouton en état actif et retire l'état actif des autres.
 *
 * @param {NodeListOf<HTMLElement>} buttons
 * @param {HTMLElement} activeBtn
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
 * Retourne true si une carte correspond à la catégorie active.
 *
 * @param {HTMLElement} card
 * @param {string} category
 * @returns {boolean}
 */
function matchesCategory(card, category) {
  return category === "all" || card.dataset.category === category;
}

/**
 * Affiche ou masque les cartes selon la catégorie sélectionnée.
 *
 * @param {NodeListOf<HTMLElement>} cards
 * @param {string} category
 * @returns {number}
 */
function filterCards(cards, category) {
  let visibleCount = 0;

  cards.forEach((card) => {
    const match = matchesCategory(card, category);

    if (match) {
      card.style.display = "";
      requestAnimationFrame(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      });
      visibleCount++;
      return;
    }

    card.style.opacity = "0";
    card.style.transform = "translateY(8px)";

    setTimeout(() => {
      if (card.style.opacity === "0") {
        card.style.display = "none";
      }
    }, 250);
  });

  return visibleCount;
}

/**
 * Met à jour le compteur global visible.
 *
 * @param {number} count
 */
function updateVisibleCount(count) {
  const countEl = document.getElementById("visible-count");
  if (countEl) countEl.textContent = count;
}

/**
 * Renumérote uniquement les cartes visibles.
 * Cherche le span de numéro dans chaque carte.
 */
function renumberVisibleCards() {
  const visibleCards = Array.from(
    document.querySelectorAll(".project-card"),
  ).filter((card) => card.style.display !== "none");

  visibleCards.forEach((card, index) => {
    const numEl = card.querySelector(".text-slate-600.text-xs.font-mono");
    if (!numEl) return;
    numEl.textContent = `#${String(index + 1).padStart(2, "0")}`;
  });
}

/**
 * Prépare l'animation sur toutes les cartes.
 *
 * @param {NodeListOf<HTMLElement>} cards
 */
function prepareCardTransitions(cards) {
  cards.forEach((card) => {
    card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });
}

/**
 * Applique le filtre actif.
 *
 * @param {HTMLElement} btn
 * @param {NodeListOf<HTMLElement>} buttons
 */
function applyFilter(btn, buttons) {
  const cards = document.querySelectorAll(".project-card");
  const category = btn.dataset.filter || "all";

  prepareCardTransitions(cards);
  setActiveButton(buttons, btn);

  const count = filterCards(cards, category);
  updateVisibleCount(count);

  setTimeout(() => {
    renumberVisibleCards();
  }, 260);
}

/**
 * Initialise l'état par défaut du filtre.
 * Si un bouton a déjà la classe active, on le respecte.
 * Sinon on active "all" si disponible.
 *
 * @param {NodeListOf<HTMLElement>} buttons
 */
function initDefaultState(buttons) {
  if (!buttons.length) return;

  const activeBtn =
    Array.from(buttons).find((btn) => btn.classList.contains("active")) ||
    Array.from(buttons).find((btn) => btn.dataset.filter === "all") ||
    buttons[0];

  applyFilter(activeBtn, buttons);
}

/**
 * Branche les événements de filtre.
 */
function bindFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    if (btn.dataset.filterBound === "true") return;

    btn.addEventListener("click", () => {
      const freshButtons = document.querySelectorAll(".filter-btn");
      applyFilter(btn, freshButtons);
    });

    btn.dataset.filterBound = "true";
  });

  initDefaultState(buttons);
}

/**
 * Initialise le système de filtres sur la page liste des projets.
 * Requiert :
 * - des boutons .filter-btn avec data-filter
 * - des cartes .project-card avec data-category
 * - un #visible-count
 */
export function initFilter() {
  if (isBound) return;
  isBound = true;

  if (document.querySelectorAll(".project-card").length > 0) {
    bindFilters();
  }

  document.addEventListener("projects-list:ready", () => {
    bindFilters();
  });
}
