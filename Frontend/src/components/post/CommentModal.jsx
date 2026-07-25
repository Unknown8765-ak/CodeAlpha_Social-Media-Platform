import CommentSection from "./CommentSection";
import AddComment from "./AddComment";
import { FaTimes } from "react-icons/fa";

const CommentModal = ({ open, onClose, post }) => {
    const [comments, setComments] = useState([]);

    const handleAddComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
};

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-5">

            <div className="bg-white w-full max-w-6xl h-[90vh] rounded-3xl overflow-hidden flex shadow-2xl">


                <div className="w-1/2 bg-black">

                    <img
                        src={post.image}
                        alt=""
                        className="w-full h-full object-cover"
                    />

                </div>

              

                <div className="w-1/2 flex flex-col">

                   

                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">

                        <div className="flex items-center gap-3">

                            <img
                                src={post.owner.avatar}
                                alt=""
                                className="w-11 h-11 rounded-full object-cover border border-gray-200"
                            />

                            <span className="font-semibold">
                                {post.owner.username}
                            </span>

                        </div>

                        <button onClick={onClose}>
                            <FaTimes size={22} />
                        </button>

                    </div>

                   

                    <div className="flex-1 overflow-y-auto px-6 py-5 bg-gray-50">

                    <CommentSection
                        postId={post._id}
                        comments={comments}
                        setComments={setComments}
                    />

                    </div>

                    

                    <div className="border-t p-4">

                        <AddComment
                        postId={post._id}
                        onAddComment={(newComment) =>
                            setComments((prev) => [newComment, ...prev])
                        }
                    />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CommentModal;