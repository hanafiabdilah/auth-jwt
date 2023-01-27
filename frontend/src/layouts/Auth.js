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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {!isLoading && (!auth?.email
                ? (
                    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
                        <div className="hero-body">
                            <div className="container">
                                <div className="columns is-centered">
                                    <div className="column is-4">
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
                : <Navigate to="/adminpanel" state={{ from: location }} replace />)
            }
        </>
    )
}