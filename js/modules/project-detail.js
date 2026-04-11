/**
 * @module project-detail
 * @description Lit le paramètre ?id= dans l'URL, récupère le projet
 *              correspondant dans PROJECTS et injecte ses données dans
 *              tous les éléments [data-project-*] du DOM.
 *
 *              Si l'id est absent ou invalide, affiche le projet 1.
 *              Si l'id ne correspond à aucun projet, redirige vers
 *              lister-projets.html.
 *
 * @version 2.1.0
 */

import { PROJECTS, getProjectById, getIdFromUrl } from './projects-data.js';

/** Catégories → couleur Tailwind du badge */
const CATEGORY_COLORS = {
  web:    'bg-blue-600',
  mobile: 'bg-purple-600',
  api:    'bg-emerald-700',
};

/** Statut → classes de couleur */
const STATUS_COLORS = {
  'Terminé':  'bg-emerald-400',
  'En cours': 'bg-amber-400',
  'En pause': 'bg-slate-500',
};

/**
 * Génère le HTML d'un badge de technologie.
 * @param {string} tech
 * @returns {string}
 */
function techBadge(tech) {
  return `<span class="badge-tech">${tech}</span>`;
}

/**
 * Génère le HTML d'un item de fonctionnalité.
 * @param {string} feat
 * @returns {string}
 */
function featureItem(feat) {
  return `
    <div class="feature-item">
      <svg class="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4"/>
      </svg>
      ${feat}
    </div>`;
}

/**
 * Génère le HTML d'un item "Ce que j'ai appris".
 * @param {string} item
 * @returns {string}
 */
function learnedItem(item) {
  return `
    <li class="flex items-start gap-2">
      <span class="text-accent mt-1">→</span>
      ${item}
    </li>`;
}

/**
 * Injecte les métadonnées de la page (title, og:title, og:image).
 * @param {object} project
 */
function updatePageMeta(project) {
  document.title = `${project.title} — Seydina Limamou Laye Yade`;

  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const ogDesc  = document.querySelector('meta[property="og:description"]');

  if (ogTitle) ogTitle.setAttribute('content', `${project.title} — Portfolio SLLY`);
  if (ogDesc)  ogDesc.setAttribute('content', project.shortDesc);
  if (ogImage) {
    const base = 'https://seydinalimamoulayeyade.github.io/fullStack_portfolio/';
    ogImage.setAttribute('content', base + project.ogImage);
  }
}

/**
 * Injecte toutes les données du projet dans le DOM.
 * @param {object} project
 */
