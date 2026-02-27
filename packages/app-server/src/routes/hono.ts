import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { Scalar } from "@scalar/hono-api-reference";
import type { Hono } from "hono";
import { auth } from "../auth";
import { orpcRouter } from "./orpc";

const openAPIGenerator = new OpenAPIGenerator({
	schemaConverters: [new ZodToJsonSchemaConverter()],
});

export function initHono(app: Hono): void {
	app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw));

	app.get(
		"/api",
		Scalar({
			pageTitle: "Pakamew API",
			sources: [
				{ title: "oRPC", url: "/api/openapi/orpc.json", slug: "orpc" },
				{ title: "Auth", url: "/api/auth/open-api/generate-schema", slug: "auth" },
			],
			agent: {
				disabled: true,
				hideAddApi: true,
			},
		}),
	);

	app.get("/api/openapi/orpc.json", async (c) => {
		const spec = await openAPIGenerator.generate(orpcRouter, {
			info: {
				title: "Pakamew oRPC API",
				version: "1.0.0",
			},
			servers: [{ url: "/api" }],
		});

		return c.json(spec);
	});

	app.get("/api/health", (c) => c.json({ status: "ok" }));
}
