import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { Alert } from '../../components/Alert'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await axios.post('/register', {
        name,
        email,
        password,
        confPassword,
      })
      navigate('/login')
    } catch (error) {
      setError(error.response.data.error)
    }
  }

  return (
    <form onSubmit={handleRegister} className="box">
      {error &&
        <Alert type="error" message={error} />
      }
      <div className="field">
        <label className="label">Name</label>
        <div className="controls">
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="controls">
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
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
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Confirm Password</label>
        <div className="controls">
          <input
            type="password"
            className="input"
            value={confPassword}
            onChange={(e) => {
              setConfPassword(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="field">
        <button className="button is-success is-fullwidth">Register</button>
      </div>
      <div>
        Have account ? <Link to="/login">Login</Link>
      </div>
    </form>
  )
}

export default Register
