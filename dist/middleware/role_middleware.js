import { ApiError } from "../utils/ApiError.js";
export function requireRole(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return next(new ApiError(401, "UnAuthrized"));
        }
        if (!allowedRoles.includes(user.role)) {
            return next(new ApiError(403, "Forbidden"));
        }
        next();
    };
}
//# sourceMappingURL=role_middleware.js.map