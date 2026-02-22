import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { ApiClient } from "@pakamew/server/api";

const link = new RPCLink({
	url: "http://127.0.0.1:3000",
	headers: { Authorization: "Bearer token" },
});

export const api: ApiClient = createORPCClient(link);
