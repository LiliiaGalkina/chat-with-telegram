import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/tg/": {
        target: 'https://4100.api.green-api.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/tg\//, ""),
      },
    },
  },
});
