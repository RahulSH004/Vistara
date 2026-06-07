import { Request, Response, NextFunction } from "express";
export declare function requireRole(...allowedRoles: Array<"admin" | "customer">): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=role_middleware.d.ts.map