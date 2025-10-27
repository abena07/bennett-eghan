import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import { defineConfig } from "vite";
import  ViteSitemap from "vite-plugin-sitemap";
import { createHtmlPlugin } from "vite-plugin-html";

const dynamicRoutes = [
  "/",
  "/projects",
  "/blog",
];
export default defineConfig({
  plugins: [
    react(),
    mdx(),
    tailwindcss(),

    // Sitemap + robots.txt generation
    ViteSitemap({
      hostname: "https://www.bennett-eghan.com", // replace with your real domain
      dynamicRoutes,
      generateRobotsTxt: true,
    }),

    // Default SEO meta injection
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: "Abena's portfolio | swe",
          description:
            "explore Abena's projects, blog, and insights.",
        },
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
