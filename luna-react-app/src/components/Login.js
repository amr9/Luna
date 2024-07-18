import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setError(null);
            console.log(response.data.message);
        } catch (Error) {
            if (Error.response && Error.response.data) {
                 const errorData = Error.response.data.errors;
                const formattedErrors = {};

                for (const key in errorData) {
                    formattedErrors[key] = Array.isArray(errorData[key])
                        ? errorData[key]
                        : [errorData[key]];
                }

                setError(formattedErrors);
                console.log(formattedErrors);
            } else {
                setError(['Something went wrong. Please try again.']);
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <div style={{ color: 'red' }}>
                {Object.keys(error).map(key => (
                    <div key={key}>{error[key].join(', ')}</div>
                ))}
            </div>}
        </div>
    );
};

export default Login
