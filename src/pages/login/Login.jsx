import React, { useState } from "react";
import "./login.scss";
import Bg from "../../assets/movie-login-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);

      await signInWithEmailAndPassword(auth, email, password);
      // User has logged in successfully
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePswShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login__container">
      <div className="login__container__bg">
        <img src={Bg} alt="" />
      </div>

      <div className="login__body">
        <div className="login__content">
          <div className="login__form">
            <h1 className="login__form__header">Sign In</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin} className="form">
              <div className="input__placement">
                <div className="text__control">
                  <label className="input__id" placeholder>
                    <input
                      type="email"
                      className="text__field"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="" className="place__label">
                      Email
                    </label>
                  </label>
                </div>
              </div>

              <div className="input__placement">
                <div className="psw__control text__control">
                  <label className="input__id" placeholder>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="text__field psw__field"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="" className="place__label">
                      Password
                    </label>
                  </label>
                  <span className="psw__toggle" onClick={togglePswShow}>
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>
              </div>

              <button className="btn__login">
                {isLoading ? (
                  <ClipLoader size={18} color={"#fff"} loading={isLoading} />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="login__form__bottom">
              <p>
                New here?
                <Link to="/account/register">Sign up now.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
