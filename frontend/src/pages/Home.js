import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className="hero">
            <div className="hero-body">
                <div className="box">
                    <h1 className="title">JWT Authentication ReactJS</h1>
                    <hr />
                    <ul>
                        <li>
                            <Link to="/adminpanel" className="is-size-2">Adminpanel <span className="is-size-7">* Login is required</span></Link>
                        </li>
                        <li>
                            <Link to="/login" className="is-size-2">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="is-size-2">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}