import "./main.js";
import { initFormAdmin } from "./modules/form-admin.js";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFormAdmin);
} else {
  initFormAdmin();
}
