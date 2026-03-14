import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDetails } from "@/store/slices/userSlice";

const ProtectedRoute = ({ allowedRoles }) => {
    const userDetails = useSelector(selectDetails);

    // Not logged in
    if (!userDetails) {
        return <Navigate to="/signin/" replace />;
    }

    // Logged in but wrong role
    if (allowedRoles && !allowedRoles.includes(userDetails.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;