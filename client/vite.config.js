import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },

  server: {
  port: 5173,
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
      secure: false,
    },
    "/auth": {
      target: "http://localhost:3000",
      changeOrigin: true,
      secure: false,
    },
  },
},

});
