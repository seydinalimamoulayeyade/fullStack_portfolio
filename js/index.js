import "../style.css";
import "./main.js";
import { initFeaturedProjects } from "./modules/featured-projects.js";
import { initTypewriter } from "./modules/typewriter.js";

const ADMIN_ACCESS_KEY = "adminAccess";
const ADMIN_ACCESS_VALUE = "granted";
const ADMIN_REDIRECT_PAGE = "ajouter-projet.html";
const ADMIN_CODE = "SLLY2026";

function isAdminSessionActive() {
  return sessionStorage.getItem(ADMIN_ACCESS_KEY) === ADMIN_ACCESS_VALUE;
}

function updateAdminSessionBadge() {
  const badge = document.getElementById("admin-session-badge");
  const mobileBadge = document.getElementById("admin-session-badge-mobile");
  const active = isAdminSessionActive();

  if (badge) {
    badge.classList.toggle("hidden", !active);
    badge.classList.toggle("inline-flex", active);
  }

  if (mobileBadge) {
    mobileBadge.classList.toggle("hidden", !active);
    mobileBadge.classList.toggle("flex", active);
  }
}

function openAdminModal() {
  const modal = document.getElementById("admin-modal");
  const input = document.getElementById("admin-access-code");
  const error = document.getElementById("admin-access-error");

  if (!modal) return;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.setAttribute("aria-hidden", "false");

  if (error) error.classList.add("hidden");
  if (input) {
    input.value = "";
    setTimeout(() => input.focus(), 0);
  }
}

function closeAdminModal() {
  const modal = document.getElementById("admin-modal");
  if (!modal) return;

  modal.classList.add("hidden");
  modal.classList.remove("flex");
  modal.setAttribute("aria-hidden", "true");
}

function grantAdminAccess() {
  sessionStorage.setItem(ADMIN_ACCESS_KEY, ADMIN_ACCESS_VALUE);
  updateAdminSessionBadge();
  window.location.href = ADMIN_REDIRECT_PAGE;
}

function initAdminAccess() {
  const desktopTrigger = document.getElementById("admin-access-trigger");
  const mobileTrigger = document.getElementById("admin-access-trigger-mobile");
  const closeBtn = document.getElementById("admin-modal-close");
  const cancelBtn = document.getElementById("admin-modal-cancel");
  const modal = document.getElementById("admin-modal");
  const form = document.getElementById("admin-access-form");
  const input = document.getElementById("admin-access-code");
  const error = document.getElementById("admin-access-error");

  if (desktopTrigger) desktopTrigger.addEventListener("click", openAdminModal);
  if (mobileTrigger) mobileTrigger.addEventListener("click", openAdminModal);
  if (closeBtn) closeBtn.addEventListener("click", closeAdminModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeAdminModal);

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeAdminModal();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAdminModal();
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const value = input?.value?.trim() || "";

      if (value === ADMIN_CODE) {
        grantAdminAccess();
        return;
      }

      if (error) error.classList.remove("hidden");
      if (input) {
        input.focus();
        input.select();
      }
    });
  }
}

function init() {
  initFeaturedProjects();
  initTypewriter();
  initAdminAccess();
  updateAdminSessionBadge();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
