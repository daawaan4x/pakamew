import type { RouterClient } from "@orpc/server";
import type { orpcRouter } from "../routes";

export type ApiClient = RouterClient<typeof orpcRouter>;
