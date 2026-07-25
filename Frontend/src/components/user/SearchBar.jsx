import { useEffect, useState } from "react";
import { searchUsers } from "../../api/authApi";

const SearchBar = ({ onResults }) => {

    const [query, setQuery] = useState("");

    useEffect(() => {

        const timer = setTimeout(async () => {
            if (!query.trim()) {
                onResults([]);
                return;
                }
            try {
                const res = await searchUsers(query);
                onResults(res.data);
            } catch (error) {
                console.log(error);
            }
        }, 400);

        return () => clearTimeout(timer);

    }, [query]);

    return (
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

    );

};

export default SearchBar;