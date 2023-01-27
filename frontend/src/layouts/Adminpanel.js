import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/adminpanel/Navbar";
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {!isLoading && (auth?.email
                ? (
                    <div id="adminpanel">
                        <Navbar />
                        <main className="hero">
                            <div className="hero-body">
                                <Outlet />
                            </div>
                        </main>
                    </div>
                )
                : <Navigate to="/login" state={{ from: location }} replace />)
            }
        </>
    )
}