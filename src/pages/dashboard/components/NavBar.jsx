import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          FMO Track
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link 
              to="/my_profile" 
              className={`nav-link ${location.pathname === '/my_profile' ? 'active' : ''}`}
            >
              Perfil
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;