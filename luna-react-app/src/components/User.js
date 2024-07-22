import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './User.css';
import {useNavigate} from "react-router-dom";

const User = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        const response = await axios.get('http://127.0.0.1:8000/api/user_images/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message || 'Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data found</p>;

  return (
    <div className="user-container">
      <div className="user-name-image">
        <img src={user.profile_image} alt={user.first_name + user.last_name} className="profile-image" />
        <h1 className="user-name">{user.username}</h1>
      </div>
    </div>
  );
};

export default User;
