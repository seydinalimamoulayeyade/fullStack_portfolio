export function initNav() {
  const toggle = document.getElementById("mobile-menu-toggle");
  const panel = document.getElementById("mobile-menu-panel");
  const icon = document.getElementById("mobile-menu-icon");

  // Sortie silencieuse si les éléments sont absents (page sans nav mobile)
  if (!toggle || !panel || !icon) return;

  const ICON_OPEN = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
  const ICON_CLOSE = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;

  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  function openMenu() {
    panel.classList.remove("hidden");
    toggle.setAttribute("aria-expanded", "true");
    icon.innerHTML = ICON_CLOSE;
  }

  function closeMenu() {
    panel.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
    icon.innerHTML = ICON_OPEN;
  }

  // Clic sur le bouton toggle
  toggle.addEventListener("click", () => {
    isOpen() ? closeMenu() : openMenu();
  });

  // Clic en dehors du menu → fermeture
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !panel.contains(e.target)) {
      closeMenu();
    }
  });

  // Touche Échap → fermeture
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}
