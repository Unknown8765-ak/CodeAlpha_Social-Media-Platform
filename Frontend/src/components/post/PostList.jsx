import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { getAllPosts } from "../../api/postApi";

const PostList = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPosts = async () => {

        try {

            const res = await getAllPosts();

            setPosts(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadPosts();

    }, []);

    if (loading) {

        return (
            <div className="text-center py-10">
                Loading Posts...
            </div>
        );

    }

    if (posts.length === 0) {

        return (
            <div className="text-center py-10 text-gray-500">
                No Posts Found
            </div>
        );

    }

    return (

        <div className="space-y-6">

            {posts.map((post) => (

                <PostCard
                    key={post._id}
                    post={post}
                />

            ))}

        </div>

    );

};

export default PostList;