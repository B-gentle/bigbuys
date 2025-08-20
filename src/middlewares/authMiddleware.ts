import jwt from "jsonwebtoken";
import type { Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { env } from "../commons/env";
import { AuthRequest } from "../commons/types";

export async function authenticate(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const err = new Error("Unauthorized: missing Bearer token");
      (err as any).statusCode = 401;
      return next(err);
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
      const err = new Error("Unauthorized: empty token");
      (err as any).statusCode = 401;
      return next(err);
    }

    if (!env.JWT_SECRET) {
      const err = new Error("Server misconfiguration: JWT_SECRET not set");
      (err as any).statusCode = 500;
      logger.error({ event: "jwt_secret_missing" }, err.message);
      return next(err);
    }

    // verify token (throws on invalid)
    const payload = jwt.verify(token, env.JWT_SECRET) as
      | jwt.JwtPayload
      | string;

    // normalize payload
    if (typeof payload === "string") {
      // rarely used: JWT with string payload
      req.user = { id: payload };
    } else {
      const id =
        (payload.sub as string) ??
        (payload.userId as string) ??
        (payload.id as string);
      req.user = {
        id: id ?? "unknown",
        role: (payload.role as string) ?? undefined,
        ...payload,
      };
    }

    return next();
  } catch (err) {
    const e = err as Error;
    const out = new Error(`Unauthorized: ${e.message}`);
    (out as any).statusCode = 401;
    logger.warn({ err }, "Authentication failed");
    return next(out);
  }
}

/**
 * Authorization middleware factory.
 * Usage: app.get('/admin', authenticate, authorize('admin'), handler)
 */
export function authorize(...allowedRoles: string[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    const user = req.user;
    if (!user) {
      const err = new Error("Forbidden: no user");
      (err as any).statusCode = 403;
      return next(err);
    }

    // If no roles provided, allow any authenticated user
    if (allowedRoles.length === 0) return next();

    const role = user.role ?? "user";
    if (!allowedRoles.includes(role)) {
      const err = new Error("Forbidden: insufficient role");
      (err as any).statusCode = 403;
      return next(err);
    }

    return next();
  };
}
