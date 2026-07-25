import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import EditPost from "../post/EditPost";
import DeletePost from "../post/DeletePost";

const MoreMenu = ({ post }) => {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <div className="relative">

            <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition duration-200"
            >
                <FaEllipsisH className="text-gray-600 text-lg" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden z-50">

                    <button
                        onClick={() => {
                            setEditOpen(true);
                            setOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-gray-700 font-medium hover:bg-gray-100 transition duration-200"
                    >
                         Edit Post
                    </button>

                    <button
                        onClick={() => {
                            setDeleteOpen(true);
                            setOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-red-600 font-medium hover:bg-red-50 transition duration-200"
                    >
                        Delete Post
                    </button>

                </div>
            )}

            <EditPost
                open={editOpen}
                setOpen={setEditOpen}
                post={post}
            />

            <DeletePost
                open={deleteOpen}
                setOpen={setDeleteOpen}
                post={post}
            />

        </div>
    );
};

export default MoreMenu;