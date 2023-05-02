import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img src="logo.png" alt="logo" />
          </Link>
        </div>

        <ul className="header__menu">
          <li>
            {/* <Link to="/movie">Movies</Link> */}
            <Link to="/">Movies</Link>
          </li>
          <li>
            {/* <Link to="/tv">Tv Shows</Link> */}
            <Link to="/">Tv Shows</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
