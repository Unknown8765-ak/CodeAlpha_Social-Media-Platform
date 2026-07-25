import { useEffect, useState } from "react";
import { updatePost } from "../../api/postApi";

const EditPost = ({ open, setOpen, post }) => {

    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (post) {
            setCaption(post.caption);
        }

    }, [post]);

    if (!open) return null;

    const handleUpdate = async () => {

        try {

            setLoading(true);

            await updatePost(post._id, {
                caption,
            });

            alert("Post updated successfully");

            setOpen(false);

            // Baad me yaha post state bhi update karenge

        } catch (error) {

            console.log(error);

            alert(error.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl p-6 w-full max-w-lg">

                <h2 className="text-2xl font-bold mb-5">
                    Edit Post
                </h2>

                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    rows={5}
                    className="w-full border rounded-lg p-3 resize-none outline-none"
                />

                <div className="flex justify-end gap-3 mt-5">

                    <button
                        onClick={() => setOpen(false)}
                        disabled={loading}
                        className="px-5 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:bg-gray-400"
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>

                </div>

            </div>

        </div>

    );
};

export default EditPost;