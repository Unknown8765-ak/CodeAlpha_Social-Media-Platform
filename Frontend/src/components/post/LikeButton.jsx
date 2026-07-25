import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleLike } from "../../api/likeApi";

const LikeButton = ({ postId, isLiked, likesCount }) => {

    const [liked, setLiked] = useState(isLiked);
    const [likes, setLikes] = useState(likesCount);
    const [loading, setLoading] = useState(false);

    const handleLike = async () => {

        if (loading) return;

        try {

            setLoading(true);

            if (liked) {

                setLiked(false);
                setLikes((prev) => prev - 1);

            } else {

                setLiked(true);
                setLikes((prev) => prev + 1);

            }

            await toggleLike(postId);

        } catch (error) {

            console.log(error);

            // Rollback UI

            if (liked) {

                setLiked(true);
                setLikes((prev) => prev + 1);

            } else {

                setLiked(false);
                setLikes((prev) => prev - 1);

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <button
            onClick={handleLike}
            disabled={loading}
            className="flex items-center gap-2"
        >

            {liked ? (

                <FaHeart
                    className="text-red-500 text-2xl transition-transform duration-200 hover:scale-125"
                />

            ) : (

                <FaRegHeart
                    className="text-2xl transition-transform duration-200 hover:scale-125"
                />

            )}

            <span className="font-medium">
                {likes}
            </span>

        </button>

    );
};

export default LikeButton;