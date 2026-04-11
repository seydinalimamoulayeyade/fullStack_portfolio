import { PROJECTS } from "./projects-data.js";

/** Clé de stockage localStorage */
const STORAGE_KEY = "slly_projects";

/**
 * Récupère les projets ajoutés via le formulaire (localStorage).
 * @returns {object[]}
 */
export function getStoredProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Sauvegarde un nouveau projet dans localStorage.
 * L'id est calculé à partir du maximum existant (statique + stocké) + 1.
 * @param {object} project
 * @returns {object} le projet sauvegardé avec son id
 */
function saveProject(project) {
  const stored = getStoredProjects();
  const allIds = [...PROJECTS, ...stored].map((p) => p.id);
  const nextId = allIds.length ? Math.max(...allIds) + 1 : 7;

  const newProject = {
    ...project,
    id: nextId,
    createdAt: new Date().toISOString(),
  };
  stored.push(newProject);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  return newProject;
}

/** ─── Validation ──────────────────────────────────────────────────── */

/**
 * Affiche un message d'erreur sous un champ.
 * @param {HTMLElement} field
 * @param {string}      message
 */
function showError(field, message) {
  clearError(field);
  field.classList.add(
    "border-red-500",
    "focus:border-red-500",
    "focus:ring-red-500",
  );
  field.classList.remove("border-slate-700");

  const err = document.createElement("p");
  err.className =
    "field-error text-xs text-red-400 mt-1.5 flex items-center gap-1";
  err.innerHTML = `<svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>${message}`;
  field.parentNode.insertBefore(err, field.nextSibling);
}

/**
 * Efface l'erreur d'un champ.
 * @param {HTMLElement} field
 */
function clearError(field) {
  field.classList.remove(
    "border-red-500",
    "focus:border-red-500",
    "focus:ring-red-500",
  );
  field.classList.add("border-slate-700");
  const existing = field.parentNode.querySelector(".field-error");
  if (existing) existing.remove();
}

/**
 * Valide tous les champs obligatoires du formulaire.
 * @param {HTMLFormElement} form
 * @returns {boolean} true si valide
 */
function validateForm(form) {
  let isValid = true;

  const titre = form.querySelector("#titre");
  const descCourte = form.querySelector("#description_courte");
  const description = form.querySelector("#description");
  const categorie = form.querySelector("#categorie");
  const date = form.querySelector("#date");
  const lienDemo = form.querySelector("#lien_demo");
  const lienGithub = form.querySelector("#lien_github");

  // Titre requis, 2–100 car
  if (!titre.value.trim()) {
    showError(titre, "Le titre est obligatoire.");
    isValid = false;
  } else if (titre.value.trim().length < 2) {
    showError(titre, "Le titre doit contenir au moins 2 caractères.");
    isValid = false;
  } else {
    clearError(titre);
  }

  // Description courte requise, max 160 car
  if (!descCourte.value.trim()) {
    showError(descCourte, "La description courte est obligatoire.");
    isValid = false;
  } else if (descCourte.value.trim().length > 160) {
    showError(
      descCourte,
      `${descCourte.value.trim().length}/160 caractères — trop long.`,
    );
    isValid = false;
  } else {
    clearError(descCourte);
  }

  // Description complète requise
  if (!description.value.trim()) {
    showError(description, "La description complète est obligatoire.");
    isValid = false;
  } else {
    clearError(description);
  }

  // Catégorie requise
  if (!categorie.value) {
    showError(categorie, "Veuillez sélectionner une catégorie.");
    isValid = false;
  } else {
    clearError(categorie);
  }

  // Date requise
  if (!date.value) {
    showError(date, "La date de réalisation est obligatoire.");
    isValid = false;
  } else {
    clearError(date);
  }

  // URL démo — facultatif mais doit être valide si rempli
  if (lienDemo && lienDemo.value.trim()) {
    try {
      new URL(lienDemo.value.trim());
      clearError(lienDemo);
    } catch {
      showError(
        lienDemo,
        "L'URL de démo n'est pas valide (ex : https://monsite.com).",
      );
      isValid = false;
    }
  }

  // URL GitHub — facultatif mais doit être valide si rempli
  if (lienGithub && lienGithub.value.trim()) {
    try {
      new URL(lienGithub.value.trim());
      clearError(lienGithub);
    } catch {
      showError(lienGithub, "L'URL GitHub n'est pas valide.");
      isValid = false;
    }
  }

  return isValid;
}

