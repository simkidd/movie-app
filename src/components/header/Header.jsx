import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  window.scrollTo(0, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img src="logo.png" alt="logo" />
          </Link>
        </div>

        <ul className="header__menu">
          <li className={pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={pathname === "/explore" ? "active" : ""}>
            <Link to="explore">Explore</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
