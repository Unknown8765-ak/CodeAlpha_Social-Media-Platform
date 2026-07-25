import { Router } from "express";
import { createPost,getAllPosts,updatePost,deletePost,getUserPosts ,getPostById} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router()

router.route("/")
.post(
    verifyJWT,
    upload.single("image"),
    createPost
)
.get(getAllPosts);

router.route("/:postId")
.get(getPostById)
.patch(
    verifyJWT,
    updatePost
)
.delete(
    verifyJWT,
    deletePost
);

router.route("/user/:userId")
.get(getUserPosts);

export default router;