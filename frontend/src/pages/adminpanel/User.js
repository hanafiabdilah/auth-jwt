import { useEffect, useState } from 'react'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'

export const User = () => {
    const [rowSelected, setRowSelected] = useState(null);

    const [usersIsLoading, setUsersIsLoading] = useState(true);
    const [users, setUsers] = useState([])

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        let isMounted = true;

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/user');
                isMounted && setUsers(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setUsersIsLoading(false)
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
            <h1 className="title">Users</h1>
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usersIsLoading ? (
                        <tr>
                            <td colSpan={2}>Loading...</td>
                        </tr>
                    ) : (
                        users?.length
                            ? (
                                users.map((user, i) => {
                                    return (
                                        <tr key={i} className={rowSelected === i ? 'is-selected' : ''} onClick={() => setRowSelected(i)}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    )
                                })
                            )
                            : (
                                <tr>
                                    <td colSpan={2}>Not users to display</td>
                                </tr>
                            )
                    )
                    }
                </tbody>

            </table>
        </div>
    )
}
