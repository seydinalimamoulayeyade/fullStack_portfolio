import "./main.js";
import { initFormAdmin } from "./modules/form-admin.js";
import { initManageProjects } from "./modules/manage-projects.js";
import { requireAdmin } from "./lib/admin-guard.js";

async function init() {
  try {
    await requireAdmin();

    document.body.classList.remove("opacity-0");

    initFormAdmin();
    initManageProjects();
  } catch (error) {
    console.error(error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
