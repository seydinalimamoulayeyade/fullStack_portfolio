import { getStoredProjects } from "./form-admin.js";

// ─── Couleurs des badges par catégorie ────────────────────────────────────
const CATEGORY_COLORS = {
  web: "bg-blue-600",
  mobile: "bg-purple-600",
  api: "bg-emerald-700",
  desktop: "bg-slate-600",
  autre: "bg-slate-600",
};

// ─── Icônes SVG par catégorie ─────────────────────────────────────────────
const CATEGORY_ICONS = {
  web: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
         d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>`,
  mobile: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>`,
  api: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
         d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>`,
  desktop: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>`,
  autre: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"/>`,
};

/**
 * @param {string} isoDate
 * @returns {string}
 */
function formatDate(isoDate) {
  if (!isoDate) return "—";
  try {
    return new Date(isoDate).toLocaleDateString("fr-FR", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}

/**
 * Génère le HTML d'une carte projet à partir d'un objet projet.
 * @param {object} project
 * @param {number} index - index global pour le numéro affiché (#07, #08…)
 * @returns {string} HTML de l'article
 */
function buildCardHTML(project, index) {
  const badgeColor = CATEGORY_COLORS[project.category] ?? "bg-slate-600";
  const badgeIcon = CATEGORY_ICONS[project.category] ?? CATEGORY_ICONS.autre;
  const num = String(index).padStart(2, "0");
  const date = formatDate(project.createdAt);

  // Tags — on prend les 4 premiers
  const tags = (project.tags ?? []).slice(0, 4);
  const techBadges = tags
    .map((t) => `<span class="badge-tech">${t}</span>`)
    .join("");

  // Bloc image ou placeholder
  const imageBlock = project.image
    ? `<img src="${project.image}" alt="${project.title}"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>`
    : `<div class="w-full h-full bg-surface flex items-center justify-center">
         <svg class="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           ${badgeIcon}
         </svg>
       </div>`;

  return `
    <article class="card-project group project-card" data-category="${project.category ?? "autre"}">
      <div class="relative overflow-hidden h-48">
        ${imageBlock}
        <div class="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80"></div>

        <span class="absolute top-3 left-3 inline-flex items-center gap-1 ${badgeColor} bg-opacity-90 text-white text-xs font-medium px-2.5 py-1 rounded-md">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">${badgeIcon}</svg>
          ${project.categoryLabel ?? "Projet"}
        </span>

        <span class="absolute top-3 right-3 bg-primary bg-opacity-80 text-slate-300 text-xs px-2 py-1 rounded-md font-mono">
          ${date}
        </span>
      </div>

      <div class="p-5 flex flex-col gap-3">
        <div>
          <h2 class="text-white font-semibold text-base group-hover:text-accent transition-colors leading-snug">
            ${project.title}
          </h2>
          <p class="text-slate-400 text-xs mt-1.5 leading-relaxed">
            ${project.shortDesc ?? ""}
          </p>
        </div>

        <div class="flex flex-wrap gap-1.5">${techBadges}</div>

        <div class="pt-1 border-t border-slate-700 flex items-center justify-between">
          <a href="detailler-projet.html?id=${project.id}"
             class="inline-flex items-center gap-1.5 text-accent hover:underline text-sm font-medium">
            Voir le détail
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <span class="text-slate-600 text-xs font-mono">#${num}</span>
        </div>
      </div>
    </article>`;
}

/**
 * Injecte les projets du localStorage dans la grille et met à jour le compteur.
 * Doit être appelé AVANT initFilter() pour que les filtres voient les nouvelles cartes.
 */
export function injectStoredProjects() {
  const stored = getStoredProjects();
  if (!stored.length) return;

  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  // Nombre de cartes statiques déjà présentes
  const staticCount = grid.querySelectorAll(".project-card").length;

  // Générer et injecter chaque carte
  stored.forEach((project, i) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = buildCardHTML(project, staticCount + i + 1).trim();
    grid.appendChild(wrapper.firstElementChild);
  });

  // Mettre à jour le compteur visible
  const countEl = document.getElementById("visible-count");
  if (countEl) {
    countEl.textContent = String(staticCount + stored.length);
  }
}
