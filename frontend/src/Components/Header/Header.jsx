import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import header from './Header.module.css';

const Header = ({ user, handlelogout }) => {
  const location = useLocation();
  const currentPage = location.pathname;

  const isActive = (path) => {
    return currentPage === path ? header.active : '';
  };

  return (
    <div className={header.container}>
      <div className={header.logo}>NOVIA</div>
      <div className={header.user}></div>
      <div className={header.login}>
        <Link className={isActive('/teacher')} to="/teacher">
          Teacher
        </Link>
        <Link className={isActive('/')} to="/">
          Home
        </Link>
        <button onClick={handlelogout}>Log out</button>
        <p>{user ? user.name : null} </p>
      </div>
      <Outlet/>
    </div>
  );
};

export default Header;