import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Modal from './Modal'
import './Navbar.css'
const Navbar = () => {

    const [error, setError] = useState(null);

    const LogoutClick = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('Not authorized');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/logout/', {},{
                headers: {
                    'Authorization': `Token  ${token}`
                }
            });

            localStorage.removeItem('token')
            console.log(response.data.message);
            setError(null);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Not authorized');
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

     const closeModal = () => {
        setError(null);
    };

    const navigate = useNavigate();
    const LoginClick = () => navigate('/login');
    const HomeClick = () => navigate('/');
    const RegisterClick = () => navigate('/register');

    return (
        <header className="header">
            <div className="logo">
                <img src="luna.png" alt="Luna logo" onClick={HomeClick}/>
            </div>
            <nav className="nav">
                <ul>
                    <li onClick={HomeClick}>Home</li>
                    <li onClick={HomeClick}>About Us</li>
                    <li onClick={HomeClick}>Feature</li>
                    <li>
                        <button className="sign-in" onClick={LoginClick}>Sign In</button>
                    </li>
                    <li>
                        <button className="register" onClick={RegisterClick}>Register</button>
                    </li>
                    <li>
                        <button className="logout" onClick={LogoutClick}>Logout</button>
                         <Modal show={!!error} onClose={closeModal} message={error} />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
