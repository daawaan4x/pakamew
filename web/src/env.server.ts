import { z } from "zod/mini";
import { EnvSchema, withEnvDefaults, type Env } from "./env";

export interface ServerEnv extends Env {
	/** Current Node runtime environment. */
	NODE_ENV: "development" | "test" | "production";

	/** Host/IP address used by the web Vite dev and preview server. */
	HOST: string;

	/** TCP port used by the web Vite dev and preview server. */
	PORT: number;
}

type EnvSource = Record<string, unknown>;

const defaults: Partial<ServerEnv> = {
	NODE_ENV: "development",
	HOST: "127.0.0.1",
	PORT: 5173,
};

export const ServerEnvSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]),
	HOST: z.string().check(z.minLength(1)),
	PORT: z.coerce.number().check(z.int(), z.minimum(1), z.maximum(65535)),
	...EnvSchema.shape,
});

export const withServerEnvDefaults = (source: EnvSource): EnvSource => ({
	NODE_ENV: source.NODE_ENV ?? defaults.NODE_ENV,
	HOST: source.HOST ?? defaults.HOST,
	PORT: source.PORT ?? defaults.PORT,
	...withEnvDefaults(source),
});

export const createServerEnv = (source: EnvSource): ServerEnv => ServerEnvSchema.parse(withServerEnvDefaults(source));
