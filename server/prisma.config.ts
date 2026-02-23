import { defineConfig } from "prisma/config";
import { getEnv } from "./src/env";

const env = getEnv((env) => ({ DATABASE_URL: env.DATABASE_URL }));

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
	},
	datasource: {
		url: env.DATABASE_URL,
	},
});
