import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import { PinoInstrumentation } from "@opentelemetry/instrumentation-pino";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { AlwaysOnSampler } from "@opentelemetry/sdk-trace-base";
import { ORPCInstrumentation } from "@orpc/otel";
import { PrismaInstrumentation } from "@prisma/instrumentation";
import { config } from "./config";

interface TelemetryState {
	started: boolean;
	hooksRegistered: boolean;
	sdk: NodeSDK | undefined;
}

type GlobalTelemetryState = typeof globalThis & {
	__pakamewTelemetryState?: TelemetryState;
};

function toOtlpSignalUrl(baseUrl: string, signalPath: string): string {
	return `${baseUrl.replace(/\/+$/, "")}${signalPath}`;
}

function getGlobalTelemetryState(): TelemetryState {
	const globalState = globalThis as GlobalTelemetryState;
	globalState.__pakamewTelemetryState ??= {
		started: false,
		hooksRegistered: false,
		sdk: undefined,
	};
	return globalState.__pakamewTelemetryState;
}

function registerShutdownHooks(state: TelemetryState): void {
	if (state.hooksRegistered || !state.sdk) return;
	state.hooksRegistered = true;

	const shutdown = () => {
		void state.sdk?.shutdown().catch(() => undefined);
	};

	process.once("SIGTERM", () => {
		shutdown();
	});
	process.once("SIGINT", () => {
		shutdown();
	});
}

export function initOpenTelemetry(): NodeSDK {
	const state = getGlobalTelemetryState();
	if (state.started && state.sdk) return state.sdk;

	const traceExporter = new OTLPTraceExporter({
		url: toOtlpSignalUrl(config.OTEL_EXPORTER_OTLP_ENDPOINT, "/v1/traces"),
	});

	const logExporter = new OTLPLogExporter({
		url: toOtlpSignalUrl(config.OTEL_EXPORTER_OTLP_ENDPOINT, "/v1/logs"),
	});

	const metricExporter = new OTLPMetricExporter({
		url: toOtlpSignalUrl(config.OTEL_EXPORTER_OTLP_ENDPOINT, "/v1/metrics"),
	});

	const sdk = new NodeSDK({
		sampler: new AlwaysOnSampler(),
		resource: resourceFromAttributes({
			"service.name": config.OTEL_SERVICE_NAME,
			"service.version": config.OTEL_SERVICE_VERSION,
			"deployment.environment": config.OTEL_DEPLOYMENT_ENVIRONMENT,
			"observability.preset": config.OBS_PRESET,
		}),
		traceExporter,
		logRecordProcessors: [new BatchLogRecordProcessor(logExporter)],
		metricReaders: [
			new PeriodicExportingMetricReader({
				exportIntervalMillis: config.OBS_METRICS_EXPORT_INTERVAL_MS,
				exporter: metricExporter,
			}),
		],
		instrumentations: [
			new ORPCInstrumentation(),
			new PrismaInstrumentation(),
			new PinoInstrumentation(),
			new PgInstrumentation({
				addSqlCommenterCommentToQueries: true,
				ignoreConnectSpans: true,
			}),
		],
	});

	sdk.start();

	state.started = true;
	state.sdk = sdk;
	registerShutdownHooks(state);

	return sdk;
}

initOpenTelemetry();
