import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="mx-auto flex">

                <Sidebar />

                <main className="flex-1 p-6">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default MainLayout;