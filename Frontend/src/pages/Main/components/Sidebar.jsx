import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { logo, logout } from '../assets';
import { navlinks } from '../constants';



const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-white'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="logo" className="w-1/2 h-1/2" />
    ) : (
      <img src={imgUrl} alt="logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
)


const Sidebar = () => {


  const [isLogoutClicked, setLogoutClicked] = useState(false);

  const navigate = useNavigate();

  const [, , removeCookie] = useCookies(['jwtToken']);
  const [isActive, setIsActive] = useState('store');

  const handleLogout = () => {
    removeCookie('jwtToken');
    navigate("/login");
    setLogoutClicked(true);

  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[78px] h-[78px] rounded-full bg-[#f4c2c2]" imgUrl={logo} />
      </Link>


      <div className="flex-1 flex flex-col justify-between items-center bg-[#f4c2c2] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        <div
          className="w-[48px] h-[48px] rounded-[10px] bg-[#ef3038] flex justify-center items-center cursor-pointer mt-4"
          onClick={handleLogout}
        >
          <Icon styles="bg-[#ef3038] shadow-secondary" imgUrl={logout} />
        </div>


      </div>
    </div>
  )
}

export default Sidebar;
