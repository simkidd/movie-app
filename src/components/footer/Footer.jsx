import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="content__logo">
          <div className="logo">
            <Link to="/">
              <img src="logo.png" alt="logo" />
            </Link>
          </div>
        </div>
        <div className="content__menu">
          <div className="menu__list">
            <Link to="/">Home</Link>
            <Link to="/">About us</Link>
            <Link to="/">Contact us</Link>
          </div>
          <div className="menu__list">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Privacy policy</Link>
          </div>
          <div className="menu__list">
            <Link to="/">Must watch</Link>
            <Link to="/">Recent release</Link>
            <Link to="/">Top TMDB</Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy;{new Date().getFullYear()}. All rights reversed. Developer by John Mason</p>
      </div>
    </div>
  );
};

export default Footer;
