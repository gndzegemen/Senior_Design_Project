import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { logo, menu, logout } from '../assets';
import { navlinks } from '../constants';
import { useStatus } from "../../../context/statusContext";
import { connectWallet, getCurrentWalletConnected } from "../../../utils/interact";

const Header = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['jwtToken']);
  const [isActive, setIsActive] = useState('library');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [isLogoutClicked, setLogoutClicked] = useState(false);

  const handleLogout = () => {
    removeCookie('jwtToken');
    navigate("/login");
    setLogoutClicked(true);
  };

  const { setStatus } = useStatus();
  const [walletAddress, setWalletAddress] = useState("");

  const connectWalletPressed = async () => {
    try {
      const walletResponse = await connectWallet();
      setWalletAddress(walletResponse.address);
      setStatus(walletResponse.status);
    } catch (err) {
      setStatus(`🔴 Failed to connect wallet: ${err.message}`);
    }
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        const walletResponse = await getCurrentWalletConnected();
        setWalletAddress(walletResponse.address);
        setStatus(walletResponse.status);
        addWalletListener();
      } catch (err) {
        setStatus(`🔴 Failed to get wallet connection status: ${err.message}`);
      }
    };

    prepare();
  }, []);

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus("");
        } else {
          setWalletAddress("");
          setStatus("🦊 Connect to Metamask using Connect Wallet button.");
        }
      });
    }
  };

  

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      
        <div className="sm:hidden flex justify-between items-center relative">

        <Link to='/'>
          <div className="w-[40px] h-[40px] rounded-full bg-[#f4c2c2] flex justify-center items-center cursor-pointer">
            <img src={logo} alt="home" className="w-[60%] h-[60%] object-contain" />
          </div>
        </Link>


        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div className={`absolute top-[60px] right-0 left-0 bg-[#f4c2c2] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-white'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >

                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-black'}`}>
                  {link.name}
                </p>
              </li>
            ))}

          </ul>
          
          <div
            className="w-[48px] h-[48px] rounded-[10px] bg-[#ef3038] flex justify-center items-center cursor-pointer mt-4"
            onClick={handleLogout}
          >
            <img src={logout} alt="logout" className="w-[60%] h-[60%] object-contain" />
          </div>
        </div>
      </div>

      <div className="hover:text-purple-500 hover:border-purple-500 cursor-pointer px-4 py-2 font-extrabold text-purple-300 border border-purple-300 rounded-md">
          <div
            className=""
            id="walletButton"
            onClick={connectWalletPressed}
          >
            {walletAddress.length > 0 ? (
              "Connected: " +
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            ) : (
              <span>Connect Wallet</span>
            )}
          </div>
        </div>

    </div>
  )
}

export default Header;
