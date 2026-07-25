import ProfileCard from "../components/user/ProfileCard";
import PostList from "../components/post/PostList";

const Profile = () => {
    return (
        <div className="space-y-8">

            <ProfileCard />

            <div>
                <h2 className="text-2xl font-bold mb-5">
                    Posts
                </h2>
                <PostList />

            </div>

        </div>
    );
};

export default Profile;