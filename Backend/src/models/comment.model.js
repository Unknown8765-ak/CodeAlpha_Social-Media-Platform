import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },

        comment: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
    },
    {
        timestamps: true,
    }
);

export const Comment = mongoose.model("Comment", commentSchema);