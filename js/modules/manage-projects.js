import { deleteProject, getDeletedIds } from "./delete-project.js";
import { getStoredProjects } from "./form-admin.js";

/**
 * Construit le HTML d'une ligne de projet dans le tableau admin.
 * @param {object} project
 * @param {boolean} isStored - true si ajouté via le formulaire (suppression totale)
 * @returns {string}
 */
function buildRow(project, isStored) {
  const origin = isStored
    ? '<span class="text-xs bg-violet-900 bg-opacity-40 text-violet-300 border border-violet-700 px-2 py-0.5 rounded-full font-mono">Ajouté</span>'
    : '<span class="text-xs bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full font-mono">Statique</span>';

  return `
    <div
      class="manage-row flex items-center gap-4 px-4 py-3 bg-primary rounded-xl border border-slate-800 hover:border-slate-700 transition-colors"
      data-id="${project.id}"
    >
      <!-- Numéro -->
      <span class="text-slate-600 font-mono text-xs w-6 flex-shrink-0">#${String(project.id).padStart(2, "0")}</span>

      <!-- Titre + badge -->
      <div class="flex-1 min-w-0 flex items-center gap-2.5">
        <p class="text-slate-200 text-sm font-medium truncate">${project.title}</p>
        ${origin}
      </div>

      <!-- Catégorie -->
      <span class="text-slate-500 text-xs hidden sm:block flex-shrink-0">${project.categoryLabel ?? "—"}</span>

      <!-- Actions -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <a
          href="detailler-projet.html?id=${project.id}"
          target="_blank"
          class="text-slate-500 hover:text-accent transition-colors p-1.5 rounded-lg hover:bg-slate-800"
          title="Voir le détail"
          aria-label="Voir le projet ${project.title}"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>

        <button
          class="btn-delete-project text-slate-500 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-900 hover:bg-opacity-30"
          data-id="${project.id}"
          data-title="${project.title.replace(/"/g, "&quot;")}"
          title="Supprimer ce projet"
          aria-label="Supprimer le projet ${project.title}"
          type="button"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>`;
}

/**
 * Affiche un message de confirmation inline avant suppression.
 * @param {HTMLButtonElement} btn
 * @param {string}            title
 * @param {Function}          onConfirm
 */
function showInlineConfirm(btn, title, onConfirm) {
  // Remplacer le bouton par un mini-dialogue inline
  const row = btn.closest(".manage-row");
  if (!row) return;

  const confirm = document.createElement("div");
  confirm.className = "flex items-center gap-2 flex-shrink-0";
  confirm.innerHTML = `
    <span class="text-xs text-red-400">Confirmer ?</span>
    <button type="button" class="btn-confirm-delete text-xs bg-red-900 bg-opacity-60 hover:bg-opacity-80 text-red-300 border border-red-700 px-2.5 py-1 rounded-lg transition-colors">
      Supprimer
    </button>
    <button type="button" class="btn-cancel-delete text-xs text-slate-500 hover:text-slate-300 px-2 py-1 transition-colors">
      Annuler
    </button>`;

  // Masquer le groupe d'actions actuel
  btn.parentElement.style.display = "none";
  row.appendChild(confirm);

  confirm.querySelector(".btn-confirm-delete").addEventListener("click", () => {
    onConfirm();
  });

  confirm.querySelector(".btn-cancel-delete").addEventListener("click", () => {
    confirm.remove();
    btn.parentElement.style.display = "";
  });
}

/**
 * Anime et retire la ligne supprimée du DOM.
 * @param {HTMLElement} row
 */
function animateRemoveRow(row) {
  row.style.transition =
    "opacity 0.25s ease, transform 0.25s ease, max-height 0.3s ease, margin 0.3s ease, padding 0.3s ease";
  row.style.opacity = "0";
  row.style.transform = "translateX(8px)";
  setTimeout(() => {
    row.style.maxHeight = "0";
    row.style.margin = "0";
    row.style.padding = "0";
    row.style.overflow = "hidden";
    setTimeout(() => row.remove(), 300);
  }, 200);
}

/**
 * Recharge l'affichage de la section de gestion.
 * Appelé après chaque suppression.
 * @param {HTMLElement} container
 */
function refreshManageSection(container) {
  renderManageSection(container);
}

/**
 * Construit et injecte le contenu de la section de gestion.
 * @param {HTMLElement} container
 */
function renderManageSection(container) {
  const deletedIds = getDeletedIds();
  const stored = getStoredProjects();

  const allProjects = [
    ...PROJECTS.map((p) => ({ ...p, _isStored: false })),
    ...stored.map((p) => ({ ...p, _isStored: true })),
  ];

  const visible = allProjects.filter((p) => !deletedIds.includes(p.id));
  const deleted = allProjects.filter((p) => deletedIds.includes(p.id));

  if (visible.length === 0 && deleted.length === 0) {
    container.innerHTML = `
      <p class="text-slate-500 text-sm text-center py-6">
        Aucun projet disponible.
      </p>`;
    return;
  }

  let html = "";

  // Projets visibles
  if (visible.length > 0) {
    html += visible.map((p) => buildRow(p, p._isStored)).join("");
  }

  // Projets supprimés (zone repliée)
  if (deleted.length > 0) {
    html += `
      <div class="mt-4 pt-4 border-t border-slate-800">
        <p class="text-xs text-slate-600 uppercase tracking-wider font-semibold mb-3">
          Projets masqués (${deleted.length})
        </p>
        ${deleted
          .map(
            (p) => `
          <div class="flex items-center justify-between px-4 py-2.5 bg-primary rounded-xl border border-slate-800 opacity-50 mb-2">
            <span class="text-slate-500 text-sm line-through truncate">${p.title}</span>
            <button
              type="button"
              class="btn-restore-project text-xs text-slate-500 hover:text-emerald-400 transition-colors px-2.5 py-1 rounded-lg hover:bg-emerald-900 hover:bg-opacity-20"
              data-id="${p.id}"
              aria-label="Restaurer ${p.title}"
            >
              Restaurer
            </button>
          </div>`,
          )
          .join("")}
      </div>`;
  }

  container.innerHTML = html;

  // Brancher les boutons supprimer
  container.querySelectorAll(".btn-delete-project").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const title = btn.dataset.title;

      showInlineConfirm(btn, title, () => {
        deleteProject(id);
        const row = btn.closest(".manage-row");
        if (row) {
          animateRemoveRow(row);
          setTimeout(() => refreshManageSection(container), 550);
        }
        showDeleteFeedback(title);
      });
    });
  });

  // Brancher les boutons restaurer
  container.querySelectorAll(".btn-restore-project").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const deletedIds = getDeletedIds().filter((d) => d !== id);
      localStorage.setItem("slly_deleted_ids", JSON.stringify(deletedIds));
      refreshManageSection(container);
    });
  });
}

/**
 * Affiche un feedback discret de suppression réussie.
 * @param {string} title
 */
function showDeleteFeedback(title) {
  const existing = document.getElementById("delete-feedback");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "delete-feedback";
  toast.className =
    "fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium px-4 py-3 rounded-xl shadow-lg";
  toast.innerHTML = `
    <svg class="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
    </svg>
    « ${title} » supprimé`;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "opacity 0.3s ease";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

/**
 * Initialise la section de gestion des projets dans ajouter-projet.html.
 * Cible le conteneur #manage-projects-list.
 */
export function initManageProjects() {
  const container = document.getElementById("manage-projects-list");
  if (!container) return;
  renderManageSection(container);
}
