import pino from "pino";
import pinoHttp from "pino-http";
import path from "path";
import fs from "fs";
import { env } from "../commons/env";

const level = env.LOG_LEVEL ?? (env.NODE_ENV === "production" ? "info" : "debug");

// ensure logs dir
const logsDir = path.resolve("logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

let logger: pino.Logger;

if (process.env.NODE_ENV === "development") {
  // pino.transport requires Node >=16 and pino >=7; pino-pretty must be installed
  logger = pino(
    { level, timestamp: pino.stdTimeFunctions.isoTime },
    pino.transport({
      target: "pino-pretty",
      options: { colorize: true, translateTime: "SYS:standard" },
    })
  );
} else {
  const dest = pino.destination(path.join(logsDir, "combined.log"));
  logger = pino({ level, timestamp: pino.stdTimeFunctions.isoTime }, dest);
}

// Express middleware
export const requestLogger = pinoHttp({ logger });

export { logger };