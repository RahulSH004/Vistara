import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.statuscode).json({
            success: false,
            data: null,
            error: err.message,
        });
    }
    return res.status(500).json({
        success: false,
        data: null,
        error: "Internal Server Error",
    });
}