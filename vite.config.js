import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        content: "src/content/content.js",
      },
      output: {
        entryFileNames: "[name].js",
        dir: "dist",
      },
    },
    outDir: "dist",
  },
});
