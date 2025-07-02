import React, { useState } from 'react';
import axios from 'axios';
import '../assets/Background.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setMessage(''); // Clear message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', formData);
      setMessage('Registration successful! Now login!');
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
  <div className="auth-bg">
    <div className="auth-form-container">
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">ValYou</h2>

      {message && (
        message === 'Registration successful! Now login!' ? (
          <div className="custom-success-message registered">{message}</div>
        ) : (
          <div className="alert alert-danger">{message}</div>
        )
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" value={formData.name}
                 onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" value={formData.email}
                 onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary password-toggle-btn"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              style={{height: '100%', display: 'flex', alignItems: 'center', borderLeft: 'none'}}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#333" strokeWidth="2" d="M3 12s3.6-6 9-6 9 6 9 6-3.6 6-9 6-9-6-9-6Z"/><circle cx="12" cy="12" r="3" stroke="#333" strokeWidth="2"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#333" strokeWidth="2" d="M3 12s3.6-6 9-6 9 6 9 6-3.6 6-9 6-9-6-9-6Z"/><circle cx="12" cy="12" r="3" stroke="#333" strokeWidth="2"/><line x1="4" y1="20" x2="20" y2="4" stroke="#333" strokeWidth="2"/></svg>
              )}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Sign up</button>
      </form>
      <div className="text-center mt-3">
        <span>Already have an account? </span>
        <a href="/login" className="btn btn-link p-0 align-baseline">Login</a>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Register;
