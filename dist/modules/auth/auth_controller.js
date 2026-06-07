import { registerUser, loginUser, logoutuser } from "./auth_service.js";
import { ApiError } from "../../utils/ApiError.js";
export async function register(req, res) {
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An error occurred during registration" });
        }
    }
}
export async function login(req, res) {
    try {
        const result = await loginUser(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An error occurred during login" });
        }
    }
}
export async function logout(req, res) {
    try {
        await logoutuser(req.body);
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An error occurred during logout" });
        }
    }
}
export async function getMe(req, res) {
    if (!req.user) {
        throw new ApiError(401, "Not Authenticated");
    }
    const { password, ...notpassword } = req.user;
    return res.status(200).json({
        user: notpassword,
    });
}
//# sourceMappingURL=auth_controller.js.map