import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <h1>Student Profile</h1>
      <div>
        <h2>Personal Information</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Major: {user.major}</p>
        <p>Semester: {user.semester}</p>
      </div>
      <div>
        <h2>Skills</h2>
        <ul>
          {user.skills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Interests</h2>
        <ul>
          {user.interests?.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile; 