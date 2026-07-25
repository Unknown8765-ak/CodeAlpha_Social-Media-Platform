import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Follow } from "../models/follow.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getUserProfile = asyncHandler(async (req, res) => {

    const { username } = req.params;

    const user = await User.findOne({ username })
        .select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const postsCount = await Post.countDocuments({
        owner: user._id
    });

    const followersCount = await Follow.countDocuments({
        following: user._id
    });

    const followingCount = await Follow.countDocuments({
        follower: user._id
    });

    const isFollowing = await Follow.exists({
        follower: req.user?._id,
        following: user._id
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user,
                postsCount,
                followersCount,
                followingCount,
                isFollowing: !!isFollowing
            },
            "Profile fetched successfully"
        )
    );

});

export const updateProfile = asyncHandler(async (req, res) => {

    const { fullName, bio } = req.body;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                fullName,
                bio
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Profile updated successfully"
        )
    );

});

import {uploadoncloudinary} from "../utils/cloudinary.js"
export const updateAvatar = asyncHandler(async (req, res) => {

    if (!req.file) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(req.file.path);

    if (!avatar) {
        throw new ApiError(500, "Avatar upload failed");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                avatar: avatar.secure_url
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Avatar updated successfully"
        )
    );

});

export const searchUsers = asyncHandler(async (req, res) => {

    const { keyword } = req.query;

    const users = await User.find({
        username: {
            $regex: keyword,
            $options: "i"
        }
    }).select(
        "username fullName avatar"
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users fetched successfully"
        )
    );

});

export const getSuggestedUsers = asyncHandler(async (req, res) => {

    const following = await Follow.find({
        follower: req.user._id
    }).select("following");

    const followingIds = following.map(
        (item) => item.following
    );

    const users = await User.find({
        _id: {
            $nin: [
                ...followingIds,
                req.user._id
            ]
        }
    })
    .select("username fullName avatar")
    .limit(10);

    return res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Suggested users fetched successfully"
        )
    );

});