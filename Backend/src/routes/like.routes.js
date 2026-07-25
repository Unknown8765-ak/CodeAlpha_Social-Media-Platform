import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    toggleLike,
    getPostLikes,
} from "../controllers/like.controller.js";

const router = Router();

router.route("/:postId")
.post(verifyJWT, toggleLike)
.get(getPostLikes);

export default router;