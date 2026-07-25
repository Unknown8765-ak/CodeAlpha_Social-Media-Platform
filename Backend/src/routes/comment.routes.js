import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addComment,
    getPostComments,
    deleteComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.post("/:postId", verifyJWT, addComment);
router.get("/:postId", getPostComments);
router.delete("/:commentId", verifyJWT, deleteComment);

export default router;