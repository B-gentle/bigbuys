"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.requestLogger = void 0;
const pino_1 = __importDefault(require("pino"));
const pino_http_1 = __importDefault(require("pino-http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const env_1 = require("../commons/env");
const level = env_1.env.LOG_LEVEL ?? (env_1.env.NODE_ENV === "production" ? "info" : "debug");
// ensure logs dir
const logsDir = path_1.default.resolve("logs");
if (!fs_1.default.existsSync(logsDir))
    fs_1.default.mkdirSync(logsDir, { recursive: true });
let logger;
if (process.env.NODE_ENV === "development") {
    // pino.transport requires Node >=16 and pino >=7; pino-pretty must be installed
    exports.logger = logger = (0, pino_1.default)({ level, timestamp: pino_1.default.stdTimeFunctions.isoTime }, pino_1.default.transport({
        target: "pino-pretty",
        options: { colorize: true, translateTime: "SYS:standard" },
    }));
}
else {
    const dest = pino_1.default.destination(path_1.default.join(logsDir, "combined.log"));
    exports.logger = logger = (0, pino_1.default)({ level, timestamp: pino_1.default.stdTimeFunctions.isoTime }, dest);
}
// Express middleware
exports.requestLogger = (0, pino_http_1.default)({ logger });
//# sourceMappingURL=logger.js.map