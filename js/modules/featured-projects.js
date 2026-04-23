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
 * Réactive les animations au scroll pour les éléments injectés dynamiquement.
 */
function animateInjectedCards() {
  const elements = document.querySelectorAll(
    "#featured-projects [data-animate]:not(.is-visible)",
  );
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15 },
  );

  elements.forEach((el) => observer.observe(el));
}

/**
 * Génère une carte projet vedette.
 * @param {object} project
 * @param {number} index
 * @returns {string}
 */
function buildFeaturedCard(project, index = 0) {
  const categoryLabel =
    project.categoryLabel || CATEGORY_BADGE[project.category] || "Autre";

  const techList = Array.isArray(project.tags)
    ? project.tags
    : Array.isArray(project.technologies)
      ? project.technologies
      : [];

  const tagsHtml = techList
    .slice(0, 3)
    .map((tag) => `<span class="badge-tech">${escapeHTML(tag)}</span>`)
    .join("");

  const shortText = project.shortDesc || project.shortDescription || "";

  const imageBlock = project.image
    ? `
      <img
        src="${escapeHTML(project.image)}"
        alt="${escapeHTML(project.title)}"
        class="featured-card-image"
        loading="lazy"
      />
    `
    : `
      <div class="featured-card-image bg-surface flex items-center justify-center">
        <span class="text-4xl font-bold text-slate-500">
          ${escapeHTML((project.title || "?").charAt(0))}
        </span>
      </div>
    `;

  return `
    <article
      class="featured-card"
      data-animate
      style="transition-delay: ${index * 120}ms"
    >
      <div class="relative overflow-hidden h-52">
        ${imageBlock}
        <div class="featured-card-overlay"></div>

        <span class="featured-card-badge absolute top-3 left-3">
          ${escapeHTML(categoryLabel)}
        </span>
      </div>

      <div class="featured-card-content">
        <h3 class="featured-card-title">
          ${escapeHTML(project.title)}
        </h3>

        <p class="featured-card-text">
          ${escapeHTML(shortText)}
        </p>

        <div class="flex flex-wrap gap-2 mb-4">
          ${tagsHtml}
        </div>

        <div class="featured-card-footer">
          <a
            href="detailler-projet.html?id=${encodeURIComponent(project.id)}"
            class="featured-card-link"
          >
            Voir le projet
            <svg
              class="w-4 h-4"
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

          <span class="text-xs text-slate-500 font-mono">
            #${escapeHTML(String(project.id))}
          </span>
        </div>
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

  container.innerHTML = projects
    .map((project, index) => buildFeaturedCard(project, index))
    .join("");

  animateInjectedCards();
}
