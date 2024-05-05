import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { LOCK_ADDRESS  } from "../../constants/addresses";
import { LOCK_ABI  } from "../../constants/abi";
import './Library.scss';
import { transfer } from "../../utils/interact"
import { baseUrl } from "../../helper/urls";
import axios from "axios";



const apps = []

const Library = () => {

  const [lastProduct, setLastProduct] = useState(null);

  useEffect(() => {
    // localStorage'dan son görüntülenen ürünün ID'sini alın
    const lastProductID = localStorage.getItem('lastProductID');
  
    // Eğer ID mevcutsa, ilgili ürünü çekin
    if (lastProductID) {
      axios
        .get(`${baseUrl}/api/data/${lastProductID}`)
        .then((response) => {
          // Ürün bilgilerini duruma kaydedin veya istediğiniz bir işlemi gerçekleştirin
          setLastProduct(response.data);
          apps.push();
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, []);
  

  const [nfts, setNfts] = useState([]);

  const getNFTsWithMetadata = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(LOCK_ADDRESS, LOCK_ABI, signer);

    try {
      const balance = await contract.balanceOf(address);
      const nftsData = [];

      for (let i = 0; i < balance; i++) {
        const nftId = await contract.tokenOfOwnerByIndex(address, i);
        const tokenURI = await contract.tokenURI(nftId);
        const metadataResponse = await fetch(tokenURI);
        const metadata = await metadataResponse.json();

        const image = metadata.image_url || metadata.image; // Use image_url, as it seems to be the format used by CryptoKitties
        nftsData.push({
          id: nftId.toString(),
          name: metadata.name,
          image: image,
        });
      }

      setNfts(nftsData);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      signer.getAddress().then(address => getNFTsWithMetadata(address));
    }
  }, []);

  const [flipStatus, setFlipStatus] = useState({});
  const [transferTo, setTransferTo] = useState({});
  const [CurrentNFTID, setCurrentNFTID] = useState(null);

  const handleFlip = (id) => {
    setFlipStatus(prev => ({ ...prev, [id]: !prev[id] }));
    const x = Number(id)
    setCurrentNFTID(x);
  };

  const handleTransferChange = (id, e) => {
    setTransferTo(prev => ({ ...prev, [id]: e.target.value }));
  };
  const traans = () => {
    console.log(CurrentNFTID);
  };

  return (
    <div className="library">
      <div className="flex-wrap">
        {nfts.map((nft) => (
          <div key={nft.id} className="container">
            {flipStatus[nft.id] ? (
              <>
                <img
                  src={nft.image}
                  alt={nft.name}
                  onClick={() => handleFlip(nft.id)}
                />
                <div className="button-container">
                <button className="transfer-button" onClick={()=>transfer(transferTo[CurrentNFTID],CurrentNFTID)}>Transfer</button>

                </div>
                <input
                  type="text"
                  placeholder="Transfer to..."
                  value={transferTo[nft.id] || ""}
                  onChange={(e) => handleTransferChange(nft.id, e)}
                />
                
              </>
            ) : (
              <>
                <img
                  src={nft.image}
                  alt={nft.name}
                  onClick={() => handleFlip(nft.id)}
                />
                <div className="button-container">
                  <div className="nftnam">{nft.name}</div>

                <a className="start-button" href="http://localhost:3005/display" target="_blank">Start</a>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

}

export default Library;