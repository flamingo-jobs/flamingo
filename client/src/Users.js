import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from './Config';

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        retrieveUsers()
    })

    const retrieveUsers = () => {
        axios.get(`${BACKEND_URL}/users`).then(res => {
            if (res.data.success) {
                setUsers(res.data.existingUsers)
            }
        })
    }

    return (
        <div>
            {users.map(user => (
                <div key={user._id}>
                    <p>{user.username}</p>
                    <p>{user.password}</p>
                </div>
            ))}

        </div>
    )
}

export default Users;
