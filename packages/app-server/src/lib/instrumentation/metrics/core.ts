import { metrics, ValueType, type Attributes } from "@opentelemetry/api";
import { config } from "../config";

export { ValueType };
export type MetricAttributes = Attributes;

export const meter = metrics.getMeter(`${config.OTEL_SERVICE_NAME}.metrics`, config.OTEL_SERVICE_VERSION);

export function addAttribute(attributes: Attributes, key: string, value: string | number | undefined): void {
	if (value !== undefined) {
		attributes[key] = value;
	}
}
