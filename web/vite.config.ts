import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	appType: "spa",
	build: {
		minify: "oxc",
		cssMinify: "lightningcss",
		cssCodeSplit: true,
		reportCompressedSize: true,
		sourcemap: "hidden",
		emptyOutDir: true,
	},
	plugins: [react()],
});
