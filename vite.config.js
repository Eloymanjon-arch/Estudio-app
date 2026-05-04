import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Estudio-app/"   // 👈 NOMBRE EXACTO DE TU REPO
});