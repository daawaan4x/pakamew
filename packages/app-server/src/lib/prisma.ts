import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/client";
import { getEnv } from "../env";

const env = getEnv((shape) => ({
	NODE_ENV: shape.NODE_ENV,
	DATABASE_URL: shape.DATABASE_URL,
}));

const adapter = new PrismaPg({
	connectionString: env.DATABASE_URL,
});

export const prisma = new PrismaClient({
	adapter,
	errorFormat: env.NODE_ENV == "development" ? "pretty" : "colorless",
});
