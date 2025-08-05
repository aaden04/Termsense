import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSignupSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

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
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3000/user/signup', formData);
      console.log('Signup successful:', response.data);
      setSuccess('Account created successfully! You can now login.');
      setFormData({ name: '', email: '', password: '' });
      setTimeout(() => {
        onSignupSuccess();
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <img src="/logo.png" alt="Termsense Logo" className="logo" />
      <h2>Create Account</h2>
      <p className="subtitle">Join Termsense and start your journey</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
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
        {success && <div className="success">{success}</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      
      <div className="auth-switch">
        <p>Already have an account? <button type="button" onClick={onSwitchToLogin} className="link-btn">Sign in</button></p>
      </div>
    </div>
  );
};

export default Signup;