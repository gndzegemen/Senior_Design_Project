import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import "./Auth.scss";
import { baseUrl } from "../../helper/urls"

const Signin = () => {
  const [username, setUsername] = useState("");
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

  const handleLogin = (event) => {
    event.preventDefault();
    Axios.post(`${baseUrl}/auth/login`, {
      username,
      password
    })
      .then((response) => {
        if (response.status === 200) {
          const { token } = response.data;
          setCookie('jwtToken', token, { path: '/' });
          window.localStorage.setItem("userID", response.data.userID);
          navigate("/mainpage");
        } else {
          setErrorMessage("Login request failed: Username or password is not correct.");
        }
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          setErrorMessage("Login request failed: Invalid input");
        } else {
          setErrorMessage("Login request failed: An unexpected error occurred.");
        }
      });
      
  };

  return (
    <React.Fragment>
      <div className="container" ref={containerRef}>
        <div className="auth-header">
          <div className="auth-header-logo">
            <img src="/images/sc-logo.png" alt="" className="auth-header-logo-img" />
          </div>
          <h1 className="auth-header-title">Welcome to Ejderyaa</h1>
          <p className="auth-header-subtitle">
            Sign-in to your account and start the adventure
          </p>
        </div>
        <div className="auth-body">
          <form className="auth-form-validation" onSubmit={handleLogin}>
            <div className="input-field">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <input
                type="text"
                className="input-control"
                id="username"
                placeholder="Username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <div className="flex-end">
              <Link to={"/forgot-password"} className="link-end">
                Forgot password?
              </Link>
            </div>
            <button className="btn-submit">
              Sign in
            </button>
          </form>
          {errorMessage && (
            <h1>{errorMessage}</h1>
          )}
          <p className="text-center">
            New on our platform?{" "}
            <Link to={"/register"} className="link-text-center">
              Create account here
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin;
