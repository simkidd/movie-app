import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleLogout = () => {
    // Add your logout logic here
    // For example, clear user session, redirect to login page, etc.
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
    console.log("dropdown toggle")
  };

  const avatarImage =
    "https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_face,r_20,d_avatar.png/non_existing_id.png";

  return (
    <div className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img src="logo.png" alt="logo" />
          </Link>
        </div>

        <div className="header__right">
          <ul className="header__menu">
            <li className={pathname === "/" ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={pathname === "/explore" ? "active" : ""}>
              <Link to="explore">Explore</Link>
            </li>
          </ul>

          <div className="header__avatar">
            <img
              src={avatarImage}
              alt="avatar"
              className="avatar__image"
              onClick={toggleDropdown}
            />

            {isDropdownOpen && (
              <div className="avatar__dropdown">
                <ul>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
