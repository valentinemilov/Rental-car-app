import React from 'react';
import { NavLink } from 'react-router-dom';

import './navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation-wrapper">
        <ul>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink exact to="/">Cars</NavLink>
          </li>
          <li>
            <NavLink exact to="/admin/cars">Admin</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
