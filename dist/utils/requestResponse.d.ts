import { ZodType } from "zod";
import jwt from "jsonwebtoken";
import { Response } from "express";
export declare const genericRequestBody: <TData extends ZodType>(schema: TData) => {
    content: {
        "application/json": {
            schema: TData;
        };
    };
};
export declare const defaultSuccessResponse: <TData extends ZodType>(data?: TData, description?: string) => {
    description: string;
    content: {
        "application/json": {
            data: TData | undefined;
        };
    };
};
export declare const signToken: (userId: string, expiresIn?: string) => string;
export declare const verifyToken: (token: string) => string | jwt.JwtPayload;
/**
 * Sign token and attach as HTTP-only cookie, then return token string.
 * - res: Express Response (cookie will be set)
 * - userId: string user identifier
 */
export declare const generateToken: (res: Response, userId: string, options?: {
    expiresIn?: string;
}) => string;
//# sourceMappingURL=requestResponse.d.ts.map