import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const {pathname} = useLocation();

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img src="logo.png" alt="logo" />
          </Link>
        </div>

        <ul className="header__menu">
          <li className={pathname === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={pathname === '/movie' ? 'active' : ''}>
            <Link to="/movie">Movies</Link>
          </li>
          <li className={pathname === '/tv' ? 'active' : ''}>
            <Link to="/tv">Tv Shows</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
