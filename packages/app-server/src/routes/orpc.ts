import { os } from "@orpc/server";
import z from "zod";

const ping = os
	.route({ method: "GET", path: "/ping" })
	.input(z.unknown())
	.output(z.string())
	.handler(() => "pong")
	.callable();

export const orpcRouter = {
	ping,
};
