import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import { Hono } from "hono";
import { initHono, orpcRouter } from "./routes";

const orpcHandler = new RPCHandler(orpcRouter, {
	plugins: [new CORSPlugin()],
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

export function createApp() {
	const app = new Hono();

	app.use("/api/*", async (c, next) => {
		const result = await orpcHandler.handle(c.req.raw, {
			context: { headers: c.req.raw.headers },
			prefix: "/api",
		});

		if (result.matched) {
			return result.response;
		}

		await next();
	});

	initHono(app);

	return app;
}

export const app = createApp();

export function isAppRoute(method: string, pathname: string): boolean {
	return app.router.match(method.toUpperCase(), pathname)[0].length > 0;
}
