import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();  // Call useNavigate outside of the event handler

  const handleLogout = () => {
    setUser(null);  // Clear user data
    navigate('/signin');  // Redirect to sign-in page
  };

  return (
    <div className='flex flex-col gap-16 p-24 font-extrabold text-2xl rounded-4xl bg-sky-900'>
        <span>Name: {user.name}</span>
        <span>Email: {user.email}</span>
        <span>Account created at: {new Date(user.createdAt).toString()}</span>
        <span>Last login: {new Date(user.lastLogin).toString()}</span>
        <span>Account Verified: {user.isVerified ? "True" : "Not Verified"}</span>
        <button 
          className='bg-red-950 w-max p-4 rounded-3xl cursor-pointer' 
          onClick={handleLogout}
        >
          Logout
        </button>
    </div>
  );
}

export default Profile;

