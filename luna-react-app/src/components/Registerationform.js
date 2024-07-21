import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './Regesterationform.css'
const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        age: '',
        username: '',
        password: '',
    });
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (profileImage) {
            data.append('profile_image', profileImage);
        }
        try {
            const response = await axios.post('http://localhost:8000/api/register/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('User registered successfully', response.data);
            setSuccess(true);
            setError(null);
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError('Something went wrong. Please try again.');
            }
            setSuccess(false);
        }
    };

    const closeModal = () => {
        setError(null);
        setSuccess(false);
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div>
                    <label>First Name:</label>
                    <br/>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <br/>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <br/>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <br/>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <br/>
                    <input
                        type="number"
                        name="age"
                        min="10"
                        step="1"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Profile Image:</label>
                    <br/>
                    <input
                        type="file"
                        name="profile_image"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <br/>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <br/>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br/>
                <div className="register-button-container">
                    <button type="submit">Register</button>
                </div>
            </form>
            <Modal show={!!error} onClose={closeModal} message={error} />
            <Modal show={success} onClose={closeModal} message="Registration successful!" />
        </div>
    );
};

export default RegistrationForm;
