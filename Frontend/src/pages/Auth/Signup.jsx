import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import "./Auth.scss";
import { baseUrl } from "../../helper/urls"

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['jwtToken']);
  const containerRef = useRef(null);

  useEffect(() => {
    if (cookies.jwtToken) {
      navigate("/mainpage");
    }

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        navigate("/");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [cookies.jwtToken, navigate]);

  const createUser = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post(`${baseUrl}/auth/register`, {
        username: userName,
        email,
        password
      });

      if (response.status === 200) {
        setErrorMessage(null);
        navigate("/login");
        sendVerificationEmail(email);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage("Registration failed: " + error.response.data.message);
      } else {
        setErrorMessage("Registration failed: An unexpected error occurred.");
      }
    }
  };

  const sendVerificationEmail = async (email) => {
    try {
      await Axios.post(`${baseUrl}/auth/send-verification-email`, { email });
    } catch (error) {
      console.log("Sending verification email failed: ", error);
    }
  };

  return (
    <React.Fragment>
      <div className="container" ref={containerRef}>
        <div className="auth-header">
          <div className="auth-header-logo">
            <img src="/images/sc-logo.png" alt="" className="auth-header-logo-img" />
          </div>
          <h1 className="auth-header-title">Create Account</h1>
          <p className="auth-header-subtitle">
            Create your account and be part of us
          </p>
        </div>
        <div className="auth-body">
          <form className="auth-form-validation" onSubmit={createUser}>
            <div className="input-field">
              <label htmlFor="user-name" className="input-label">
                User Name
              </label>
              <input
                type="text"
                className="input-control"
                id="user-name"
                placeholder="someone"
                autoComplete="off"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <input
                type="text"
                className="input-control"
                id="email"
                placeholder="example@gmail.com"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="input-control"
                placeholder="E.123-a"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn-submit">
              Create account
            </button>
          </form>
          {errorMessage && (
            <h1>{errorMessage}</h1>
          )}
          <p className="text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="link-text-center">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;

