import { Router } from "express";
import { authmiddleware } from "../auth/auth_middleware.js";
import { requireRole } from "../../middleware/role_middleware.js";
import { postReviewController } from "./review_controller.js";

const reviewRouter = Router();

reviewRouter.post(
  "/reviews",
  authmiddleware,
  requireRole("customer"),
  postReviewController
);

export default reviewRouter;