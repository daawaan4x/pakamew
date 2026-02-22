import type { IncomingMessage, ServerResponse } from "node:http";
import type { Connect } from "vite";
import { handleNodeRequest } from "./app";

export const viteNodeApp = async (
	req: IncomingMessage,
	res: ServerResponse,
	next?: Connect.NextFunction,
): Promise<void> => {
	const { matched } = await handleNodeRequest(req, res, { respond404: false });

	if (!matched && next) next();
};
