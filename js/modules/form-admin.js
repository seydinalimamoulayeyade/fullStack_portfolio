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
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getProjectById(id) {
  return [...PROJECTS, ...getStoredProjects()].find(
    (p) => Number(p.id) === Number(id),
  );
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

function fillForm(project) {
  const setValue = (id, value) => {
    const field = document.getElementById(id);
    if (field) field.value = value || "";
  };

  setValue("titre", project.title);
  setValue("description_courte", project.shortDesc);
  setValue("description", (project.description || []).join("\n\n"));
  setValue("categorie", project.category);
  setValue("date", project.date);
  setValue("lien_demo", project.demoUrl);
  setValue("lien_github", project.githubUrl);
  setValue("role", project.role || "Développeur Full Stack");
}

function createOrUpdateBanner(type, title, text) {
  document.getElementById("form-feedback-banner")?.remove();

  const banner = document.createElement("div");
  banner.id = "form-feedback-banner";
  banner.className =
    type === "success"
      ? "flex items-start gap-3 bg-emerald-900 bg-opacity-40 border border-emerald-700 rounded-xl px-5 py-4 mb-6 text-sm text-emerald-300"
      : "flex items-start gap-3 bg-red-900 bg-opacity-30 border border-red-700 rounded-xl px-5 py-4 mb-6 text-sm text-red-300";

  const iconPath =
    type === "success"
      ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";

  banner.innerHTML = `
    <svg class="w-5 h-5 ${
      type === "success" ? "text-emerald-400" : "text-red-400"
    } flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"/>
    </svg>
    <div>
      <p class="font-medium ${
        type === "success" ? "text-emerald-200" : "text-red-200"
      }">${escapeHTML(title)}</p>
      <p class="${
        type === "success" ? "text-emerald-400" : "text-red-300"
      } text-xs mt-0.5">${escapeHTML(text)}</p>
    </div>`;

  const form = document.querySelector("form");
  if (!form?.parentNode) return;

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
      createOrUpdateBanner(
        "success",
        "Action réussie",
        flash.text || "Projet enregistré.",
      );
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
  const cancelLink = document.querySelector(
    'header a[href="lister-projets.html"]',
  );

  if (titleEl) {
    titleEl.innerHTML = isEditing
      ? `Modifier un projet <span class="text-xs font-mono font-normal bg-amber-400 bg-opacity-20 text-amber-400 border border-amber-400 border-opacity-30 px-2.5 py-1 rounded-md">Mode édition</span>`
      : `Ajouter un projet <span class="text-xs font-mono font-normal bg-amber-400 bg-opacity-20 text-amber-400 border border-amber-400 border-opacity-30 px-2.5 py-1 rounded-md">Admin</span>`;
  }

  if (separator) {
    separator.textContent = isEditing
      ? "Modifier le projet"
      : "Ajouter un nouveau projet";
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

function ensureImagePreviewBox(input) {
  let preview = document.getElementById("image-preview-box");
  if (preview) return preview;

  preview = document.createElement("div");
  preview.id = "image-preview-box";
  preview.className =
    "mt-3 hidden rounded-xl border border-slate-700 bg-primary p-3";

  const wrapper = input.closest("div");
  wrapper?.parentNode?.appendChild(preview);

  return preview;
}

function renderImagePreview(preview, src, label = "") {
  if (!src) {
    preview.classList.add("hidden");
    preview.innerHTML = "";
    return;
  }

  preview.classList.remove("hidden");
  preview.innerHTML = `
    <p class="text-xs text-slate-400 mb-2">${escapeHTML(label)}</p>
    <img
      src="${src}"
      alt="Aperçu de l'image du projet"
      class="w-full max-h-52 object-cover rounded-lg border border-slate-700"
    />
  `;
}

function setupImagePreview(existingImage = null) {
  const input = document.getElementById("image");
  if (!input) {
    return {
      getSelectedFile: () => null,
      resetPreview: () => {},
    };
  }

  const preview = ensureImagePreviewBox(input);

  if (existingImage) {
    renderImagePreview(preview, existingImage, "Image actuelle");
  }

  input.addEventListener("change", async () => {
    const file = input.files?.[0];

    if (!file) {
      if (existingImage) {
        renderImagePreview(preview, existingImage, "Image actuelle");
      } else {
        renderImagePreview(preview, null);
      }
      return;
    }

    if (!file.type.startsWith("image/")) {
      createOrUpdateBanner(
        "error",
        "Format invalide",
        "Veuillez sélectionner un fichier image.",
      );
      input.value = "";
      if (existingImage) {
        renderImagePreview(preview, existingImage, "Image actuelle");
      } else {
        renderImagePreview(preview, null);
      }
      return;
    }

    try {
      const dataUrl = await compressImage(file);
      renderImagePreview(preview, dataUrl, `Nouvelle image : ${file.name}`);
    } catch (error) {
      console.error(error);
      createOrUpdateBanner(
        "error",
        "Lecture impossible",
        "Impossible de générer l’aperçu de l’image.",
      );
    }
  });

  return {
    getSelectedFile: () => input.files?.[0] || null,
    resetPreview: (image = null) => {
      if (image) {
        renderImagePreview(preview, image, "Image actuelle");
      } else {
        renderImagePreview(preview, null);
      }
      input.value = "";
    },
  };
}

async function collectFormData(form, editId, loadedProject, selectedFile) {
  const data = new FormData(form);

  let image = loadedProject?.image || null;

  if (selectedFile) {
    image = await compressImage(selectedFile, {
      maxWidth: 1200,
      maxHeight: 800,
      quality: 0.7,
    });
  }

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
    image,
    tags: loadedProject?.tags || [],
    features: loadedProject?.features || [],
    stack: loadedProject?.stack || { frontend: [], backend: [], tools: [] },
  };
}

function serializeFormSnapshot(
  form,
  editId,
  loadedProject,
  hasNewImage = false,
) {
  const data = new FormData(form);

  return JSON.stringify({
    id: editId || undefined,
    titre: String(data.get("titre") || "").trim(),
    description_courte: String(data.get("description_courte") || "").trim(),
    description: String(data.get("description") || "").trim(),
    categorie: String(data.get("categorie") || ""),
    date: String(data.get("date") || ""),
    lien_demo: String(data.get("lien_demo") || "").trim(),
    lien_github: String(data.get("lien_github") || "").trim(),
    role: String(data.get("role") || "").trim(),
    currentImage: loadedProject?.image || null,
    hasNewImage,
  });
}

function setupUnsavedChangesWarning(_form, getSnapshot) {
  const handler = (event) => {
    if (getSnapshot().current === getSnapshot().initial) return;
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

  const editId = getEditId();
  const isEditing = Boolean(editId);
  let loadedProject = null;

  if (isEditing) {
    loadedProject = getProjectById(editId);
    if (loadedProject) fillForm(loadedProject);
  }

  setEditingUI(isEditing);

  const imagePreviewController = setupImagePreview(
    loadedProject?.image || null,
  );

  const snapshot = {
    initial: serializeFormSnapshot(form, editId, loadedProject, false),
    current: serializeFormSnapshot(form, editId, loadedProject, false),
  };

  const stopWarning = setupUnsavedChangesWarning(form, () => snapshot);

  const watchedFields = form.querySelectorAll("input, textarea, select");
  watchedFields.forEach((field) => {
    field.addEventListener("input", () => {
      snapshot.current = serializeFormSnapshot(
        form,
        editId,
        loadedProject,
        Boolean(imagePreviewController.getSelectedFile()),
      );
    });

    field.addEventListener("change", () => {
      snapshot.current = serializeFormSnapshot(
        form,
        editId,
        loadedProject,
        Boolean(imagePreviewController.getSelectedFile()),
      );
    });
  });

  const resetBtn = form.querySelector('button[type="reset"]');
  if (resetBtn) {
    resetBtn.addEventListener("click", (event) => {
      event.preventDefault();

      if (isEditing && loadedProject) {
        fillForm(loadedProject);
        imagePreviewController.resetPreview(loadedProject.image || null);
        createOrUpdateBanner(
          "success",
          "Formulaire réinitialisé",
          "Les valeurs du projet ont été restaurées.",
        );
      } else {
        form.reset();
        imagePreviewController.resetPreview(null);
      }

      snapshot.initial = serializeFormSnapshot(
        form,
        editId,
        loadedProject,
        false,
      );
      snapshot.current = snapshot.initial;
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtn = submitBtn?.innerHTML;

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Enregistrement...`;
      }

      const selectedFile = imagePreviewController.getSelectedFile();
      const projectData = await collectFormData(
        form,
        editId,
        loadedProject,
        selectedFile,
      );

      const saved = saveProject(projectData);

      stopWarning();
      persistFlash(
        "success",
        isEditing
          ? `Le projet « ${saved.title} » a bien été mis à jour.`
          : `Le projet « ${saved.title} » a bien été ajouté.`,
      );

      window.location.href = "ajouter-projet.html";
    } catch (error) {
      console.error(error);
      createOrUpdateBanner(
        "error",
        "Enregistrement impossible",
        error?.message || "Une erreur est survenue pendant l’enregistrement.",
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtn;
      }
    }
  });
}
