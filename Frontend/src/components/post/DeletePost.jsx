import { useState } from "react";
import { deletePost } from "../../api/postApi";

const DeletePost = ({ open, setOpen, post }) => {

    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleDelete = async () => {

        try {

            setLoading(true);

            await deletePost(post._id);

            alert("Post deleted successfully");

            setOpen(false);

            // Baad me yaha feed refresh ya state update karenge

        } catch (error) {

            console.log(error);

            alert(error.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl p-6 w-full max-w-sm">

                <h2 className="text-xl font-bold">
                    Delete Post
                </h2>

                <p className="mt-3 text-gray-600">
                    Are you sure you want to delete this post?
                </p>

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={() => setOpen(false)}
                        disabled={loading}
                        className="border px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default DeletePost;