import "./main.js";
import { initFormAdmin } from "./modules/form-admin.js";
import { initManageProjects } from "./modules/manage-projects.js";

function init() {
  initFormAdmin();
  initManageProjects();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
