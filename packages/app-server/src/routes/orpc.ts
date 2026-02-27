import { os } from "@orpc/server";
import z from "zod";

const ping = os
	.route({ method: "GET" })
	.input(z.void())
	.handler(() => "pong")
	.callable();

export const orpcRouter = {
	ping,
};
