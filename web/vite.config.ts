import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { createServerEnv } from "./src/env.server";

export default defineConfig(({ mode }) => {
	const loadedEnv = loadEnv(mode, process.cwd(), "");
	const env = createServerEnv({ ...process.env, ...loadedEnv });

	return {
		appType: "spa",
		envPrefix: ["VITE_"],
		build: {
			minify: "oxc",
			cssMinify: "lightningcss",
			cssCodeSplit: true,
			reportCompressedSize: true,
			sourcemap: "hidden",
			emptyOutDir: true,
		},
		server: {
			host: env.HOST,
			port: env.PORT,
		},
		plugins: [react()],
	};
});
