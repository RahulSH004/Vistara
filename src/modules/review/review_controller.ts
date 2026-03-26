import { Request, Response, NextFunction } from "express";
import { reviewSchema } from "./review_schema.js";
import { postreviews } from "./review_service.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export async function postReviewController(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user;
    if (!user?.id) return next(new ApiError(401, "UNAUTHORIZED"));

    const parsed = reviewSchema.safeParse(req.body);
    if (!parsed.success) return next(new ApiError(400, parsed.error.message));

    const result = await postreviews(parsed.data, user.id);
    return res.status(201).json(new ApiResponse(result, null));
  } catch (err) {
    next(err);
  }
}