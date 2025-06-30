import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [
    react(),
    basicSsl(), // هذا سيقوم بإنشاء شهادة SSL تلقائياً
  ],
  server: {
    https: true,
    host: "0.0.0.0",
    port: 5173,
  },
});
