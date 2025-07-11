import React from 'react';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}!</h2>
      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
      <button onClick={onLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;