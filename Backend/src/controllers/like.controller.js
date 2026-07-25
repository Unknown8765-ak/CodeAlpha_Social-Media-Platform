import mongoose from "mongoose";
import { Like } from "../models/like.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleLike = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, "Invalid Post Id");
    }

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    const alreadyLiked = await Like.findOne({
        user: req.user._id,
        post: postId,
    });

    if (alreadyLiked) {

        await Like.findByIdAndDelete(alreadyLiked._id);

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Post unliked successfully"
            )
        );
    }

    await Like.create({
        user: req.user._id,
        post: postId,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {},
            "Post liked successfully"
        )
    );

});

const getPostLikes = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, "Invalid Post Id");
    }

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    const likesCount = await Like.countDocuments({
        post: postId,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            { likesCount },
            "Likes fetched successfully"
        )
    );

});

export {
    toggleLike,
    getPostLikes,
};