import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
    getUserProfile,
    updateProfile,
    updateAvatar,
    searchUsers,
    getSuggestedUsers,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/profile/:username", verifyJWT, getUserProfile);

router.patch(
    "/update-profile",
    verifyJWT,
    updateProfile
);

router.patch(
    "/update-avatar",
    verifyJWT,
    upload.single("avatar"),
    updateAvatar
);

router.get(
    "/search",
    verifyJWT,
    searchUsers
);

router.get(
    "/suggestions",
    verifyJWT,
    getSuggestedUsers
);

export default router;