import "./main.js";
import { initFilter } from "./modules/filter.js";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFilter);
} else {
  initFilter();
}
