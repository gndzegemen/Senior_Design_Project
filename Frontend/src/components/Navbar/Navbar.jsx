import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import { useCookies } from 'react-cookie';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom"
import "./Navbar.scss";



const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking the presence of the token cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('jwtToken'));
    if (token) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, []);

  const [isLogoutClicked, setLogoutClicked] = useState(false);
  const [, , removeCookie] = useCookies(['jwtToken']);


  const handleLogout = () => {
    removeCookie('jwtToken');
    navigate("/");
    setLogoutClicked(true);
    setIsLoggedIn(false);

  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">

          <div className="item">
            <img src="images/en.png" alt="" />
            <KeyboardArrowDownIcon />
          </div>

          <div className="item">
            <Link className="link" to="/products">STORE</Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">EJDERYAA</Link>
        </div>
        <div className="right">

          <div className="item">
            <Link className="link" to="/">About</Link>
          </div>
          <div className="item">
            <a className="start-button" href="https://sepolia.etherscan.io/address/0x0922E90851fa592ECE4E6238852c86894d9ed0ab#code" target="_blank">Contact</a>
          </div>

          <div className="icons">

            {!isLoggedIn &&
              <>
                <LoginIcon titleAccess="Login" onClick={() => navigate('/login')} />
                <HowToRegIcon titleAccess="Register" onClick={() => navigate('/register')} />
              </>
            }

            {isLoggedIn &&
              <>
                <LogoutIcon titleAccess="Logout" onClick={handleLogout} />
                <HomeIcon titleAccess="ReturnMainPage" onClick={() => navigate('/mainpage')} />

              </>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
