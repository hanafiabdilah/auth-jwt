import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import axios from "../api/axios";
import { useAuth } from "../hooks/useAuth"
import { useRefreshToken } from "../hooks/useRefreshToken";

export const Adminpanel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAccessToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyAccessToken() : setIsLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogout = async () => {
        try {
            await axios.delete('/logout', { withCredentials: true });
            setAuth({})
            navigate('/login')
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            {!isLoading && (auth?.email
                ? (
                    <div id="adminpanel">
                        <button onClick={handleLogout}>Logout</button>
                        <Outlet />
                    </div>
                )
                : <Navigate to="/login" state={{ from: location }} replace />)
            }
        </>
    )
}