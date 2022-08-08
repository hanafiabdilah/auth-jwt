import React, { useState, useEffect } from 'react'
import Navbar from './../../components/dashboard/navbar/index'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [exp, setExp] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    refreshToken()
  }, [])

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token')
      setToken(response.data.accessToken)
      const decode = jwt_decode(response.data.accessToken)
      setName(decode.name)
      setExp(decode.exp)
    } catch (error) {
      if (error.response) {
        navigate('/')
      }
    }
  }

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date()
    if (exp * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:5000/token')
      config.headers.Authorization = `Bearer ${response.data.accessToken}`
      setToken(response.data.accessToken)
      const decode = jwt_decode(response.data.accessToken)
      setName(decode.name)
      setExp(decode.exp)
    }
    return config
  })

  const getUsers = async () => {
    const response = await axiosJWT.get('http://localhost:5000/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setUsers(response.data)
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>Welcome, {name} ! </h1>
        <button onClick={getUsers}>Get Users</button>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Dashboard
