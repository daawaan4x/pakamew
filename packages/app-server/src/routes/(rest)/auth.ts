import { SpanKind } from "@opentelemetry/api";
import type { Hono } from "hono";
import { auth } from "../../auth";
import { withSpan } from "../../lib/instrumentation/tracer";

export function initAuthRoutes(app: Hono) {
	app.on(["GET", "POST"], "/api/auth/*", async (c) =>
		withSpan("auth.handler", () => auth.handler(c.req.raw), {
			attributes: {
				"http.method": c.req.method,
				"http.route": "/api/auth/*",
			},
			kind: SpanKind.SERVER,
		}),
	);
}
