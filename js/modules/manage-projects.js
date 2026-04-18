import { deleteProject, getDeletedIds } from "./delete-project.js";
import { getStoredProjects } from "./form-admin.js";
import { PROJECTS } from "./projects-data.js";

function escapeHTML(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildRow(project, isStored) {
  const origin = isStored
    ? '<span class="text-xs bg-violet-900 bg-opacity-40 text-violet-300 border border-violet-700 px-2 py-0.5 rounded-full font-mono">Ajouté</span>'
    : '<span class="text-xs bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full font-mono">Statique</span>';

  return `
    <div class="manage-row flex items-center gap-4 px-4 py-3 bg-primary rounded-xl border border-slate-800 hover:border-slate-700 transition-colors" data-id="${project.id}">
      <span class="text-slate-600 font-mono text-xs w-6 flex-shrink-0">#${String(project.id).padStart(2, "0")}</span>

      <div class="flex-1 min-w-0 flex items-center gap-2.5">
        <p class="text-slate-200 text-sm font-medium truncate">${escapeHTML(project.title)}</p>
        ${origin}
      </div>

      <span class="text-slate-500 text-xs hidden sm:block flex-shrink-0">${escapeHTML(project.categoryLabel ?? "—")}</span>

      <div class="flex items-center gap-2 flex-shrink-0">
        <a href="ajouter-projet.html?edit=${project.id}" class="text-slate-500 hover:text-amber-400 p-1.5 rounded-lg hover:bg-slate-800" title="Modifier">
          ✏️
        </a>

        <a href="detailler-projet.html?id=${project.id}" target="_blank" class="text-slate-500 hover:text-accent p-1.5 rounded-lg hover:bg-slate-800" title="Voir">
          👁️
        </a>

        <button class="btn-delete-project text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-900 hover:bg-opacity-30" data-id="${project.id}" data-title="${escapeHTML(project.title)}" type="button">
          🗑️
        </button>
      </div>
    </div>`;
}

function renderManageSection(container) {
  const deletedIds = getDeletedIds();
  const stored = getStoredProjects();

  const mergedMap = new Map();

  PROJECTS.forEach((project) => {
    mergedMap.set(Number(project.id), { ...project, _isStored: false });
  });

  stored.forEach((project) => {
    mergedMap.set(Number(project.id), { ...project, _isStored: true });
  });

  const allProjects = Array.from(mergedMap.values());

  const visible = allProjects.filter((p) => !deletedIds.includes(p.id));

  if (visible.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 text-slate-500 text-sm">
        Aucun projet pour le moment.<br>
        <span class="text-slate-600 text-xs">Ajoutez votre premier projet 🚀</span>
      </div>`;
    return;
  }

  container.innerHTML = visible.map((p) => buildRow(p, p._isStored)).join("");

  container.querySelectorAll(".btn-delete-project").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const title = btn.dataset.title;

      if (!confirm(`Supprimer « ${title} » ?`)) return;

      deleteProject(id);
      renderManageSection(container);

      const toast = document.createElement("div");
      toast.className =
        "fixed bottom-6 right-6 bg-slate-800 text-white text-xs px-4 py-2 rounded-lg shadow";
      toast.textContent = `Projet supprimé`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    });
  });
}

export function initManageProjects() {
  const container = document.getElementById("manage-projects-list");
  if (!container) return;
  renderManageSection(container);
}
