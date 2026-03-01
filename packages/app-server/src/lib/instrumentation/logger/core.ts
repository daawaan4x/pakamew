import pino, { type DestinationStream, type Logger, type LoggerOptions } from "pino";
import { $ESCALATE } from "../../constants";
import type { config } from "../config";

const DEFAULT_ESCALATION_REASON = "error";

export type LoggerConfig = Pick<
	typeof config,
	| "OTEL_SERVICE_NAME"
	| "OTEL_SERVICE_VERSION"
	| "OTEL_DEPLOYMENT_ENVIRONMENT"
	| "OBS_PRESET"
	| "OBS_LOG_LEVEL"
	| "OBS_ERROR_TRACE_WINDOW_MS"
>;

export type EscalationLogEntry = Record<string, unknown> & {
	[$ESCALATE]?: string | boolean;
};

function asEscalationLogEntry(value: unknown): EscalationLogEntry | undefined {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return undefined;
	return value as EscalationLogEntry;
}

function resolveEscalationReason(marker: EscalationLogEntry[typeof $ESCALATE]): string | undefined {
	if (marker === true) return DEFAULT_ESCALATION_REASON;
	if (typeof marker === "string" && marker.length > 0) return marker;
	return undefined;
}

export function initLogger(config: LoggerConfig, destination?: DestinationStream): Logger {
	let resetTraceTimeout: NodeJS.Timeout | undefined;
	const targetDestination = destination ?? pino.destination(1);
	const defaultLevel = config.OBS_LOG_LEVEL;
	const traceWindowMs = config.OBS_ERROR_TRACE_WINDOW_MS;

	const revertTraceLevel = () => {
		logger.level = defaultLevel;
		logger.info({ level: defaultLevel }, "Reverting logger level after TRACE escalation window");
	};

	const scheduleTraceRevert = () => {
		if (resetTraceTimeout) clearTimeout(resetTraceTimeout);
		resetTraceTimeout = setTimeout(revertTraceLevel, traceWindowMs);
	};

	const escalateTraceLogging = (reason: string) => {
		if (defaultLevel === "trace") return;
		logger.level = "trace";
		logger.warn({ reason, windowMs: traceWindowMs }, "Temporarily escalating logger level to TRACE after error");
		scheduleTraceRevert();
	};

	const options: LoggerOptions = {
		name: config.OTEL_SERVICE_NAME,
		level: defaultLevel,
		base: {
			service: config.OTEL_SERVICE_NAME,
			version: config.OTEL_SERVICE_VERSION,
			environment: config.OTEL_DEPLOYMENT_ENVIRONMENT,
			preset: config.OBS_PRESET,
		},
		redact: {
			paths: ["req.headers.authorization", "req.headers.cookie", "headers.authorization", "headers.cookie"],
		},
		hooks: {
			logMethod(args, method) {
				const entry = asEscalationLogEntry(args[0]);
				if (!entry || !($ESCALATE in entry)) {
					return method.apply(this, args);
				}

				const reason = resolveEscalationReason(entry[$ESCALATE]);
				if (reason) escalateTraceLogging(reason);
				return method.apply(this, args);
			},
		},
	};

	const logger = pino(options, targetDestination);
	return logger;
}
