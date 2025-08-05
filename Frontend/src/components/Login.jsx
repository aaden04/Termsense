import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      console.log('Login successful:', response.data);

      onLoginSuccess(response.data.user);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <img src="/logo.png" alt="Termsense Logo" className="logo" />
      <h2>Welcome Back</h2>
      <p className="subtitle">Sign in to your Termsense account</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="error">{error}</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="auth-switch">
        <p>Don't have an account? <button type="button" onClick={onSwitchToSignup} className="link-btn">Sign up</button></p>
      </div>
    </div>
  );
};

export default Login;