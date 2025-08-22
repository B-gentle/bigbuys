import z, { ZodType } from "zod";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../commons/env";
import { Response } from "express";
import { logger } from "./logger";

export const genericRequestBody = <TData extends ZodType>(schema: TData) => {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
  };
};

export const defaultSuccessResponse = <TData extends ZodType>(
  data?: TData,
  description: string = "Request successful"
) => {
  return {
    description,
    content: {
      "application/json": {
        data,
      },
    },
  };
};

if (!env.JWT_SECRET) {
  const err = new Error("Server misconfiguration: JWT_SECRET not set");
  (err as any).statusCode = 500;
  logger.error({ event: "jwt_secret_missing" }, err.message);
  throw new Error("JWT_SECRET not configured");
}

export const signToken = (userId: string, expiresIn = "7d"): string => {
  return jwt.sign(
    { sub: userId },
    env.JWT_SECRET as Secret,
    { expiresIn } as SignOptions
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET as Secret);
};

/**
 * Sign token and attach as HTTP-only cookie, then return token string.
 * - res: Express Response (cookie will be set)
 * - userId: string user identifier
 */
export const generateToken = (
  res: Response,
  userId: string,
  options?: { expiresIn?: string }
) => {
  const token = signToken(userId, options?.expiresIn ?? "7d");

  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
  });

  return token;
};
