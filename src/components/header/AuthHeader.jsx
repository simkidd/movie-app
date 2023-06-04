import React from "react";
import { Link } from "react-router-dom";
import './authHeader.scss'

const AuthHeader = () => {
  return (
    <div className="login__header">
      <div className="login__header__wrap">
        <Link to="/">
          <img src="logo.png" alt="logo" />
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;
