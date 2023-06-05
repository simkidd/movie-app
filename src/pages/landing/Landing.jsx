import React from "react";
import "./landing.scss";
import Bg from "../../assets/Screenshot 2023-06-05 013321.png";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing__header">
        <div className="landing__header__wrap">
          <div className="landing__logo">
            <Link to="/">
              <h1 className="brand">netReelz</h1>
              {/* <img src="logo.png" alt="logo" /> */}
            </Link>
          </div>

          <button className="btn small">
            <Link to='/account/login'>Sign In</Link>
          </button>
        </div>
      </div>
      <div className="landing__container__bg">
        <img src={Bg} alt="" />
      </div>

      <div className="landing__head">
        <div className="landing__head__inner">
          <h1>Unlimited movies, TV shows, and more</h1>

          <p>Watch anywhere. Watch anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
