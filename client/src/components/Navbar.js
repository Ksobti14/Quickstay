import React from 'react';
import { FaUser } from 'react-icons/fa'; // Import user icon from react-icons
import '../index.css'; // Ensure this is included

const Navbar = () => {
  let user = null;

  try {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      user = JSON.parse(currentUser);
    }
  } catch (error) {
    console.error('Error parsing user data from localStorage', error);
  }

  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login'; // Redirect to login page
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">QuickStay</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              {user ? (
                <div className="dropdown">
                  <button 
                    className="btn btn-secondary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    {/* User Icon and Name */}
                    <FaUser className="me-2" /> {user.name} 
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item" href="/profile">Profile</a></li>
                    <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <>
                  <a className="nav-link active" aria-current="page" href="/register">
                    Register
                  </a>
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
