import "./main.js";
import { initFormAdmin } from "./modules/form-admin.js";
import { initManageProjects } from "./modules/manage-projects.js";

async function init() {
  try {
    await initFormAdmin();
    await initManageProjects();
  } catch (error) {
    console.error(error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
