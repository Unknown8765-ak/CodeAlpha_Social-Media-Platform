import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import { getFollowers } from "../../api/followApi";

const FollowersList = () => {

    const { user } = useSelector((state) => state.auth);

    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadFollowers = async () => {

        try {

            const res = await getFollowers(user._id);

            setFollowers(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (user?._id) {

            loadFollowers();

        }

    }, [user]);

    if (loading) {

        return (
            <div className="text-center py-5">
                Loading Followers...
            </div>
        );

    }

    if (followers.length === 0) {

        return (
            <div className="text-center py-5 text-gray-500">
                No Followers Yet
            </div>
        );

    }

    return (

        <div className="space-y-4">

            {followers.map((item) => (

                <UserCard
                    key={item._id}
                    user={item.follower}
                />

            ))}

        </div>

    );

};

export default FollowersList;