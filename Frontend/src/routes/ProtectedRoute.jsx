

import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
  const { status,loading } = useSelector((state) => state.auth)
    console.log("AUTH STATE 👉", status, "LOADING 👉", loading);

  if (loading) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-blue-600"></div>

      <p className="mt-4 text-gray-600 font-medium">
        Checking authentication...
      </p>
    </div>
  );
}

  if (!status) {
    console.log("AUTH STATE 👉", status, "LOADING 👉", loading);

    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export default ProtectedRoute
