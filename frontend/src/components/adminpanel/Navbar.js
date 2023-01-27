import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios';
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate()

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
        <nav
            className="navbar is-light"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img
                            src="https://bulma.io/images/bulma-logo.png"
                            width="112"
                            height="28"
                            alt=""
                        />
                    </a>

                    <button
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/adminpanel" className="navbar-item">Home</Link>
                        <Link to="/adminpanel/users" className="navbar-item">Users</Link>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={handleLogout} className="button is-light">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
