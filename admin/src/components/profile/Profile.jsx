// ProfilePage.jsx
import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import './profile.scss'; // Import the SCSS file

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      {user ? (
        <div className="profile-details">
          <div className="table-row">
            <div className="title">Username:</div>
            <div className="value">{user.username}</div>
          </div>
          <div className="table-row">
            <div className="title">Email:</div>
            <div className="value">{user.email}</div>
          </div>
          <div className="table-row">
            <div className="title">Country:</div>
            <div className="value">{user.country}</div>
          </div>
          <div className="table-row">
            <div className="title">City:</div>
            <div className="value">{user.city}</div>
          </div>
          <div className="table-row">
            <div className="title">Phone:</div>
            <div className="value">{user.phone}</div>
          </div>
          <div className="table-row">
            <div className="title">Membership Status:</div>
            <div className="value"><img src={user.status} /></div>
          </div>
          <div className="table-row">
            <div className="title">Profile Image:</div>
            <div className="value"><img src={user.img} alt="Profile" className="profile-image" /></div>
          </div>
          

          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
