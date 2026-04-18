import { PROJECTS } from "./projects-data.js";

const STORAGE_KEY = "slly_projects";
const FLASH_KEY = "slly_admin_flash";

export function getStoredProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProject(project) {
  const stored = getStoredProjects();
  const allIds = [...PROJECTS, ...stored].map((p) => Number(p.id) || 0);
  const nextId = allIds.length ? Math.max(...allIds) + 1 : 7;

  const newProject = {
    ...project,
    id: project.id ?? nextId,
    createdAt: project.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const index = stored.findIndex((p) => Number(p.id) === Number(newProject.id));
  if (index >= 0) {
    stored[index] = newProject;
  } else {
    stored.push(newProject);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  return newProject;
}

function getEditId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("edit") ? Number(params.get("edit")) : null;
}

function escapeHTML(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getProjectById(id) {
  return [...PROJECTS, ...getStoredProjects()].find((p) => Number(p.id) === Number(id));
}

function fillForm(project) {
  document.getElementById("titre").value = project.title || "";
  document.getElementById("description_courte").value = project.shortDesc || "";
  document.getElementById("description").value = (project.description || []).join("\n\n");
  document.getElementById("categorie").value = project.category || "";
  document.getElementById("date").value = project.date || "";
  document.getElementById("lien_demo").value = project.demoUrl || "";
  document.getElementById("lien_github").value = project.githubUrl || "";
  const roleField = document.getElementById("role");
  if (roleField) roleField.value = project.role || "Développeur Full Stack";
}

function collectFormData(form, editId) {
  const data = new FormData(form);

  return {
    id: editId || undefined,
    title: String(data.get("titre") || "").trim(),
    shortDesc: String(data.get("description_courte") || "").trim(),
    description: String(data.get("description") || "")
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean),
    category: String(data.get("categorie") || ""),
    categoryLabel: getCategoryLabel(String(data.get("categorie") || "")),
    date: String(data.get("date") || ""),
    demoUrl: String(data.get("lien_demo") || "").trim(),
    githubUrl: String(data.get("lien_github") || "").trim(),
    role: String(data.get("role") || "Développeur Full Stack").trim(),
    image: null,
    tags: [],
    features: [],
    stack: { frontend: [], backend: [], tools: [] },
  };
}

function getCategoryLabel(category) {
  const labels = {
    web: "Application Web",
    mobile: "Application Mobile",
    desktop: "Application Desktop",
    api: "API / Back-End",
    autre: "Autre",
  };
  return labels[category] || "Autre";
}

function createOrUpdateBanner(type, title, text) {
  document.getElementById("form-feedback-banner")?.remove();

  const banner = document.createElement("div");
  banner.id = "form-feedback-banner";
  banner.className =
    type === "success"
      ? "flex items-start gap-3 bg-emerald-900 bg-opacity-40 border border-emerald-700 rounded-xl px-5 py-4 mb-6 text-sm text-emerald-300"
      : "flex items-start gap-3 bg-red-900 bg-opacity-30 border border-red-700 rounded-xl px-5 py-4 mb-6 text-sm text-red-300";

  banner.innerHTML = `
    <svg class="w-5 h-5 ${type === "success" ? "text-emerald-400" : "text-red-400"} flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${type === "success" ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"}"/>
    </svg>
    <div>
      <p class="font-medium ${type === "success" ? "text-emerald-200" : "text-red-200"}">${escapeHTML(title)}</p>
      <p class="${type === "success" ? "text-emerald-400" : "text-red-300"} text-xs mt-0.5">${escapeHTML(text)}</p>
    </div>`;

  const form = document.querySelector("form");
  form.parentNode.insertBefore(banner, form);
  banner.scrollIntoView({ behavior: "smooth", block: "center" });

  if (type === "success") {
    setTimeout(() => banner.remove(), 4000);
  }
}

function persistFlash(type, text) {
  sessionStorage.setItem(FLASH_KEY, JSON.stringify({ type, text }));
}

function restoreFlash() {
  try {
    const raw = sessionStorage.getItem(FLASH_KEY);
    if (!raw) return;
    sessionStorage.removeItem(FLASH_KEY);
    const flash = JSON.parse(raw);
    if (flash?.type === "success") {
      createOrUpdateBanner("success", "Action réussie", flash.text || "Projet enregistré.");
    }
  } catch {
    sessionStorage.removeItem(FLASH_KEY);
  }
}

function setEditingUI(isEditing) {
  const titleEl = document.querySelector("header h1");
  const separator = document.querySelector(
    ".text-slate-600.text-xs.uppercase.tracking-wider.font-semibold.flex-shrink-0",
  );
  const submitBtn = document.querySelector('button[type="submit"]');
  const cancelLink = document.querySelector('header a[href="lister-projets.html"]');

  if (titleEl) {
    titleEl.innerHTML = isEditing
      ? `Modifier un projet <span class="text-xs font-mono font-normal bg-amber-400 bg-opacity-20 text-amber-400 border border-amber-400 border-opacity-30 px-2.5 py-1 rounded-md">Mode édition</span>`
      : `Ajouter un projet <span class="text-xs font-mono font-normal bg-amber-400 bg-opacity-20 text-amber-400 border border-amber-400 border-opacity-30 px-2.5 py-1 rounded-md">Admin</span>`;
  }

  if (separator) {
    separator.textContent = isEditing ? "Modifier le projet" : "Ajouter un nouveau projet";
  }

  if (submitBtn) {
    submitBtn.innerHTML = isEditing
      ? `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>Enregistrer les modifications`
      : `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>Ajouter le projet`;
  }

  if (isEditing && cancelLink) {
    cancelLink.textContent = "Annuler la modification";
    cancelLink.href = "ajouter-projet.html";
  }
}

function setupImagePreview() {
  const input = document.getElementById("image");
  if (!input) return;

  let preview = document.getElementById("image-preview-box");
  if (!preview) {
    preview = document.createElement("div");
    preview.id = "image-preview-box";
    preview.className = "mt-3 hidden rounded-xl border border-slate-700 bg-primary p-3";
    input.closest("div")?.parentNode?.appendChild(preview);
  }

  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) {
      preview.classList.add("hidden");
      preview.innerHTML = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    preview.classList.remove("hidden");
    preview.innerHTML = `
      <p class="text-xs text-slate-400 mb-2">Aperçu : ${escapeHTML(file.name)}</p>
      <img src="${objectUrl}" alt="Aperçu de l'image sélectionnée" class="w-full max-h-52 object-cover rounded-lg border border-slate-700" />`;
  });
}

