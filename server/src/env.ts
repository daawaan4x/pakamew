import "dotenv/config";
import { z } from "zod";

export interface Env {
	/** Current Node runtime environment. */
	NODE_ENV: "development" | "test" | "production";

	/** Database connection string used by Prisma. */
	DATABASE_URL: string;

	/** Host/IP address that the server binds to. */
	HOST: string;

	/** TCP port that the server listens on. */
	PORT: number;
}

export const EnvSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	DATABASE_URL: z.string().min(1),
	HOST: z.string().min(1).default("127.0.0.1"),
	PORT: z.coerce.number().int().min(1).max(65535).default(3000),
}) satisfies z.ZodType<Env>;

type EnvSchemaShape = typeof EnvSchema.shape;

/**
 * Get a slice of the environment variables. Since the backend runs in different environments, this helper function allows only requiring a subset of environment variables at a given time (Development, Testing, CI, Production, etc.).
 *
 * @param slice - The slice of the environment variables to get.
 * @param source - The source of the environment variables.
 * @returns The environment variables for the given slice.
 */
export function getEnv<const K extends keyof Env>(
	slice: (shape: EnvSchemaShape) => Pick<EnvSchemaShape, K>,
	source: Record<string, unknown> = process.env,
): Pick<Env, K> {
	return z.object(slice(EnvSchema.shape)).parse(source) as Pick<Env, K>;
}
