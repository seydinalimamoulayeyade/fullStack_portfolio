import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/fullStack_portfolio/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        projects: resolve(__dirname, "lister-projets.html"),
        addProject: resolve(__dirname, "ajouter-projet.html"),
        projectDetail: resolve(__dirname, "detailler-projet.html"),
      },
    },
  },
});
