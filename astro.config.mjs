// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from '@astrojs/vercel';
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://imperionetwork.fr",
	output: "server",
	adapter: vercel(),
	integrations: [
		react(),
		mdx(),
		sitemap({
			filter: (page) => !page.includes("/api/"),
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": "./src",
			},
		},
	},
});
