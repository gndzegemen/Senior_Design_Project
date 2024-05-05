import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.scss";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [showHomeText, setShowHomeText] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleClickOutside = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target)
    ) {
      setShowHomeText(false);
      navigate("/");
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showHomeText) {
      document.body.style.cursor = "none";
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [showHomeText]);

  return (
    <React.Fragment>
      <div
        className="container"
        ref={containerRef}
        onMouseEnter={() => setShowHomeText(false)}
        onMouseLeave={() => setShowHomeText(true)}
      >
        <div className="auth-header">
          <div className="auth-header-logo forgot-img">
            <img
              src="/images/forgot-password.png"
              alt=""
              className="auth-header-logo-img"
            />
          </div>
        </div>
        <div className="auth-body">
          <h1 className="auth-header-title">Forgot Password?</h1>
          <p className="auth-header-subtitle forgot-subtitle">
            Enter your email to reset your password
          </p>
          <form className="auth-form-validation">
            <div className="input-field">
              <label htmlFor="email" className="input-label">
                Email address
              </label>
              <input
                type="text"
                className="input-control"
                id="email"
                placeholder="example@gmail.com"
                autoComplete="off"
                required
              />
            </div>
            <button className="btn-submit">
              Send Reset Link
            </button>
            <Link to={"/login"} className="btn-back-to-login">
              Back to login
            </Link>
          </form>
        </div>
      </div>
      {showHomeText && (
        <div
          className="home-text"
          style={{ left: mousePosition.x, top: mousePosition.y }}
        >
          Home
        </div>
      )}
    </React.Fragment>
  );
};

export default ForgotPassword;
