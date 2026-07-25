const CommentCard = ({ comment }) => {

    return (

        <div className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition">

            <img
                src={comment.owner.avatar}
                alt=""
                className="w-11 h-11 rounded-full object-cover border border-gray-200"
            />

            <div className="flex-1">

                <div className="flex items-center gap-2">

                    <span className="font-semibold text-gray-800">
                        {comment.owner.username}
                    </span>

                    <span className="text-xs text-gray-400">
                        •
                    </span>

                    <span className="text-xs text-gray-500">
                        {comment.createdAt}
                    </span>

                </div>

                <p className="mt-1 text-gray-700 leading-relaxed wrap-break-word">
                    {comment.comment}
                </p>

            </div>

        </div>

    );
};

export default CommentCard;