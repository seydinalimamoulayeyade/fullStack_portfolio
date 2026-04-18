import { getDeletedIds } from "./delete-project.js";
import { getStoredProjects } from "./form-admin.js";
import { PROJECTS } from "./projects-data.js";

/** Couleurs des badges par catégorie */
const CATEGORY_BADGE = {
  web: {
    bg: "bg-blue-600",
    label: "Application Web",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  mobile: {
    bg: "bg-purple-600",
    label: "Application Mobile",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  api: {
    bg: "bg-emerald-700",
    label: "API / Back-End",
    icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  desktop: {
    bg: "bg-amber-600",
    label: "Application Desktop",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  autre: {
    bg: "bg-slate-600",
    label: "Autre",
    icon: "M4 6h16M4 12h16M4 18h16",
  },
};

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

/**
 * Génère le HTML d'une carte projet.
 * @param {object} project
 * @param {number} index - position dans la liste filtrée
 * @returns {string}
 */
function buildCard(project, index) {
  const cat = CATEGORY_BADGE[project.category] ?? CATEGORY_BADGE.autre;
  const num = String(index + 1).padStart(2, "0");

  let dateLabel = project.date ?? "";
  if (/^\d{4}-\d{2}$/.test(dateLabel)) {
    const [y, m] = dateLabel.split("-");
    const months = [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Jun",
      "Jul",
      "Aoû",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ];
    dateLabel = `${months[parseInt(m, 10) - 1]} ${y}`;
  }

  const imageBlock = project.image
    ? `<img
         src="${escapeHTML(project.image)}"
         alt="Capture du projet ${escapeHTML(project.title)}"
         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
       />`
    : `<div class="w-full h-full bg-surface flex items-center justify-center">
         <svg class="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${cat.icon}"/>
         </svg>
       </div>`;

  const tagsHtml = (project.tags ?? [])
    .slice(0, 4)
    .map((tag) => `<span class="badge-tech">${escapeHTML(tag)}</span>`)
    .join("");

  return `
    <article
      class="card-project group project-card"
      data-category="${escapeHTML(project.category ?? "autre")}"
      data-id="${escapeHTML(project.id)}"
    >
      <div class="relative overflow-hidden h-48">
        ${imageBlock}
        <div class="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80"></div>
        <span class="absolute top-3 left-3 inline-flex items-center gap-1 ${cat.bg} bg-opacity-90 text-white text-xs font-medium px-2.5 py-1 rounded-md">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${cat.icon}"/>
          </svg>
          ${escapeHTML(cat.label)}
        </span>
        <span class="absolute top-3 right-3 bg-primary bg-opacity-80 text-slate-300 text-xs px-2 py-1 rounded-md font-mono">
          ${escapeHTML(dateLabel)}
        </span>
      </div>

      <div class="p-5 flex flex-col gap-3">
        <div>
          <h2 class="text-white font-semibold text-base group-hover:text-accent transition-colors leading-snug">
            ${escapeHTML(project.title)}
          </h2>
          <p class="text-slate-400 text-xs mt-1.5 leading-relaxed">
            ${escapeHTML(project.shortDesc ?? "")}
          </p>
        </div>

        <div class="flex flex-wrap gap-1.5">${tagsHtml}</div>

        <div class="pt-1 border-t border-slate-700 flex items-center justify-between">
          <a href="detailler-projet.html?id=${encodeURIComponent(project.id)}"
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
 * Retourne la liste fusionnée des projets visibles :
 * (statiques + ajoutés) - supprimés
 * @returns {object[]}
 */
export function getVisibleProjects() {
  const deletedIds = getDeletedIds();
  const stored = getStoredProjects();

  const mergedMap = new Map();

  PROJECTS.forEach((project) => {
    mergedMap.set(Number(project.id), project);
  });

  stored.forEach((project) => {
    mergedMap.set(Number(project.id), project);
  });

  return Array.from(mergedMap.values()).filter(
    (project) => !deletedIds.includes(Number(project.id)),
  );
}

/**
 * Met à jour le compteur affiché dans le header.
 * @param {number} count
 */
function updateCounter(count) {
  const el = document.getElementById("visible-count");
  if (el) el.textContent = count;
}

/**
 * Met à jour les compteurs des filtres par catégorie.
 * IDs attendus :
 * - count-all
 * - count-web
 * - count-mobile
 * - count-api
 * - count-desktop
 * - count-autre
 */
function updateCategoryCounts(projects) {
  const counts = {
    all: projects.length,
    web: 0,
    mobile: 0,
    api: 0,
    desktop: 0,
    autre: 0,
  };

  projects.forEach((project) => {
    const key =
      project.category && counts[project.category] !== undefined
        ? project.category
        : "autre";
    counts[key] += 1;
  });

  Object.entries(counts).forEach(([key, value]) => {
    const el = document.getElementById(`count-${key}`);
    if (el) el.textContent = value;
  });
}

/**
 * Initialise la liste dynamique des projets sur lister-projets.html.
 * - Injecte les cartes dans #projects-grid
 * - Met à jour les compteurs
 * - Déclenche projects-list:ready pour laisser filter.js gérer l'UI du filtre
 */
export function initProjectsList() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const projects = getVisibleProjects();

  updateCategoryCounts(projects);

  if (projects.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-16 text-slate-500">
        <p class="text-sm">Aucun projet à afficher.</p>
        <a href="ajouter-projet.html" class="text-accent hover:underline text-sm mt-2 inline-block">
          Ajouter un projet →
        </a>
      </div>`;
    updateCounter(0);
    return;
  }

  grid.innerHTML = projects
    .map((project, index) => buildCard(project, index))
    .join("");

  updateCounter(projects.length);

  document.dispatchEvent(new CustomEvent("projects-list:ready"));
}
