import { useState } from "react";
import { toggleFollow } from "../../api/followApi";

const FollowButton = ({ userId,
    isFollowing = false, }) => {

    const [following, setFollowing] = useState(isFollowing);

    const handleFollow = async () => {

    try {
        await toggleFollow(userId);
        setFollowing((prev) => !prev);
    } catch (error) {

        console.log(error);

    }

};
    return (
        <button
            onClick={handleFollow}
            className={`px-5 py-2 rounded-lg font-medium transition
            ${
                following
                    ? "bg-gray-200 text-black hover:bg-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
            {following ? "Following" : "Follow"}
        </button>
    );
};

export default FollowButton;