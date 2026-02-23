import { z } from "zod/mini";

export interface Env {
	/** Base URL for the backend API server. */
	VITE_API_URL: string;
}

type EnvSource = Record<string, unknown>;

const defaults: Partial<Env> = {
	VITE_API_URL: "http://127.0.0.1:3000",
};

export const withEnvDefaults = (source: EnvSource): EnvSource => ({
	VITE_API_URL: source.VITE_API_URL ?? defaults.VITE_API_URL,
});

export const EnvSchema = z.object({
	VITE_API_URL: z.string().check(z.url()),
});

// Context: "env.ts" is a client-side file but it's imported in "env.server.ts" and import.meta is not recognized in tsconfig.node.json (server-side tsconfig)
// Solution: Used "any" to bypass the type check and disabled lint rules for this
//
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
export const env: Env = EnvSchema.parse(withEnvDefaults((import.meta as any).env ?? {}));
