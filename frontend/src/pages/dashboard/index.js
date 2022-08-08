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

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>Welcome, {name} ! </h1>
      </div>
    </>
  )
}

export default Dashboard
