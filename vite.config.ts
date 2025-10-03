import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        orientation: "portrait",
        start_url: "/",
        name: "PWA Simon Game",
        short_name: "Simon Game",
        description: "A Simon game.",
        theme_color: "#292929",
        background_color: "#292929",
        display: "standalone",
        icons: [
          {
            purpose: "any",
            sizes: "512x512",
            src: "icon512.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "192x192",
            src: "icon192.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "144x144",
            src: "icon144.png",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
