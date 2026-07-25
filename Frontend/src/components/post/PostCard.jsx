import {
    FaHeart,
    FaRegHeart,
    FaRegComment,
    FaEllipsisH,
} from "react-icons/fa";
import MoreMenu from "../common/MoreMenu";
import LikeButton from "./LikeButton";
import { useState } from "react";
import CommentModal from "./CommentModal";

const PostCard = ({ post }) => {

    const [openComment, setOpenComment] = useState(false);


    return (
        <>
        <div className="bg-white rounded-xl shadow border overflow-hidden">

           

            <div className="flex items-center justify-between p-4">

                <div className="flex items-center gap-3">

                    <img
                        src={post.owner.avatar}
                        alt={post.owner.username}
                        className="w-11 h-11 rounded-full object-cover"
                    />

                    <div>
                        <h3 className="font-semibold">
                            {post.owner.username}
                        </h3>

                        <p className="text-xs text-gray-500">
                            {post.createdAt}
                        </p>
                    </div>

                </div>

                <MoreMenu post={post} />

            </div>


            <img
                src={post.image}
                alt=""
                className="w-full max-h-150 object-cover"
            />

            

            <div className="p-4">

                <div className="flex items-center gap-5 text-2xl">

                   <LikeButton
                        postId={post._id}
                        isLiked={post.isLiked}
                        likesCount={post.likesCount}
                    />
                    <button onClick={() => setOpenComment(true)}>
                        <FaRegComment />
                    </button>

                </div>

       

                <div className="mt-3 text-sm font-medium">

                    {post.likesCount} Likes

                </div>

               

                <p className="mt-2">

                    <span className="font-semibold mr-2">
                        {post.owner.username}
                    </span>

                    {post.caption}

                </p>

               

                <button className="mt-3 text-sm text-gray-500">

                    View all {post.commentsCount} comments

                </button>

            </div>

        </div>
        <CommentModal
    open={openComment}
    onClose={() => setOpenComment(false)}
    post={post}
/>
        </>
        
        
    );
    
};

export default PostCard;