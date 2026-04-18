import { PROJECTS } from "./projects-data.js";

const STORAGE_KEY = "slly_projects";

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

function fillForm(project) {
  document.getElementById("titre").value = project.title || "";
  document.getElementById("description_courte").value = project.shortDesc || "";
  document.getElementById("description").value = (project.description || []).join("\n\n");
  document.getElementById("categorie").value = project.category || "";
  document.getElementById("date").value = project.date || "";
  document.getElementById("lien_demo").value = project.demoUrl || "";
  document.getElementById("lien_github").value = project.githubUrl || "";
}

function collectFormData(form, editId) {
  const data = new FormData(form);

  return {
    id: editId || undefined,
    title: data.get("titre"),
    shortDesc: data.get("description_courte"),
    description: data.get("description")
      ?.split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean),
    category: data.get("categorie"),
    categoryLabel: data.get("categorie"),
    date: data.get("date"),
    demoUrl: data.get("lien_demo"),
    githubUrl: data.get("lien_github"),
    tags: [],
    features: [],
    stack: { frontend: [], backend: [], tools: [] },
  };
}

export function initFormAdmin() {
  const form = document.querySelector("form");
  if (!form) return;

  const editId = getEditId();

  if (editId) {
    const stored = getStoredProjects();
    const project = [...PROJECTS, ...stored].find((p) => Number(p.id) === editId);
    if (project) fillForm(project);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectData = collectFormData(form, editId);

    saveProject(projectData);

    window.location.href = "ajouter-projet.html";
  });
}
