export default {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#1a1a2e", light: "#16213e" },
        accent: { DEFAULT: "#e94560", hover: "#c73652" },
        surface: { DEFAULT: "#0f3460", light: "#1a4a8a" },
        muted: "#94a3b8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};