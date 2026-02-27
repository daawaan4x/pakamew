import { os } from "@orpc/server";

const ping = os.handler(() => "pong").callable();

export const router = {
	ping,
};
