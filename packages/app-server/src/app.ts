import type { IncomingMessage, ServerResponse } from "node:http";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/node";
import { CORSPlugin } from "@orpc/server/plugins";
import { router } from "./routes";

const handler = new RPCHandler(router, {
	plugins: [new CORSPlugin()],
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

export async function handleNodeRequest(
	req: IncomingMessage,
	res: ServerResponse,
	options: { respond404?: boolean } = {},
) {
	options.respond404 ??= true;

	const result = await handler.handle(req, res, {
		context: { headers: req.headers },
		prefix: "/api",
	});

	if (!result.matched) {
		if (options.respond404) {
			res.statusCode = 404;
			res.end("No procedure matched");
		}

		return { matched: false };
	}

	return { matched: true };
}
