import "dotenv/config";
import { Request, Response, NextFunction } from 'express';
export declare const authmiddleware: (req: Request, res: Response, nxt: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=auth_middleware.d.ts.map