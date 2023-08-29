import { defineConfig } from "astro/config";

// Astro integrations import
import AstroPWA from "@vite-pwa/astro";
import tailwind from "@astrojs/tailwind";

// Helper imports
import { manifest, seoConfig } from "./utils/seoConfig";

// https://astro.build/config
export default defineConfig({
	site: seoConfig.baseURL,
	integrations: [
		tailwind(),
		AstroPWA({
			registerTypes: "autoUpdate",
			manifest,
			workbox: {
				globDirectory: "dist",
				globPatterns: [
					"**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico,html}",
				],
				// Don't fallback on document based (e.g. `/some-page`) requests
				// This removes an errant console.log message from showing up.
				navigateFallback: null,
			},
		}),
	],
	server: {
		port: 4000,
	},
});
