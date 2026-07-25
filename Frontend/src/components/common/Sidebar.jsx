import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaUser,
    FaSearch,
    FaPlusSquare,
} from "react-icons/fa";

const Sidebar = () => {
    return (
        <aside className="w-64 min-h-[calc(100vh-64px)] bg-white border-r border-gray-200 shadow-sm">

            <nav className="flex flex-col gap-3 px-4 py-8">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200
                        ${
                            isActive
                                ? "bg-blue-600 text-white shadow"
                                : "hover:bg-gray-100 hover:text-blue-600"
                        }`
                    }
                >
                    <FaHome className="text-xl" />
                    <span>Home</span>
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200
                        ${
                            isActive
                                ? "bg-blue-600 text-white shadow"
                                : "hover:bg-gray-100 hover:text-blue-600"
                        }`
                    }
                >
                    <FaUser className="text-xl" />
                    <span>Profile</span>
                </NavLink>

                <NavLink
                    to="/search"
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200
                        ${
                            isActive
                                ? "bg-blue-600 text-white shadow"
                                : "hover:bg-gray-100 hover:text-blue-600"
                        }`
                    }
                >
                    <FaSearch className="text-xl" />
                    <span>Search</span>
                </NavLink>

                <NavLink
                    to="/create-post"
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200
                        ${
                            isActive
                                ? "bg-blue-600 text-white shadow"
                                : "hover:bg-gray-100 hover:text-blue-600"
                        }`
                    }
                >
                    <FaPlusSquare className="text-xl" />
                    <span>Create Post</span>
                </NavLink>

            </nav>

        </aside>
    );
};

export default Sidebar;