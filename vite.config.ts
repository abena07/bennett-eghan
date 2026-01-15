import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import { defineConfig } from "vite";
import ViteSitemap from "vite-plugin-sitemap";
import { createHtmlPlugin } from "vite-plugin-html";
import ogPlugin from "vite-plugin-open-graph";

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
          title: "Abena's portfolio | swe",
          description:
            "explore Abena's projects, blog, and insights.",
        },
      },
    }),

    // Open Graph meta tags
    ogPlugin({
      basic: {
        title: "abena bennett-eghan | software engineer",
        type: "website",
        url: "https://www.bennett-eghan.com",
        description: "explore my projects, blog posts on algorithms, problem-solving, and navigating the tech space. thoughts on dsa, open source, and engineering things.",
        siteName: "bennett-eghan.com",
        image: "https://www.bennett-eghan.com/og-main.png",
      },
      twitter: {
        card: "summary_large_image",
        site: "@1bp7l_",
        title: "abena bennett-eghan | software engineer",
        description: "explore my projects, blog posts on algorithms, problem-solving, and navigating the tech space. thoughts on dsa, open source, and engineering things.",
        image: "https://www.bennett-eghan.com/og-main.png",
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
