import React from "react";
import { Link } from "react-router-dom";
import "./authHeader.scss";

const AuthHeader = () => {
  return (
    <div className="login__header">
      <div className="login__header__wrap">
        <Link to="/">
          <h1 className="brand">netReelz</h1>
          {/* <img src="logo.png" alt="logo" /> */}
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;
