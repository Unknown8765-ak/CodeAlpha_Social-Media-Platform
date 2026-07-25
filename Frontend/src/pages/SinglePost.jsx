import { FaHeart, FaRegComment } from "react-icons/fa";
import CommentSection from "../components/post/AddComment";
import AddComment from "../components/post/AddComment";
import LikeButton from "../components/post/LikeButton";

const post = {
    username: "rahul",
    avatar: "https://placehold.co/50",
    image: "https://placehold.co/800x500",
    caption: "Beautiful Sunset ❤️"
};

const SinglePost = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow overflow-hidden">

            <img
                src={post.image}
                alt=""
                className="w-full max-h-125 object-cover"
            />

            <div className="p-6">

                <div className="flex items-center gap-3">

                    <img
                        src={post.avatar}
                        alt=""
                        className="w-12 h-12 rounded-full"
                    />

                    <div>
                        <h2 className="font-semibold">
                            {post.username}
                        </h2>
                    </div>

                </div>

                <p className="mt-4">
                    {post.caption}
                </p>

                <div className="flex gap-6 mt-5 text-xl">

                    <LikeButton
    isLiked={post.isLiked}
    likesCount={post.likesCount}
/>

                    <button>
                        <FaRegComment />
                    </button>

                </div>

                <AddComment />

                <CommentSection />

            </div>

        </div>
    );
};

export default SinglePost;