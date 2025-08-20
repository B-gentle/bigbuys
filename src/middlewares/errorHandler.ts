import type { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { ZodError } from "zod";

/**
 * Central Express error handler
 * - Handles malformed JSON (422)
 * - Handles Zod validation errors (400)
 * - Honors errors with numeric `statusCode` property
 * - Logs structured error info via pino logger
 */

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // default
  let status = 500;
  let message = "Internal Server Error";
  let details: unknown = undefined;

  if (
    (err instanceof SyntaxError && "body" in err) ||
    (err &&
      typeof err === "object" &&
      (err as any).type === "entity.parse.failed")
  ) {
    status = 422;
    message = "Malformed JSON request";
    details = { error: (err as Error).message };
  } else if (err instanceof ZodError) {
    status = 400;
    message = "Validation error";
    details = err.issues.map((e) => ({ path: e.path, message: e.message }));
  } else if (
    err &&
    typeof err === "object" &&
    "statusCode" in err &&
    typeof (err as any).statusCode === "number"
  ) {
    status = (err as any).statusCode;
    message = (err as any).message ?? message;
    details = (err as any).errors ?? (err as any).details ?? undefined;
  } else if (err instanceof Error) {
    message = err.message || message;
  }

  // Structured log
  logger.error(
    {
      err,
      req: { method: req.method, url: req.originalUrl },
      status,
    },
    message
  );

  const payload: Record<string, unknown> = { status, message };
  if (details) payload.details = details;
  // include stack trace only in non-production
  if (process.env.NODE_ENV !== "production" && err instanceof Error) {
    payload.stack = err.stack;
  }

  // send JSON response
  try {
    res.status(status).json(payload);
  } catch (sendErr) {
    // If response fails, log and end
    logger.error({ sendErr }, "Failed to send error response");
    // fallback
    if (!res.headersSent) {
      res.status(500).end();
    }
  }
}
