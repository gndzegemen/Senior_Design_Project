import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import KeyIcon from "@mui/icons-material/Key";
import Warning from "./components/Warning";
import { useNavigate } from "react-router-dom";
import "./Product.scss";
import { baseUrl } from "../../../helper/urls";
import { mintNFT } from "../../../utils/interact";

const Product = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [cookies] = useCookies(["jwtToken"]);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/data/${id}`)
      .then((response) => {
        setItem(response.data);
        // ürün ID'sini localStorage'a ekleyin
        localStorage.setItem('lastProductID', id);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [id]);
  

  const postnft = async (tokenURI, contract) => {
    try {
      const response = await axios.post(`${item.registerUrl}`, {
        tokenURI,
        contract,
      });
      // const response = await axios.post("http://localhost:3002/auth/register", {
      //   tokenURI,
      //   contract,
      // });      

      console.log("Post request was successful: ", response);
    } catch (error) {
      console.error("Error with POST request: ", error);
    }
  };

  const handleMint = async () => {
    if (!cookies.jwtToken) {
      setShowWarning(true);
    } else {
      const result = await mintNFT();
      if (result.success) {
        console.log(
          `Minting was successful! Here is the token URI: ${result.tokenURI}`
        );

        postnft(result.tokenURI, result.contractAddress);

      
        
      } else {
        console.error(`Minting failed: ${result.status}`);
        throw new Error(result.status);
      }

      navigate("/mainpage/library");
    }
  };

 

  if (item === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          <img src={item.img} alt="" onClick={() => setSelectedImg(0)} />
          {item.img2 && (
            <img src={item.img2} alt="" onClick={() => setSelectedImg(1)} />
          )}
        </div>
        <div className="mainImg">
          <img
            src={selectedImg === 0 ? item.img : item.img2 || item.img}
            alt=""
          />
        </div>
      </div>
      <div className="right">
        <h1>{item.title}</h1>
        <span>${item.price + ""}</span>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
          nostrum consectetur optio corrupti in autem minima officiis ducimus
          officia? Labore, numquam quod. Quis omnis possimus iste exercitationem
          ducimus explicabo perferendis.
        </p>

        <button className="mint" onClick={handleMint}>
          <KeyIcon /> Minting Authentication NFT
        </button>
        {showWarning && <Warning />}
        <div className="info">
          <span>Name: {item.title}</span>
          <span>Price: {item.price}</span>
        </div>
        <div className="details">
          <span>Description</span>
          <hr />
          <span>Additional information</span>
          <hr />
          <span>FAQ</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
