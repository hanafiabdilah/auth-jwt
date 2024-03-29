import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';

import axios from '../../api/axios';
import jwtDecode from 'jwt-decode';
import { Alert } from '../../components/Alert';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/adminpanel';

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const Login = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/login',
        { email, password, },
        { withCredentials: true }
      )
      const decode = jwtDecode(response?.data?.accessToken);
      setAuth({ ...decode, accessToken: response?.data?.accessToken });
      navigate(from, { replace: true })
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <form onSubmit={Login} className="box">
      {error &&
        <Alert type="error" message={error} />
      }
      <div className="field">
        <label className="label">Email</label>
        <div className="controls">
          <input
            type="text"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="controls">
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <button className="button is-success is-fullwidth">Login</button>
      </div>
      <div>
        Don't have account ? <Link to="/register">Register</Link>
      </div>
    </form>
  )
}

export default Login
