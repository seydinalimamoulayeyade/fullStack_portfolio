import "./main.js";
import { initFilter } from "./modules/filter.js";
import {
  getVisibleProjects,
  initProjectsList,
} from "./modules/project-list.js";

function init() {
  initProjectsList();
  initFilter();
  updateStats();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function updateStats() {
  const projects = getVisibleProjects();

  const projectCount = projects.length;

  const techSet = new Set();
  projects.forEach((p) => {
    (p.tags || []).forEach((t) => techSet.add(t));
  });

  const techCount = techSet.size;

  const statProjects = document.getElementById("stat-projects");
  const statTech = document.getElementById("stat-tech");

  if (statProjects) statProjects.textContent = projectCount;
  if (statTech) statTech.textContent = techCount + "+";
}
