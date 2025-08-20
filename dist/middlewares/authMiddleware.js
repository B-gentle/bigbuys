"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.authorize = authorize;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../utils/logger");
const env_1 = require("../commons/env");
async function authenticate(req, _res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const err = new Error("Unauthorized: missing Bearer token");
            err.statusCode = 401;
            return next(err);
        }
        const token = authHeader.slice(7).trim();
        if (!token) {
            const err = new Error("Unauthorized: empty token");
            err.statusCode = 401;
            return next(err);
        }
        if (!env_1.env.JWT_SECRET) {
            const err = new Error("Server misconfiguration: JWT_SECRET not set");
            err.statusCode = 500;
            logger_1.logger.error({ event: "jwt_secret_missing" }, err.message);
            return next(err);
        }
        // verify token (throws on invalid)
        const payload = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        // normalize payload
        if (typeof payload === "string") {
            // rarely used: JWT with string payload
            req.user = { id: payload };
        }
        else {
            const id = payload.sub ??
                payload.userId ??
                payload.id;
            req.user = {
                id: id ?? "unknown",
                role: payload.role ?? undefined,
                ...payload,
            };
        }
        return next();
    }
    catch (err) {
        const e = err;
        const out = new Error(`Unauthorized: ${e.message}`);
        out.statusCode = 401;
        logger_1.logger.warn({ err }, "Authentication failed");
        return next(out);
    }
}
/**
 * Authorization middleware factory.
 * Usage: app.get('/admin', authenticate, authorize('admin'), handler)
 */
function authorize(...allowedRoles) {
    return (req, _res, next) => {
        const user = req.user;
        if (!user) {
            const err = new Error("Forbidden: no user");
            err.statusCode = 403;
            return next(err);
        }
        // If no roles provided, allow any authenticated user
        if (allowedRoles.length === 0)
            return next();
        const role = user.role ?? "user";
        if (!allowedRoles.includes(role)) {
            const err = new Error("Forbidden: insufficient role");
            err.statusCode = 403;
            return next(err);
        }
        return next();
    };
}
//# sourceMappingURL=authMiddleware.js.map