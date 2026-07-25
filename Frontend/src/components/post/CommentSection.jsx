import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getPostComments } from "../../api/commentApi";

const CommentSection = ({ postId, comments, setComments }) => {

    const [loading, setLoading] = useState(true);

    const loadComments = async () => {

        try {

            const res = await getPostComments(postId);

            setComments(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (postId) {

            loadComments();

        }

    }, [postId]);

    if (loading) {

        return (
            <div className="text-center py-4 text-gray-500">
                Loading comments...
            </div>
        );

    }

    if (comments.length === 0) {

        return (
            <div className="text-center py-4 text-gray-500">
                No comments yet.
            </div>
        );

    }

    return (

        <div className="space-y-2">

            {comments.map((comment) => (

                <CommentCard
                    key={comment._id}
                    comment={comment}
                />

            ))}

        </div>

    );

};

export default CommentSection;