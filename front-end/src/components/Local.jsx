import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/Background.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      const { token } = res.data;

      // Save token in localStorage
      localStorage.setItem('token', token);

      setStatus('Login successful!');
    } catch (err) {
      console.error(err);
      setStatus('Login failed. Please check your credentials.');
    }
    navigate('/dashboard');
  };

  return (
    <div className="auth-bg">
    <div className="auth-form-container">
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">ValYou</h2>

      {status && (
        <div className={`alert ${status.includes('failed') ? 'alert-danger' : 'alert-success'}`}>
          {status}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      <div className="text-center mt-3">
        <span>Don't have an account? </span>
        <a href="/register" className="btn btn-link p-0 align-baseline">Sign up</a>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Login;
