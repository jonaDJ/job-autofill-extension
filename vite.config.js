import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        content: "src/content.jsx",
        styles: "src/index.css", // Add this line
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "styles.css", // change this line.
      },
    },
    outDir: "dist",
  },
});
