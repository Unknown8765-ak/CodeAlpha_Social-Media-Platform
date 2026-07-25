import CreatePost from "../components/post/CreatePost";
import PostList from "../components/post/PostList";
import FollowingList from "../components/post/FollowingList";

const Home = () => {
    return (
        <div className="max-w-2xl mx-auto space-y-6">

           <FollowingList/>

            <PostList />

        </div>
    );
};

export default Home;