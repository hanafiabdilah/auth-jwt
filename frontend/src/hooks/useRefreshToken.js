import React from 'react'
import axios from '../api/axios'
import { useAuth } from './useAuth'

export const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/token', {
            withCredentials: true,
        })

        setAuth((prev) => {
            return { ...prev, accessToken: response.data.accessToken }
        })

    }

    return refresh
}
