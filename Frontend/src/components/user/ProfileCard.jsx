import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserPosts } from "../../api/postApi";
import { getFollowers, getFollowing } from "../../api/followApi";

const ProfileCard = () => {

    const { user } = useSelector((state) => state.auth);
    const [postsCount, setPostsCount] = useState(0);
const [followersCount, setFollowersCount] = useState(0);
const [followingCount, setFollowingCount] = useState(0);

    const loadProfile = async () => {

        const [posts, followers, following] = await Promise.all([
            getUserPosts(user._id),
            getFollowers(user._id),
            getFollowing(user._id),
        ]);

            setPostsCount(posts.data.length);
            setFollowersCount(followers.data.length);
            setFollowingCount(following.data.length);

    };
    useEffect(() => {
        if (user?._id) {
            loadProfile();
        }
    }, [user]);



    return (

        <div className="bg-white rounded-xl shadow p-8 flex gap-8">

            <img
                src={user?.avatar || "https://placehold.co/150"}
                alt=""
                className="w-36 h-36 rounded-full object-cover border"
            />

            <div className="flex-1">

                <h2 className="text-3xl font-bold">
                    {user?.username}
                </h2>

                <h3 className="text-lg text-gray-600 mt-1">
                    {user?.fullName}
                </h3>

                <p className="mt-4 text-gray-700">
                    {user?.bio || "No bio yet"}
                </p>

                <div className="flex gap-8 mt-6">

                    <div>
                        <h4 className="font-bold text-xl">
                            {postsCount}
                        </h4>

                        <p className="text-gray-500">
                            Posts
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-xl">
                           {followersCount}
                        </h4>

                        <p className="text-gray-500">
                            Followers
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-xl">
                           {followingCount}
                        </h4>

                        <p className="text-gray-500">
                            Following
                        </p>
                    </div>

                </div>

               <Link
                    to="/edit-profile"
                    className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                    Edit Profile
                </Link>

            </div>

        </div>

    );
};

export default ProfileCard;