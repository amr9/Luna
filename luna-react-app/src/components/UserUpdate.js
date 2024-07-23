import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserUpdate.css';
import { useNavigate } from "react-router-dom";

const UserUpdate = () => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    age: '',
    profile_image: null,
    username: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('User not authenticated');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/update_user/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        setError(error.message || 'Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (event) => {
    setUser((prevState) => ({ ...prevState, profile_image: event.target.files[0] }));
  };

  const validate = () => {
    let errors = {};

    if (!user.first_name) errors.first_name = "First name is required";
    if (!user.last_name) errors.last_name = "Last name is required";
    if (!user.phone_number) errors.phone_number = "Phone number is required";
    if (!user.email) errors.email = "Email is required";
    if (!user.age) errors.age = "Age is required";
    if (!user.username) errors.username = "Username is required";

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    const token = localStorage.getItem('token');

    if (!token) {
      setError('User not authenticated');
      return;
    }

    const formData = new FormData();
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('phone_number', user.phone_number);
    formData.append('email', user.email);
    formData.append('age', user.age);
    formData.append('username', user.username);
    if (user.profile_image) {
      formData.append('profile_image', user.profile_image);
    }

    try {
      const response = await axios.put('http://127.0.0.1:8000/api/update_user/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`,
        },
      });

      console.log(response.data);
      navigate('/user');
    } catch (error) {
      setError(error.response?.data?.error || 'Error updating user data');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-update-container">
      <form className="user-update-form" onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <br/>
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleInputChange}
          />
          {formError.first_name && <p className="error-text">{formError.first_name}</p>}
        </div>
        <div>
          <label>Last Name:</label>
          <br/>
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleInputChange}
          />
          {formError.last_name && <p className="error-text">{formError.last_name}</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <br/>
          <input
            type="text"
            name="phone_number"
            value={user.phone_number}
            onChange={handleInputChange}
          />
          {formError.phone_number && <p className="error-text">{formError.phone_number}</p>}
        </div>
        <div>
          <label>Email:</label>
          <br/>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          {formError.email && <p className="error-text">{formError.email}</p>}
        </div>
        <div>
          <label>Age:</label>
          <br/>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleInputChange}
          />
          {formError.age && <p className="error-text">{formError.age}</p>}
        </div>
        <div>
          <label>Username:</label>
          <br/>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
          {formError.username && <p className="error-text">{formError.username}</p>}
        </div>
        <div>
          <label>Profile Image:</label>
          <br/>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div className="update-button-container">
          <button type="submit">Update</button>
        </div>
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default UserUpdate;
