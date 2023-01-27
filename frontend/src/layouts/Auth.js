import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useRefreshToken } from "../hooks/useRefreshToken";

export const Auth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();
    const refresh = useRefreshToken();
    const location = useLocation();

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
    }, [])

    return (
        <>
            {!isLoading && (!auth?.email
                ? (
                    <div id="auth">
                        <Outlet />
                    </div>
                )
                : <Navigate to="/adminpanel" state={{ from: location }} replace />)
            }
        </>
    )
}