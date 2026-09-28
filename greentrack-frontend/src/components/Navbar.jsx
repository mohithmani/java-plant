import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        🌱 GreenTrack
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/volunteers" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          🙋‍♂️ Volunteers
        </NavLink>
        <NavLink to="/drives" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          🚜 Plantation Drives
        </NavLink>
        <NavLink to="/trees" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          🌳 Trees
        </NavLink>
        <NavLink to="/check-ins" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          📋 Check-Ins
        </NavLink>
      </nav>
    </aside>
  );
};

export default Navbar;
