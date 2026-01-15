import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import { defineConfig } from "vite";
import ViteSitemap from "vite-plugin-sitemap";
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

    // Sitemap generation
    ViteSitemap({
      hostname: "https://www.bennett-eghan.com",
      dynamicRoutes,
      generateRobotsTxt: false,
    }),

    // Default SEO meta injection
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: "abena's portfolio | swe",
          description:
            "explore abena's projects, blog, and insights.",
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
      input: {
        main: path.resolve(__dirname, "index.html"),
        blog: path.resolve(__dirname, "blog.html"),
        projects: path.resolve(__dirname, "projects.html"),
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
