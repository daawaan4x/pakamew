import type { Hono } from "hono";

export function initHono(app: Hono): void {
	app.get("/api/health", (c) => c.json({ status: "ok" }));
}
