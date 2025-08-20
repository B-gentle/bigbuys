"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const logger_1 = require("../utils/logger");
const zod_1 = require("zod");
/**
 * Central Express error handler
 * - Handles malformed JSON (422)
 * - Handles Zod validation errors (400)
 * - Honors errors with numeric `statusCode` property
 * - Logs structured error info via pino logger
 */
function errorHandler(err, req, res, next) {
    // default
    let status = 500;
    let message = "Internal Server Error";
    let details = undefined;
    if ((err instanceof SyntaxError && "body" in err) ||
        (err &&
            typeof err === "object" &&
            err.type === "entity.parse.failed")) {
        status = 422;
        message = "Malformed JSON request";
        details = { error: err.message };
    }
    else if (err instanceof zod_1.ZodError) {
        status = 400;
        message = "Validation error";
        details = err.issues.map((e) => ({ path: e.path, message: e.message }));
    }
    else if (err &&
        typeof err === "object" &&
        "statusCode" in err &&
        typeof err.statusCode === "number") {
        status = err.statusCode;
        message = err.message ?? message;
        details = err.errors ?? err.details ?? undefined;
    }
    else if (err instanceof Error) {
        message = err.message || message;
    }
    // Structured log
    logger_1.logger.error({
        err,
        req: { method: req.method, url: req.originalUrl },
        status,
    }, message);
    const payload = { status, message };
    if (details)
        payload.details = details;
    // include stack trace only in non-production
    if (process.env.NODE_ENV !== "production" && err instanceof Error) {
        payload.stack = err.stack;
    }
    // send JSON response
    try {
        res.status(status).json(payload);
    }
    catch (sendErr) {
        // If response fails, log and end
        logger_1.logger.error({ sendErr }, "Failed to send error response");
        // fallback
        if (!res.headersSent) {
            res.status(500).end();
        }
    }
}
//# sourceMappingURL=errorHandler.js.map