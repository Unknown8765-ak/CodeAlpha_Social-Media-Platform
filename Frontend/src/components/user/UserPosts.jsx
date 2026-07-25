import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserPosts } from "../../api/postApi";

const UserPosts = () => {

    const { user } = useSelector((state) => state.auth);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPosts = async () => {

        try {
            const res = await getUserPosts(user._id);
            setPosts(res.data);
        } catch (error) {
            console.log(error);
        } finally {
        setLoading(false);
        }

    };

    useEffect(() => {
        if (user?._id) {
            loadPosts();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="text-center py-10 text-gray-500">
                Loading Posts...
            </div>
        );

    }

    return (

        <div>

            <h2 className="text-2xl font-bold mb-5">
                Posts
            </h2>

            {posts.length === 0 ? (

                <div className="text-center text-gray-500 py-10">
                    No Posts Yet
                </div>

            ) : (

                <div className="grid grid-cols-3 gap-5">

                    {posts.map((post) => (

                        <img
                            key={post._id}
                            src={post.image}
                            alt="Post"
                            className="rounded-lg object-cover aspect-square hover:scale-105 transition"
                        />

                    ))}

                </div>

            )}

        </div>

    );

};

export default UserPosts;