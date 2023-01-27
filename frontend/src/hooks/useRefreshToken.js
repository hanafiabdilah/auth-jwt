import jwtDecode from 'jwt-decode';
import axios from '../api/axios'
import { useAuth } from './useAuth'

export const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/token', {
            withCredentials: true,
        })

        const decode = jwtDecode(response?.data?.accessToken);
        setAuth({ ...decode, accessToken: response?.data?.accessToken });
    }

    return refresh
}
