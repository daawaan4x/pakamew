import { config } from "../config";
import { initLogger } from "./core";

const logger = initLogger(config);

export function getLogger() {
	return logger;
}
