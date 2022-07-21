import React from 'react'
import Layout from './../components/auth/Layout'

const Login = () => {
  return (
    <Layout
      form={
        <form className="box">
          <div className="field">
            <label className="label">Email</label>
            <div className="controls">
              <input type="text" className="input" />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="controls">
              <input type="password" className="input" />
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
