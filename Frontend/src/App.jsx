import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLoader from "./routes/AuthLoader";



import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import SinglePost from "./pages/SinglePost";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import CreatePost from "./components/post/CreatePost";

const AppRoutes = () => {
    return (
        <AuthLoader>
        <Routes>

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>

                <Route element={<MainLayout />}>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/search"
                        element={<Search />}
                    />
                    <Route
                        path="/post/:postId"
                        element={<SinglePost />}
                    />
                    <Route
                        path="/edit-profile"
                        element={<EditProfile />}
                    />
                    <Route
                        path="/create-post"
                        element={<CreatePost/>}
                    />
                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                </Route>

            </Route>

        </Routes>
      </AuthLoader>
    );
};

export default AppRoutes;