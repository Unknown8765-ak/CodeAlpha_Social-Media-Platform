import mongoose from "mongoose";
import { Follow } from "../models/follow.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const toggleFollow = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid User Id");
    }

    if (req.user._id.toString() === userId) {
        throw new ApiError(400, "You cannot follow yourself");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const alreadyFollowing = await Follow.findOne({
        follower: req.user._id,
        following: userId,
    });

    if (alreadyFollowing) {

        await Follow.findByIdAndDelete(alreadyFollowing._id);

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "User unfollowed successfully"
            )
        );
    }

    await Follow.create({
        follower: req.user._id,
        following: userId,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {},
            "User followed successfully"
        )
    );

});

export const getFollowers = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid User Id");
    }

    const followers = await Follow.find({
        following: userId,
    }).populate(
        "follower",
        "username fullName avatar"
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            followers,
            "Followers fetched successfully"
        )
    );

});

export const getFollowing = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid User Id");
    }

    const following = await Follow.find({
        follower: userId,
    }).populate(
        "following",
        "username fullName avatar"
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            following,
            "Following fetched successfully"
        )
    );

});