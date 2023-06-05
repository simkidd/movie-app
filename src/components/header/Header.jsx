import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";
import auth from "../../firebase";
import { FaPlay } from "react-icons/fa";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const [currentUser, setCurrentUser] = useState(null);

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    // For example, call the Firebase sign out method
    auth.signOut();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.addEventListener("click", handleClickOutside);
    };
  }, []);

  const avatarImage = currentUser
    ? currentUser.photoUrl
    : "https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_face,r_20,d_avatar.png/non_existing_id.png";

  return (
    <div className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <h1 className="brand">netReelz</h1>
            {/* <img src="logo.png" alt="logo" /> */}
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

          {currentUser ? (
            <div
              className="header__avatar"
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
              <img src={avatarImage} alt="avatar" className="avatar__image" />

              {isDropdownOpen && (
                <div className="avatar__dropdown">
                  <div className="dropdown__item">
                    <Link to="/account/profile">Profile</Link>
                  </div>
                  <div className="dropdown__item">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/account/login" className="btn small sign__in">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
