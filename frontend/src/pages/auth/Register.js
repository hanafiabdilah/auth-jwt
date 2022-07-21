import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from './../../components/auth/Layout'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const Register = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/user', {
        name,
        email,
        password,
        confPassword,
      })
      navigate('/')
    } catch (error) {
      setError(error.response.data.error)
    }
  }

  return (
    <Layout
      error={error}
      form={
        <form onSubmit={Register} className="box">
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
        </form>
      }
    />
  )
}

export default Register
