import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <h1>Service Manager</h1>
          <p className="tagline">Services & Blog Portal</p>
        </div>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
