const ADMIN_ACCESS_KEY = "adminAccess";
const ADMIN_ACCESS_VALUE = "granted";

if (sessionStorage.getItem(ADMIN_ACCESS_KEY) !== ADMIN_ACCESS_VALUE) {
  window.location.replace("index.html");
}

import "../style.css";
import "./main.js";
import { initFormAdmin } from "./modules/form-admin.js";
import { initManageProjects } from "./modules/manage-projects.js";

function initAdminLogout() {
  const logoutBtn = document.getElementById("admin-logout-btn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem(ADMIN_ACCESS_KEY);
    window.location.replace("index.html");
  });
}

async function init() {
  try {
    initAdminLogout();
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
