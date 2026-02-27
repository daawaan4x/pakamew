import "dotenv/config";
import { z } from "zod/mini";
import { EnvSchema, type Env } from "./env";

export interface ServerEnv extends Env {
	/** Current Node runtime environment. */
	NODE_ENV: "development" | "test" | "production";

	/** Host/IP address used by the web Vite dev and preview server. */
	HOST: string;

	/** TCP port used by the web Vite dev and preview server. */
	PORT: number;
}

export const ServerEnvSchema = z.object({
	NODE_ENV: z._default(z.enum(["development", "test", "production"]), "development"),
	HOST: z._default(z.string().check(z.minLength(1)), "127.0.0.1"),
	PORT: z._default(z.coerce.number().check(z.int(), z.minimum(1), z.maximum(65535)), 5173),
	...EnvSchema.shape,
});

type ServerEnvSchemaShape = typeof ServerEnvSchema.shape;

/**
 * Get a slice of the environment variables. Since the backend runs in different environments, this helper function allows only requiring a subset of environment variables at a given time (Development, Testing, CI, Production, etc.).
 *
 * @param slice - The slice of the environment variables to get.
 * @param source - The source of the environment variables.
 * @returns The environment variables for the given slice.
 */
export function getEnv<const K extends keyof ServerEnv>(
	slice: (shape: ServerEnvSchemaShape) => Pick<ServerEnvSchemaShape, K>,
	source: Record<string, unknown> = process.env,
): Pick<ServerEnv, K> {
	return z.object(slice(ServerEnvSchema.shape)).parse(source) as Pick<ServerEnv, K>;
}
