import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    toggleFollow,
    getFollowers,
    getFollowing,
} from "../controllers/follow.controller.js";

const router = Router();

router.route("/:userId").post(verifyJWT, toggleFollow);
router.route("/followers/:userId").get(getFollowers);
router.route("/following/:userId").get(getFollowing);

export default router;