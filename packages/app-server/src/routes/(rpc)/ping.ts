import { os } from "@orpc/server";
import z from "zod";

export const ping = os
	.route({ method: "GET", path: "/ping" })
	.input(z.unknown())
	.output(z.string())
	.handler(() => "pong")
	.callable();
