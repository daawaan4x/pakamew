import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
	plugins: [
		...VitePluginNode({
			adapter: async ({ app, req, res, next }) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				await app(req, res, next);
			},
			appPath: "./src/main.dev.ts",
			exportName: "viteNodeApp",
		}),
	],
});
