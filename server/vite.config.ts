import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
	server: {
		host: "127.0.0.1",
		port: 3000,
	},
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
