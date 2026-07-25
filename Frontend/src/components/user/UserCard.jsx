import FollowButton from "./FollowButton";

const UserCard = ({ user }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">

            <div className="flex items-center gap-3">

                <img
                    src={user.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                />

                <div>

                    <h3 className="font-semibold">
                        {user.username}
                    </h3>

                    <p className="text-gray-500 text-sm">
                        {user.fullName}
                    </p>

                </div>

            </div>

            <FollowButton
    userId={user._id}
    isFollowing={user.isFollowing}
/>

        </div>
    );
};

export default UserCard;