import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'

export const Dashboard = () => {
    const [users, setUsers] = useState([])
    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/user');
                isMounted && setUsers(response.data);
            } catch (error) {
                console.error(error);
                navigate('/login', { state: { from: location }, replace: true })
            }
        }

        getUsers();

        return () => {
            isMounted = false;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            dashboard
            <br />
            {users?.length
                ? <ul>{users.map((user, i) => <li key={i}>{user.email}</li>)}</ul>
                : 'Users not found'
            }

        </div>
    )
}
