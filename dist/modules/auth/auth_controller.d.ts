import { Request, Response } from "express";
export declare function register(req: Request, res: Response): Promise<void>;
export declare function login(req: Request, res: Response): Promise<void>;
export declare function logout(req: Request, res: Response): Promise<void>;
export declare function getMe(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth_controller.d.ts.map