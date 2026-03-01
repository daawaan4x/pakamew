import { initPrismaClient } from "./client";
import { instrument } from "./instrumentation";

const prisma = initPrismaClient();

instrument(prisma);

export function getPrisma() {
	return prisma;
}
