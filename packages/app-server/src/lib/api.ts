import type { RouterClient } from "@orpc/server";
import type { router } from "../routes";

export type ApiClient = RouterClient<typeof router>;
