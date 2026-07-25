import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createPost = asyncHandler(async (req, res) => {

    const { caption } = req.body;

    if (!req.file) {
        throw new ApiError(400, "Post image is required");
    }
    const image = req.file.path;

    const post = await Post.create({
        owner: req.user._id,
        image,
        caption,
    });

    const createdPost = await Post.findById(post._id)
        .populate("owner", "username fullName avatar");

    return res.status(201).json(
        new ApiResponse(
            201,
            createdPost,
            "Post created successfully"
        )
    );
});

const getAllPosts = asyncHandler(async (req, res) => {

    const posts = await Post.find()
        .populate("owner", "username fullName avatar")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            posts,
            "Posts fetched successfully"
        )
    );
});


const getPostById = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, "Invalid Post Id");
    }

    const post = await Post.findById(postId)
        .populate("owner", "username fullName avatar");

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            post,
            "Post fetched successfully"
        )
    );
});

const updatePost = asyncHandler(async (req, res) => {

    const { postId } = req.params;
    const { caption } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, "Invalid Post Id");
    }

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (post.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    post.caption = caption ?? post.caption;

    await post.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            post,
            "Post updated successfully"
        )
    );
});

const deletePost = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, "Invalid Post Id");
    }

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (post.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Post deleted successfully"
        )
    );
});

const getUserPosts = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid User Id");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const posts = await Post.find({
        owner: userId,
    })
        .populate("owner", "username fullName avatar")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            posts,
            "User posts fetched successfully"
        )
    );
});

export {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getUserPosts,
};