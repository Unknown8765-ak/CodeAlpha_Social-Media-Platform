import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        image: {
            type: String,
            required: true,
            trim: true,
        },

        caption: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export const Post = mongoose.model("Post", postSchema);