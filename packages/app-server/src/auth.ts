import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, anonymous, apiKey, openAPI } from "better-auth/plugins";
import { getEnv } from "./env";
import { prisma } from "./lib/prisma";

const env = getEnv((shape) => ({ NODE_ENV: shape.NODE_ENV }));

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		requireEmailVerification: env.NODE_ENV != "development",
	},
	plugins: [admin(), anonymous(), openAPI({ disableDefaultReference: true }), apiKey()],
	database: prismaAdapter(prisma, {
		usePlural: true,
		transaction: true,
		provider: "postgresql",
		debugLogs: env.NODE_ENV == "development",
	}),
});
