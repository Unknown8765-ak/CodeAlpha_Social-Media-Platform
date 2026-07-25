import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser,loginUser } from "../../api/authApi.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
    await logoutUser();

    dispatch(logout());

    navigate("/login");
};

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

              

                <Link
                    to="/"
                    className="text-3xl font-extrabold tracking-tight text-blue-600 hover:text-blue-700 transition-colors"
                >
                    SocialApp
                </Link>

               

                <div className="flex items-center gap-5">

                    {user && (
                        <>
                            <div className="hidden sm:flex flex-col items-end leading-tight">

                                <span className="font-semibold text-gray-800">
                                    @{user.username}
                                </span>

                                <span className="text-xs text-gray-500">
                                    Welcome Back 👋
                                </span>

                            </div>

                            <img
                                src={user.avatar || "https://placehold.co/40x40"}
                                alt={user.username}
                                className="w-11 h-11 rounded-full object-cover border-2 border-blue-500 shadow-sm cursor-pointer hover:scale-105 transition-transform duration-200"
                            />
                        </>
                    )}

                    <div className="flex items-center gap-5">

    {user ? (
        <>
            <div className="hidden sm:flex flex-col items-end leading-tight">

                <span className="font-semibold text-gray-800">
                    @{user.username}
                </span>

                <span className="text-xs text-gray-500">
                    Welcome Back 👋
                </span>

            </div>

            <img
                src={user.avatar || "https://placehold.co/40x40"}
                alt={user.username}
                className="w-11 h-11 rounded-full object-cover border-2 border-blue-500 shadow-sm cursor-pointer hover:scale-105 transition-transform duration-200"
            />

            <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 active:scale-95 transition-all duration-200"
            >
                Logout
            </button>
        </>
    ) : (
        <div className="flex items-center gap-3">

            <Link
                to="/login"
                className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
            >
                Login
            </Link>

            <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
                Register
            </Link>

        </div>
    )}

</div>

                </div>

            </div>
        </header>
    );
};

export default Navbar;