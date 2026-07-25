import { useState } from "react";
import { useSelector } from "react-redux";
import { FaImage, FaTimes } from "react-icons/fa";
import { createPost } from "../../api/postApi";

const CreatePost = () => {

    const { user } = useSelector((state) => state.auth);

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));

    };

    const removeImage = () => {

        setImage(null);
        setPreview("");

    };

    const handleSubmit = async () => {

        if (!image) {
            alert("Please select an image.");
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("caption", caption);
            formData.append("image", image);

            await createPost(formData);

            setCaption("");
            removeImage();

            alert("Post created successfully");

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">

            <div className="flex items-center gap-4 mb-6">

                <img
                    src={user?.avatar || "https://placehold.co/50"}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />

                <div>

                    <h3 className="font-semibold text-gray-800">
                        {user?.username}
                    </h3>

                    <p className="text-sm text-gray-500">
                        Share something with your friends
                    </p>

                </div>

            </div>

            <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                maxLength={500}
                placeholder="What's on your mind?"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 resize-none outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
            />

            <div className="flex justify-end mt-2">

                <span className="text-xs text-gray-400">
                    {caption.length}/500
                </span>

            </div>

            {preview && (

                <div className="relative mt-5">

                    <img
                        src={preview}
                        alt=""
                        className="rounded-2xl w-full max-h-96 object-cover border border-gray-200"
                    />

                    <button
                        onClick={removeImage}
                        type="button"
                        className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2"
                    >
                        <FaTimes />
                    </button>

                </div>

            )}

            <div className="flex items-center justify-between mt-5">

                <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer font-medium">

                    <FaImage />

                    Add Photo

                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />

                </label>

                <button
                    onClick={handleSubmit}
                    disabled={!image || loading}
                    className="px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {loading ? "Posting..." : "Post"}
                </button>

            </div>

        </div>

    );

};

export default CreatePost;