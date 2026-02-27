import { os, type RouterClient } from "@orpc/server";

const ping = os.handler(() => "pong").callable();

export const router = {
	ping,
};

export type ApiClient = RouterClient<typeof router>;
