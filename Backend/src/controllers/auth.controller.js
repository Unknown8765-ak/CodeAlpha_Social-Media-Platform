import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        // console.log("USER 👉", user)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        // console.log("ACCESS", accessToken)
        // console.log("REFRESH", refreshToken)

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {


    const {
    username,
    fullName,
    email,
    password,
    bio,
} = req.body

    if (
       [username,fullName,email,password,bio].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
    $or: [
        { email },
        { username }
    ]
});
    if (existedUser) {
        throw new ApiError(409, "User already exists with this email")
    }
 
    const avatarLocalPath = req.files?.avatar[0]?.path;

    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
    

    const user = await User.create({
    username,
    fullName,
    email,
    password,
    bio,
    avatar : avatar.url
})

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )


const login = asyncHandler(async (req,res)=>{


    const { email , password } = req.body

    if (!email || !password) {
        throw new ApiError(409, "Email and password is required");
    }
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
        throw new ApiError(404 , "user not found");
    }
    // console.log(existedUser)
    
   const isPasswordCorrect =
    await existedUser.isPasswordCorrect(password);

if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
}

    const { accessToken , refreshToken } = await generateAccessAndRefereshTokens(existedUser._id)
//     console.log("ACCESS", accessToken)
// console.log("REFRESH", refreshToken)
    const loggedInUser = await User.findOne({email}).select(
        "-password -refreshToken"
    )

    const options  = {
        httpOnly : true,
        secure : false,
        sameSite : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    return res.status(200)
    .cookie("accessToken" , accessToken , {...options , maxAge : 15 * 60 * 1000})
    .cookie("refreshToken" , refreshToken , options)
    .json(
        new ApiResponse(200 , 
            {
                user : loggedInUser , accessToken , refreshToken

            },
             "User Logged In successfully")
    )
})

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      returnDocument: "after",
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout successfully"));
});
const getCurrentUser = asyncHandler(async (req , res)=>{
    if (!req.user) {
        throw new ApiError(401 , "Unauthorized ")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "User fetch successfully"
        )
    )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
    httpOnly:true,
    secure:false,
    sameSite:"lax"
}
    
        const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: refreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const searchUsers = asyncHandler(async (req, res) => {

    const { query } = req.query;

    if (!query?.trim()) {
        throw new ApiError(400, "Search query is required");
    }

    const users = await User.find({
        username: {
            $regex: query,
            $options: "i",
        },
    })
        .select("-password -refreshToken")
        .limit(20);

    return res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users fetched successfully"
        )
    );

});

const updateProfile = asyncHandler(async (req, res) => {

    const { username, fullName, bio } = req.body;

    const avatarLocalPath = req.file?.path;

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (username && username !== user.username) {

        const existedUser = await User.findOne({
            username: username.toLowerCase(),
        });

        if (existedUser) {
            throw new ApiError(409, "Username already exists");
        }

        user.username = username.toLowerCase();

    }

    if (fullName) {
        user.fullName = fullName;
    }

    if (bio !== undefined) {
        user.bio = bio;
    }

    if (avatarLocalPath) {

        const uploadedAvatar = await uploadOnCloudinary(
            avatarLocalPath
        );

        if (!uploadedAvatar?.url) {
            throw new ApiError(500, "Avatar upload failed");
        }

        user.avatar = uploadedAvatar.url;

    }

    await user.save();

    const updatedUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedUser,
            "Profile updated successfully"
        )
    );

});

export {
    registerUser,
    login,
    logout,
    getCurrentUser,
    refreshAccessToken,
    updateProfile,
    searchUsers
}