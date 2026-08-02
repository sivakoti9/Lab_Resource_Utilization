import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles = [] }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // User not logged in
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Check role only if allowedRoles are provided
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(role)
    ) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;