"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyToken = exports.signToken = exports.defaultSuccessResponse = exports.genericRequestBody = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../commons/env");
const logger_1 = require("./logger");
const genericRequestBody = (schema) => {
    return {
        content: {
            "application/json": {
                schema,
            },
        },
    };
};
exports.genericRequestBody = genericRequestBody;
const defaultSuccessResponse = (data, description = "Request successful") => {
    return {
        description,
        content: {
            "application/json": {
                data,
            },
        },
    };
};
exports.defaultSuccessResponse = defaultSuccessResponse;
if (!env_1.env.JWT_SECRET) {
    const err = new Error("Server misconfiguration: JWT_SECRET not set");
    err.statusCode = 500;
    logger_1.logger.error({ event: "jwt_secret_missing" }, err.message);
    throw new Error("JWT_SECRET not configured");
}
const signToken = (userId, expiresIn = "7d") => {
    return jsonwebtoken_1.default.sign({ sub: userId }, env_1.env.JWT_SECRET, { expiresIn });
};
exports.signToken = signToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
};
exports.verifyToken = verifyToken;
/**
 * Sign token and attach as HTTP-only cookie, then return token string.
 * - res: Express Response (cookie will be set)
 * - userId: string user identifier
 */
const generateToken = (res, userId, options) => {
    const token = (0, exports.signToken)(userId, options?.expiresIn ?? "7d");
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    res.cookie("token", token, {
        httpOnly: true,
        secure: env_1.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge,
    });
    return token;
};
exports.generateToken = generateToken;
//# sourceMappingURL=requestResponse.js.map