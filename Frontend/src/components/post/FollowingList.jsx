import UserCard from "../user/UserCard";

const users = [
    {
        _id: "3",
        username: "alex",
        fullName: "Alex Johnson",
        avatar: "https://placehold.co/50",
        isFollowing: true,
    },
    {
        _id: "4",
        username: "emma",
        fullName: "Emma Watson",
        avatar: "https://placehold.co/50",
        isFollowing: true,
    },
];

const FollowingList = () => {
    return (
        <div className="space-y-4">

            {users.map((user) => (

                <UserCard
                    key={user._id}
                    user={user}
                />

            ))}

        </div>
    );
};

export default FollowingList;