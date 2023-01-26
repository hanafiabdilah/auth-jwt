import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const Adminpanel = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.email
            ?
            <div id="adminpanel">
                <Outlet />
            </div>
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}