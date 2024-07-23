import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './User.css';
import { useNavigate } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [dyedImageUrl, setDyedImageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setFormError('User not authenticated');
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

        const userData = response.data;

        // If user data contains base64 profile image, convert it to blob URL
        if (userData.profile_image) {
          const base64Response = await fetch(`data:image/jpeg;base64,${userData.profile_image}`);
          const blob = await base64Response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setProfileImageUrl(imageUrl);
        }

        setUser(userData);
        console.log(userData);
      } catch (error) {
        setError(error.response?.data?.error || 'Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setFormError('User not authenticated');
      console.log('User not authenticated');
      setLoading(false);
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('hex_color', selectedColor);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/dye/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`,
        },
      });
      const responseImage = response.data;

      // If responseImage contains base64 profile image, convert it to blob URL
      if (responseImage.image) {
        const base64Response = await fetch(`data:image/jpeg;base64,${responseImage.image}`);
        const blob = await base64Response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setDyedImageUrl(imageUrl);
      }

      console.log(response.data);
      setFormError(null);

    } catch (error) {
      setFormError(error.response?.data?.error || 'Error uploading data'); // Set form error
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data found</p>;

  return (
    <div className="user-container">
      <div className="user-name-image">
        {profileImageUrl && (
          <img src={profileImageUrl} alt={`${user.first_name} ${user.last_name}`} className="profile-image" />
        )}
        <h1 className="user-name">{user.username}</h1>
      </div>
      <div className="user-image-before-dye-container">
        <form className="user-image-form" onSubmit={handleSubmit}>
          <div>
            <label>Upload Image:</label>
            <br />
            <input type="file" onChange={handleImageChange} />
          </div>
          <div>
            <label>Choose Color:</label>
            <br />
            <input type="color" value={selectedColor} onChange={handleColorChange} />
          </div>
          <div className="dye-button-container">
            <button type="submit">Dye</button>
          </div>
          {formError && <p className="error-text">{formError}</p>}
        </form>
      </div>
      {dyedImageUrl && (
        <div className="user-image-after-dye">
          <h1 className="user-name">Uploaded Image</h1>
          <img src={dyedImageUrl} alt={`${user.first_name} ${user.last_name} `} className="uploaded-image" />
        </div>
      )}
    </div>
  );
};

export default User;
