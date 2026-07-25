import { useState } from "react";
import { useSelector } from "react-redux";
import { FaPaperPlane } from "react-icons/fa";
import { addComment } from "../../api/commentApi";

const AddComment = ({ postId, onAddComment }) => {

    const { user } = useSelector((state) => state.auth);

    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!comment.trim()) return;

        try {
            setLoading(true);
            const res = await addComment(postId, {
                comment,
            });
            if (onAddComment) {
                onAddComment(res.data);
            }
            setComment("");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    };

    return (

        <div className="bg-white border-t border-gray-200 p-4">

            <form
                onSubmit={handleSubmit}
                className="flex items-start gap-3"
            >

                <img
                    src={user?.avatar || "https://placehold.co/50"}
                    alt=""
                    className="w-11 h-11 rounded-full object-cover border border-gray-200"
                />

                <div className="flex-1">

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={2}
                        maxLength={300}
                        placeholder="Add a comment..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />

                    <div className="flex items-center justify-between mt-3">

                        <span className="text-xs text-gray-400">
                            {comment.length}/300
                        </span>

                        <button
                            type="submit"
                            disabled={!comment.trim() || loading}
                            className="flex items-center gap-2 bg-blue-600 text-white font-medium px-5 py-2 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-300"
                        >
                            <FaPaperPlane className="text-sm" />

                            {loading ? "Posting..." : "Post"}

                        </button>

                    </div>

                </div>

            </form>

        </div>

    );
};

export default AddComment;