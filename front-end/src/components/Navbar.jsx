import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
   const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-3">
      <span className="navbar-brand ms-2 fw-bold fs-4">ValYou</span>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="d-flex flex-column ms-auto align-items-end w-100">
          {token && (
            <button onClick={handleLogout} className="btn btn-outline-danger mb-2" style={{ maxWidth: '120px' }}>
              Logout
            </button>
          )}
          <ul className="navbar-nav">
            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
            )}
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
