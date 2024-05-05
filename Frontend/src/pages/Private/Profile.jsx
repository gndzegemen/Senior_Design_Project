import React, { useState, useEffect } from 'react';
import {profile} from '../Main/assets';
import './Profile.scss';
import axios from "axios";
import { baseUrl } from "../../helper/urls";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = window.localStorage.getItem('userID');
      console.log(userId);

      try {
        const response = await axios.get(`${baseUrl}/api/user/${userId}`);
        console.log(response);
        setUser({
          username: response.data.username,
          email: response.data.email,
          verified: response.data.verified,
        });
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-picture-wrapper">
          <img src={profile} alt="Profile" className="profile-picture" />
        </div>
        <div className="user-info">
          <h2 className="username">{user.username}</h2>
          <p className="email">{user.email}</p>
          <span className={`status ${user.verified ? 'verified' : 'unverified'}`}>
            {user.verified ? 'Verified' : 'Unverified'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Profile;
