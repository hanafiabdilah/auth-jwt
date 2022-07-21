import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from './../../components/auth/Layout'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const Login = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/login', { email, password })
      navigate('/dashboard')
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <Layout
      error={error}
      form={
        <form onSubmit={Login} className="box">
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
      }
    />
  )
}

export default Login
