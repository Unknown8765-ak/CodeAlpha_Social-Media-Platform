import { Router } from "express";
import { getCurrentUser, login, logout,registerUser,searchUsers,updateProfile } from "../controllers/auth.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/upload.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/logout").post(verifyJWT,logout)
router.route("/me").get(verifyJWT,getCurrentUser)
router.get("/search",verifyJWT,searchUsers);
router.patch("/profile",verifyJWT,upload.single("avatar"),updateProfile);


export default router