function renderProject(project) {
  // ── Breadcrumb ────────────────────────────────────
  const breadcrumbTitle = document.getElementById('breadcrumb-title');
  if (breadcrumbTitle) breadcrumbTitle.textContent = project.title;

  // ── Image principale ──────────────────────────────
  const heroImg = document.getElementById('project-image');
  if (heroImg) {
    if (project.image) {
      heroImg.src = project.image;
      heroImg.alt = `Aperçu du projet ${project.title}`;
    } else {
      // Pas d'image — afficher un placeholder avec l'initiale
      heroImg.closest('.relative')?.classList.add('hidden');
      const placeholder = document.getElementById('project-image-placeholder');
      if (placeholder) placeholder.classList.remove('hidden');
    }
  }

  // ── Badge catégorie ───────────────────────────────
  const categoryBadge = document.getElementById('project-category-badge');
  if (categoryBadge) {
    const colorClass = CATEGORY_COLORS[project.category] ?? 'bg-slate-600';
    categoryBadge.className = categoryBadge.className.replace(/bg-\S+/, colorClass);
    categoryBadge.querySelector('span') 
      ? (categoryBadge.querySelector('span').textContent = project.categoryLabel)
      : (categoryBadge.textContent = project.categoryLabel);
  }

  // ── Numéro de projet ──────────────────────────────
  const projectNum = document.getElementById('project-number');
  if (projectNum) {
    projectNum.textContent = `#${String(project.id).padStart(2, '0')}`;
  }

  // ── Titre & numéro section ────────────────────────
  const titleEl     = document.getElementById('project-title');
  const sectionNum  = document.getElementById('project-section-number');
  const shortDescEl = document.getElementById('project-short-desc');

  if (titleEl)     titleEl.textContent    = project.title;
  if (sectionNum)  sectionNum.textContent = `${String(project.id).padStart(2, '0')} /`;
  if (shortDescEl) shortDescEl.textContent = project.shortDesc;

  // ── Informations sidebar ──────────────────────────
  const infoDate     = document.getElementById('info-date');
  const infoCategory = document.getElementById('info-category');
  const infoStatus   = document.getElementById('info-status');
  const infoStatusDot = document.getElementById('info-status-dot');
  const infoRole     = document.getElementById('info-role');
  const infoDuration = document.getElementById('info-duration');

  if (infoDate)     infoDate.textContent     = project.date;
  if (infoCategory) infoCategory.textContent = project.categoryLabel;
  if (infoStatus)   infoStatus.textContent   = project.status;
  if (infoRole)     infoRole.textContent     = project.role;
  if (infoDuration) infoDuration.textContent = project.duration;

  if (infoStatusDot) {
    const dotColor = STATUS_COLORS[project.status] ?? 'bg-slate-500';
    infoStatusDot.className = `inline-block w-2 h-2 rounded-full ${dotColor} flex-shrink-0`;
  }

  // ── Bouton démo ───────────────────────────────────
  const demoBtn = document.getElementById('btn-demo');
  if (demoBtn) demoBtn.href = project.demoUrl;

  // ── Bouton GitHub ─────────────────────────────────
  const githubBtn = document.getElementById('btn-github');
  if (githubBtn) githubBtn.href = project.githubUrl;

  // ── Description détaillée ─────────────────────────
  const descEl = document.getElementById('project-description');
  if (descEl && project.description.length) {
    descEl.innerHTML = project.description
      .map((para) => `<p>${para}</p>`)
      .join('');
  }

  // ── Fonctionnalités ───────────────────────────────
  const featEl = document.getElementById('project-features');
  if (featEl && project.features.length) {
    featEl.innerHTML = project.features.map(featureItem).join('');
  }

  // ── Stack technique ───────────────────────────────
  const stackFrontend = document.getElementById('stack-frontend');
  const stackBackend  = document.getElementById('stack-backend');
  const stackTools    = document.getElementById('stack-tools');

  if (stackFrontend) {
    stackFrontend.innerHTML = project.stack.frontend.length
      ? project.stack.frontend.map(techBadge).join('')
      : '<span class="text-slate-500 text-xs">Non applicable</span>';
  }
  if (stackBackend) {
    stackBackend.innerHTML = project.stack.backend.map(techBadge).join('');
  }
  if (stackTools) {
    stackTools.innerHTML = project.stack.tools.map(techBadge).join('');
  }

  // ── Ce que j'ai appris ────────────────────────────
  const learnedEl = document.getElementById('project-learned');
  if (learnedEl && project.learned.length) {
    learnedEl.innerHTML = project.learned.map(learnedItem).join('');
  }

  // ── Projets similaires ────────────────────────────
  renderRelatedProjects(project);
}

/**
 * Injecte les 3 projets similaires (même catégorie en priorité, exclus le projet courant).
 * @param {object} current
 */
function renderRelatedProjects(current) {
  const container = document.getElementById('related-projects');
  if (!container) return;

  // Projets de même catégorie d'abord, puis les autres — en excluant le courant
  const same  = PROJECTS.filter((p) => p.id !== current.id && p.category === current.category);
  const other = PROJECTS.filter((p) => p.id !== current.id && p.category !== current.category);
  const related = [...same, ...other].slice(0, 3);

  container.innerHTML = related.map((p) => `
    <a href="detailler-projet.html?id=${p.id}"
       class="group bg-surface bg-opacity-30 border border-slate-700 hover:border-accent rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 flex gap-4 items-start">
      <div class="w-12 h-12 rounded-lg bg-primary border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
        <svg class="w-5 h-5 text-slate-500 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-white text-sm font-semibold group-hover:text-accent transition-colors leading-snug">${p.title}</h3>
        <p class="text-slate-500 text-xs mt-1 leading-relaxed line-clamp-2">${p.shortDesc}</p>
        <div class="flex gap-1.5 mt-2 flex-wrap">
          ${p.tags.slice(0, 2).map((t) => `<span class="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">${t}</span>`).join('')}
        </div>
      </div>
    </a>`).join('');
}

/**
 * Point d'entrée — initialise la page détail.
 * Redirige vers la liste si le projet n'existe pas.
 */
export function initProjectDetail() {
  const id      = getIdFromUrl();
  const project = getProjectById(id);

  if (!project) {
    window.location.href = 'lister-projets.html';
    return;
  }

  updatePageMeta(project);
  renderProject(project);
}
