import { NodeSDK } from '@opentelemetry/sdk-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { AwsInstrumentation } from '@opentelemetry/instrumentation-aws-sdk';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';

const sdk = new NodeSDK({
  serviceName: 'auth-service',
  instrumentations: [
    new HttpInstrumentation(),
    new NestInstrumentation(),
    new AwsInstrumentation(),
  ],
  traceExporter: new ZipkinExporter({
    url: 'http://localhost:9411/api/v2/spans', // Will be replaced with env variable
  }),
});

sdk.start();
