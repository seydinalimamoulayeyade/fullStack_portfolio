import { getVisibleProjects } from "./project-list.js";

/**
 * Échappe le HTML pour éviter les injections.
 * @param {string} str
 * @returns {string}
 */
function escapeHTML(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const CATEGORY_BADGE = {
  web: "Application Web",
  mobile: "Application Mobile",
  api: "API / Back-End",
  desktop: "Application Desktop",
  autre: "Autre",
};

/**
 * Génère une carte projet vedette.
 * @param {object} project
 * @returns {string}
 */
function buildFeaturedCard(project) {
  const categoryLabel =
    project.categoryLabel || CATEGORY_BADGE[project.category] || "Autre";

  const tagsHtml = (project.tags || [])
    .slice(0, 3)
    .map((tag) => `<span class="badge-tech">${escapeHTML(tag)}</span>`)
    .join("");

  const imageBlock = project.image
    ? `
      <img
        src="${escapeHTML(project.image)}"
        alt="${escapeHTML(project.title)}"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    `
    : `
      <div class="w-full h-full bg-surface flex items-center justify-center">
        <span class="text-3xl font-bold text-slate-500">
          ${escapeHTML((project.title || "?").charAt(0))}
        </span>
      </div>
    `;

  return `
    <article class="card-project group">
      <div class="relative overflow-hidden h-48">
        ${imageBlock}
        <div class="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-70"></div>
        <span
          class="absolute top-3 right-3 bg-accent text-white text-xs font-medium px-2.5 py-1 rounded-md"
        >
          ${escapeHTML(categoryLabel)}
        </span>
      </div>

      <div class="p-5">
        <h3 class="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
          ${escapeHTML(project.title)}
        </h3>

        <p class="text-slate-400 text-sm leading-relaxed mb-4">
          ${escapeHTML(project.shortDesc || "")}
        </p>

        <div class="flex flex-wrap gap-1.5 mb-4">
          ${tagsHtml}
        </div>

        <a
          href="detailler-projet.html?id=${encodeURIComponent(project.id)}"
          class="inline-flex items-center gap-1.5 text-accent hover:underline text-sm font-medium"
        >
          Voir le projet
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </article>
  `;
}

/**
 * Initialise les projets en vedette sur la page d'accueil.
 */
export function initFeaturedProjects() {
  const container = document.getElementById("featured-projects");
  if (!container) return;

  const projects = getVisibleProjects().slice(0, 3);

  if (!projects.length) {
    container.innerHTML = `
      <div class="col-span-full text-center py-8 text-slate-500 text-sm">
        Aucun projet en vedette pour le moment.
      </div>
    `;
    return;
  }

  container.innerHTML = projects.map(buildFeaturedCard).join("");
}
