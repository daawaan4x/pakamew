import "dotenv/config";
import { z } from "zod";

export interface Env {
	/** Current Node runtime environment. */
	NODE_ENV: "development" | "test" | "production";

	/** Host/IP address that the server binds to. */
	HOST: string;

	/** TCP port that the server listens on. */
	PORT: number;
}

export const EnvSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	HOST: z.string().min(1).default("127.0.0.1"),
	PORT: z.coerce.number().int().min(1).max(65535).default(3000),
}) satisfies z.ZodType<Env>;

export const env: Env = EnvSchema.parse(process.env);