function setupUnsavedChangesWarning(form, initialSnapshotRef) {
  const handler = (event) => {
    if (JSON.stringify(collectFormData(form, getEditId())) === initialSnapshotRef.current) {
      return;
    }
    event.preventDefault();
    event.returnValue = "";
  };

  window.addEventListener("beforeunload", handler);
  return () => window.removeEventListener("beforeunload", handler);
}

export function initFormAdmin() {
  const form = document.querySelector("form");
  if (!form) return;

  restoreFlash();
  setupImagePreview();

  const editId = getEditId();
  const isEditing = Boolean(editId);
  let loadedProject = null;

  if (isEditing) {
    loadedProject = getProjectById(editId);
    if (loadedProject) fillForm(loadedProject);
  }

  setEditingUI(isEditing);

  const initialSnapshotRef = {
    current: JSON.stringify(collectFormData(form, editId)),
  };
  const removeUnloadWarning = setupUnsavedChangesWarning(form, initialSnapshotRef);

  const resetBtn = form.querySelector('button[type="reset"]');
  if (resetBtn) {
    resetBtn.addEventListener("click", (event) => {
      event.preventDefault();
      if (isEditing && loadedProject) {
        fillForm(loadedProject);
        createOrUpdateBanner("success", "Formulaire réinitialisé", "Les valeurs du projet ont été restaurées.");
      } else {
        form.reset();
      }
      initialSnapshotRef.current = JSON.stringify(collectFormData(form, editId));
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectData = collectFormData(form, editId);
    const saved = saveProject(projectData);

    removeUnloadWarning();
    persistFlash("success", isEditing ? `Le projet « ${saved.title} » a bien été mis à jour.` : `Le projet « ${saved.title} » a bien été ajouté.`);
    window.location.href = "ajouter-projet.html";
  });
}