/** ─── Feedback succès ────────────────────────────────────────────── */

/**
 * Affiche un banner de succès en haut du formulaire, puis le retire après 4s.
 * @param {string} projectTitle
 */
function showSuccess(projectTitle) {
  const existing = document.getElementById("form-success-banner");
  if (existing) existing.remove();

  const banner = document.createElement("div");
  banner.id = "form-success-banner";
  banner.className =
    "flex items-start gap-3 bg-emerald-900 bg-opacity-40 border border-emerald-700 rounded-xl px-5 py-4 mb-6 text-sm text-emerald-300";
  banner.innerHTML = `
    <svg class="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <div>
      <p class="font-medium text-emerald-200">Projet ajouté avec succès !</p>
      <p class="text-emerald-400 text-xs mt-0.5">« ${projectTitle} » a été sauvegardé en local.
        <a href="lister-projets.html" class="underline hover:text-emerald-200 transition-colors">Voir la liste →</a>
      </p>
    </div>`;

  const form = document.querySelector("form");
  form.parentNode.insertBefore(banner, form);
  banner.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => banner.remove(), 4000);
}

/** ─── Collecte des données ────────────────────────────────────────── */

/**
 * Collecte les données du formulaire et les transforme en objet projet.
 * @param {HTMLFormElement} form
 * @returns {object}
 */
function collectFormData(form) {
  const data = new FormData(form);

  // Technologies cochées
  const technologies = data.getAll("technologies[]");
  const techAutres = data.get("tech_autres")?.trim();
  if (techAutres) {
    techAutres
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => technologies.push(t));
  }

  // Fonctionnalités (champs non vides)
  const features = data.getAll("feature[]").filter((f) => f.trim());

  // Mapping catégorie → label
  const CATEGORY_LABELS = {
    web: "Application Web",
    mobile: "Application Mobile",
    desktop: "Application Desktop",
    api: "API / Back-End",
    autre: "Autre",
  };

  const categoryValue = data.get("categorie");

  return {
    title: data.get("titre")?.trim(),
    shortDesc: data.get("description_courte")?.trim(),
    description: data.get("description")?.trim().split("\n\n").filter(Boolean),
    learned: data.get("apprentissages")?.trim().split("\n").filter(Boolean),
    category: categoryValue,
    categoryLabel: CATEGORY_LABELS[categoryValue] ?? "Autre",
    date: data.get("date"),
    duration: data.get("duree")?.trim() || "—",
    status:
      data.get("statut") === "termine"
        ? "Terminé"
        : data.get("statut") === "en_cours"
          ? "En cours"
          : "En pause",
    role: data.get("role")?.trim() || "Développeur Full Stack",
    demoUrl: data.get("lien_demo")?.trim() || "#",
    githubUrl:
      data.get("lien_github")?.trim() ||
      "https://github.com/seydinalimamoulayeyade",
    image: null, // fichier local — non persisté en localStorage
    ogImage: "images/og-preview.jpg",
    stack: { frontend: [], backend: [], tools: technologies },
    tags: technologies.slice(0, 4),
    features,
  };
}

/** ─── Point d'entrée ─────────────────────────────────────────────── */

/**
 * Initialise la logique du formulaire admin.
 * - Validation à la soumission
 * - Sauvegarde en localStorage
 * - Feedback visuel de succès
 * - Validation en temps réel sur blur
 */
export function initFormAdmin() {
  const form = document.querySelector("form");
  if (!form) return;

  // Effacer les erreurs à la saisie
  form.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("input", () => clearError(field));
    field.addEventListener("change", () => clearError(field));
  });

  // Soumission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm(form)) {
      // Faire défiler jusqu'à la première erreur
      const firstError = form.querySelector(".field-error");
      if (firstError)
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const projectData = collectFormData(form);
    const saved = saveProject(projectData);

    showSuccess(saved.title);
    form.reset();

    // Remettre la valeur par défaut du champ rôle
    const roleField = form.querySelector("#role");
    if (roleField) roleField.value = "Développeur Full Stack";
  });
}
