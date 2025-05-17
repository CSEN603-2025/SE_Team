import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink 
            to="/submissions"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Submissions
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/filter"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Filter
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/sort"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Sort
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 