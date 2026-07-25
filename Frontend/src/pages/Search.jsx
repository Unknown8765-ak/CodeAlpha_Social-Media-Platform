import { useState } from "react";
import SearchBar from "../components/user/SearchBar";
import UserCard from "../components/user/UserCard";

const Search = () => {

    const [users, setUsers] = useState([]);

    return (

        <div className="space-y-6">

            <SearchBar
                onResults={setUsers}
            />

            {users.map((user) => (

                <UserCard
                    key={user._id}
                    user={user}
                />

            ))}

        </div>

    );

};

export default Search;