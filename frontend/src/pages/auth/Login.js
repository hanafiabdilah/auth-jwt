import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider';
import jwtDecode from 'jwt-decode';

import axios from '../../api/axios';
const LOGIN_URL = '/login';

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const Login = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(LOGIN_URL, { email, password })
      const decode = jwtDecode(response?.data?.accessToken)
      setUser(decode);
      navigate('/dashboard')
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <form onSubmit={Login} className="box">
      {error && error}
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
    </form>
  )
}

export default Login
