import type { Response, NextFunction } from "express";
import { AuthRequest } from "../commons/types";
export declare function authenticate(req: AuthRequest, _res: Response, next: NextFunction): Promise<void>;
/**
 * Authorization middleware factory.
 * Usage: app.get('/admin', authenticate, authorize('admin'), handler)
 */
export declare function authorize(...allowedRoles: string[]): (req: AuthRequest, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map