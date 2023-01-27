import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useRefreshToken } from "../hooks/useRefreshToken";

export const Adminpanel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
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

    useEffect(() => {
        console.log('isloading', isLoading);
        console.log('aT', auth?.accessToken);
    }, [auth])


    return (
        <>
            {!isLoading && (auth?.email
                ? (
                    <div id="adminpanel">
                        <Outlet />
                    </div>
                )
                : <Navigate to="/login" state={{ from: location }} replace />)
            }
        </>
    )
}