import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import { useEffect} from "react";
import ChatWidget from "../../components/chat/chat";


const ProfilePage = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const res = await axios.get(`/users/${user._id}`);
            console.log(res.data)
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        if (!isEditing) {
          // Fetch updated user data only when not in editing mode
          fetchUserData();
        }
      }, [user._id, isEditing, dispatch]);
  
    const handleEditClick = () => {
      setIsEditing(true);
    };

//     useEffect(() => {
//       // Access and print cookies when the component mounts
//       const cookies = document.cookie;
//       console.log('Cookies:', cookies);
  
//       // If you want to extract specific cookies, you can parse the `document.cookie` string
//       const parsedCookies = document.cookie
//         .split(';')
//         .map(cookie => cookie.trim())
//         .reduce((acc, cookie) => {
//           const [name, value] = cookie.split('=');
//           acc[name] = value;
//           return acc;
//         }, {});
//         console.log('Parsed Cookies:', parsedCookies);
// }, []);

  
    const handleSaveClick = async () => {
      try {
          if (isEditing && newProfilePicture) {
            const formData = new FormData();
            formData.append('file', newProfilePicture);
            formData.append('upload_preset', 'upload');
    
            const uploadRes = await axios.post(
              'https://api.cloudinary.com/v1_1/secloud/image/upload',
              formData,
            );
    
            const { url } = uploadRes.data;
            //console.log("url",url)
    
            const updatedUser = {
              ...editedUser,
              img: url,
            };
            console.log("updatedUser", updatedUser)
    
            const res = await axios.put(`/users/${user._id}`, updatedUser,  {
              withCredentials: true, // Ensure credentials are sent
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            setIsEditing(false);
          } else if (isEditing) {
            // Handle the case when a new profile picture is not selected
            // Update the user with other details
            const res = await axios.put(`/users/${user._id}`, editedUser,{ withCredentials: true });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            setIsEditing(false);
          } else {
            // Handle the case when not in editing mode (e.g., navigate back)
            setIsEditing(false);
          }
        } catch (error) {
          console.error('Error updating user:', error);
          setIsEditing(false);
        }
  };
  
    const handleInputChange = (e) => {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleBackClick = () => {
        // Navigate back to the home page
        navigate('/');
      };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      {user ? (
        <div className="profile-details">
             <div className="table-row">
             <div className="title">Profile Image:</div>
             <div className="value"><img src={user.img} alt="Profile" className="profile-image" /></div>
           </div>
          <div className="table-row">
            <div className="title">Username:</div>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange} 
              />
            ) : (
              <div className="value">{user.username}</div>
            )}
          </div>
          <div className="table-row">
            <div className="title">Email:</div>
            {isEditing ? (
              <input
                type="text"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            ) : (
              <div className="value">{user.email}</div>
            )}
          </div>
          <div className="table-row">
            <div className="title">Country:</div>
            {isEditing ? (
              <input
                type="text"
                name="country"
                value={editedUser.country}
                onChange={handleInputChange}
              />
            ) : (
              <div className="value">{user.country}</div>
            )}
          </div>
          <div className="table-row">
            <div className="title">City:</div>
            {isEditing ? (
              <input
                type="text"
                name="city"
                value={editedUser.city}
                onChange={handleInputChange}
              />
            ) : (
              <div className="value">{user.city}</div>
            )}
          </div>
          <div className="table-row">
            <div className="title">Phone:</div>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
              />
            ) : (
              <div className="value">{user.phone}</div>
            )}
             </div>

           <div>
          {isEditing ? (
           <div>
           {/* File input triggered by the "Change Profile Picture" button */}
           <input
             type="file"
             onChange={(e) => setNewProfilePicture(e.target.files[0])}
             style={{ display: 'none' }}
             id="profilePictureInput"
           />
     
           {/* Visible button to trigger the file input */}
           <button onClick={() => document.getElementById('profilePictureInput').click()}>
              Change Profile Picture
            </button>
     
           {/* Save button */}
           <button onClick={handleSaveClick} className="buttons">Save</button>
     
           {/* Back button */}
           <button onClick={handleBackClick} className="otherbuttons">Back</button>
         </div>
          ) : (
            <div>
            <button onClick={handleEditClick} className="buttons">Edit</button>
            <button onClick={handleBackClick} className="otherbuttons">Back</button>
            </div>
          )}
        </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ChatWidget/>
    </div>
  );
};

export default ProfilePage;




