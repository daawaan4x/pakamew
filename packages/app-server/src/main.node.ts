import { serve } from "@hono/node-server";
import { app } from "./app";
import { getEnv } from "./env";

const env = getEnv((shape) => ({ HOST: shape.HOST, PORT: shape.PORT }));

serve({ fetch: app.fetch, hostname: env.HOST, port: env.PORT }, () => {
	console.log(`Listening on ${env.HOST}:${env.PORT}`);
});
