import type { Request, Response, NextFunction } from "express";
/**
 * Central Express error handler
 * - Handles malformed JSON (422)
 * - Handles Zod validation errors (400)
 * - Honors errors with numeric `statusCode` property
 * - Logs structured error info via pino logger
 */
export default function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=errorHandler.d.ts.map