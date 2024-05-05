import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { LOCK_ADDRESS } from "../../constants/addresses";
import { LOCK_ABI } from "../../constants/abi";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Display.scss";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
  nftContract,
  checkBalance,
  PersonMaxMintAmount,
  getNFTOwner,
  contractOwner,
} from "../../utils/interact";
import { baseUrl } from "../../helper/urls";

function Display() {
  const [message, setMessage] = useState("");
  const [contract, setContract] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [nftIdInput, setNftIdInput] = useState("");
  const [cookies, , removeCookie] = useCookies(["jwtToken"]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.jwtToken) {
      navigate("/");
    }
  }, [cookies.jwtToken, navigate]);

  const handleLogout = () => {
    removeCookie("jwtToken");
    navigate("/login");
  };

  const [kitties, setKitties] = useState([]);

  const [offset, setOffset] = useState(0);

  const fetchCryptoKitties = async (kittyLimit = 20, kittyOffset = 0) => {
    //if (!(await connectWallet())) return;
    try {
      const response = await fetch(
        `https://api.cryptokitties.co/kitties?limit=${kittyLimit}&offset=${kittyOffset}`
      );
      const data = await response.json();
      setKitties((prevKitties) => [...prevKitties, ...data.kitties]);
    } catch (error) {
      console.error("Error fetching CryptoKitties:", error);
      setMessage("Error fetching CryptoKitties");
    }
  };

  const fetchMoreCryptoKitties = async (newLimit) => {
    if (!(await connectWallet())) return;
    setOffset((prevOffset) => prevOffset + newLimit);
  };

  const getNFTsWithMetadata = async (address) => {
    if (!(await connectWallet())) return;
    try {
      const balance = await contract.balanceOf(address);
      const nftsData = [];

      for (let i = 0; i < balance; i++) {
        const nftId = await contract.tokenOfOwnerByIndex(address, i);
        const tokenURI = await contract.tokenURI(nftId);
        const metadataResponse = await fetch(tokenURI);
        const metadata = await metadataResponse.json();

        const image = metadata.image_url || metadata.image; // Use image_url, as it seems to be the format used by CryptoKitties
        console.log(image);
        nftsData.push({
          id: nftId.toString(),
          name: metadata.name,
          image: image,
        });
      }

      setNfts(nftsData);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      setMessage("Error fetching NFTs");
    }
  };

  const transfer = async () => {
    if (!(await connectWallet())) return;

    const nftID = parseInt(nftIdInput); // Use the input value
    const owner = await getNFTOwner(nftID);
    const currAcc = account;
    console.log(owner);

    console.log(currAcc);
    const isAproved = owner.toLowerCase() === currAcc.toLowerCase();

    setMessage(isAproved.toString());

    if (isAproved) {
      await contract.transferFrom(currAcc, toAddress, nftID);
    } else {
    }
  };

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const prepare = async () => {
      const walletResponse = await getCurrentWalletConnected();
      setAccount(walletResponse.address);
      addWalletListener();
    };

    prepare();
  }, []);

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount("");
        }
      });
    }
  };
  const getNFTsOfAccount = async () => {
    if (!(await connectWallet())) return;
    const address = (await getCurrentWalletConnected()).address;
    if (address) {
      getNFTsWithMetadata(address);
    }
  };

  const postnft = async (tokenURI, contract) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/auth/register",
        {
          tokenURI, contract
        }
      );

      console.log("Post request was successful: ", response);
    } catch (error) {
      console.error("Error with POST request: ", error);
    }
  };


  const Mintt = async () => {
    const result = await mintNFT();
    if (result.success) {
      console.log(
        `Minting was successful! Here is the token URI: ${result.tokenURI}`
      );

      postnft(result.tokenURI, result.contractAddress)

    } else {
      console.error(`Minting failed: ${result.status}`);
      throw new Error(result.status);
    }
  };

  const fetchUserIfo = async () => {

    const userid = window.localStorage.getItem('userID');
    console.log(userid);
    const infos = await axios.get(`${baseUrl}/api/data/${userid}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

    console.log(infos);
  }




  useEffect(() => {
    setContract(nftContract);
  }, []);

  useEffect(() => {
    if (offset !== 0) {
      fetchCryptoKitties(20, offset);
    }
  }, [offset]);

  return (
    <div className="Display">
      <div>
        <header className="App-header">
          <Link to="/">
            <button onClick={handleLogout}>Logout</button>
          </Link>
          <button onClick={transfer}>transfer NFT</button>
          <div>
            <label htmlFor="toAddress">To Address:</label>
            <input
              type="text"
              id="toAddress"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="nftIdInput">NFT ID:</label>
            <input
              type="text"
              id="nftIdInput"
              value={nftIdInput}
              onChange={(e) => setNftIdInput(e.target.value)}
            />
          </div>

          <button onClick={getNFTsOfAccount}>Show NFTs</button>
          <button onClick={fetchUserIfo}>Show user</button>
          <button onClick={() => fetchCryptoKitties(10)}>
            Fetch CryptoKitties
          </button>
          <button onClick={() => fetchMoreCryptoKitties(10)}>
            Fetch more CryptoKitties
          </button>
          <button onClick={() => Mintt()}>mint nft</button>
          <button onClick={() => postnft("https://api.cryptokitties.co/kitties/25", "0x86386a2704e2a187ed65b7bd4695ceaf0a3b47bd")}>post</button>

          <p>{message}</p>
          <p>Current account: {account || "No account selected"}</p>
        </header>
        <div className="nfts-container">
          {nfts.map((nft) => (
            <div key={nft.id} className="nft">
              <p>{nft.name}</p>
              <img src={nft.image} alt={nft.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Display;