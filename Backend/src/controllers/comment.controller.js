import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, "Invalid Post ID");
    }

    if (!comment?.trim()) {
        throw new ApiError(400, "Comment is required");
    }

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    const createdComment = await Comment.create({
        owner: req.user._id,
        post: postId,
        comment: comment.trim(),
    });

    const populatedComment = await Comment.findById(createdComment._id)
        .populate("owner", "username fullName avatar");

    return res.status(201).json(
        new ApiResponse(201, populatedComment, "Comment added successfully")
    );
});

const getPostComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, "Invalid Post ID");
    }

    const comments = await Comment.find({ post: postId })
        .populate("owner", "username fullName avatar")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, comments, "Comments fetched successfully")
    );
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, "Invalid Comment ID");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    if (comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not allowed to delete this comment");
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Comment deleted successfully")
    );
});

export {
    addComment,
    getPostComments,
    deleteComment,
};

