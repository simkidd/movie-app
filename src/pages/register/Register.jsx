import React, { useState } from "react";
import Bg from "../../assets/movie-login-bg.jpg";
import auth from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);

      await createUserWithEmailAndPassword(auth, email, password);
      // Registration successful, you can redirect the user or show a success message
      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        navigate("/account/login");
      }, 2000);
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
            <h1 className="login__form__header">Register</h1>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            <form onSubmit={handleRegister} className="form">
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
                  <label className="input__id" placeholder="true">
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
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="login__form__bottom">
              <p>
                Have an account?
                <Link to="/account/login">Sign in.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
