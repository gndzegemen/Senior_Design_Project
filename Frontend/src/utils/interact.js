import { LOCK_ADDRESS } from "../constants/addresses";
import { LOCK_ABI } from "../constants/abi";

const ethers = require("ethers");

const providerUrl = process.env.API_URL;
// const provider = new ethers.providers.JsonRpcProvider(window.ethereum);
const provider = new ethers.providers.Web3Provider(window.ethereum);
console.log(providerUrl);
const signer = provider.getSigner();

export const nftContract = new ethers.Contract(LOCK_ADDRESS, LOCK_ABI, signer);

export const connectWallet = async () => {
  console.log("connected");
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return {
        status: "connected",
        address: accounts[0],
      };
    } catch (error) {
      return {
        address: "",
        status: "😞 " + error.message,
      };
    }
  } else {
    return {
      address: "",
      status: "You have to install MetaMask first!",
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (error) {
      return {
        address: "",
        status: "😥 " + error.message,
      };
    }
  } else {
    return {
      address: "",
      status: "🦊 Install Metamask",
    };
  }
};

export const mintNFT = async () => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: (
        <p>
          🦊 Connect to Metamask using{" "}
          <span className="px-2 text-purple-600">Connect Wallet</span> button.
        </p>
      ),
    };
  }

  try {
    // Mint the NFT as before
    const account = (await getCurrentWalletConnected()).address;
    const tx = await nftContract.safeMint(account, {
      value: ethers.utils.parseEther((0.01).toString()),
    });
    const receipt = await tx.wait();

      // Get the tokenId from the transaction receipt.
  const tokenId = receipt.events ? receipt.events.find(e => e.event === 'Transfer').args.tokenId : null;
  
  // Get the token URI
  let tokenURI = null;
  if (tokenId !== null) {
    tokenURI = await nftContract.tokenURI(tokenId);
  }
  const contractAddress = nftContract.address;
  return {
    success: true,
    status: "✅ Check out your transaction on Etherscan: https://sepolia.etherscan.io/tx/" + receipt.transactionHash,
    tokenURI: tokenURI,
    contractAddress: contractAddress,
  };
} catch (error) {
  return {
    success: false,
    status: "Something went wrong: " + error.message,
  };
  }
};
export const checkBalance = async () => {
  if (!(await connectWallet())) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const currAcc = (await getCurrentWalletConnected()).address
  const balance = await provider.getBalance(currAcc);
  return ethers.utils.formatEther(balance);
};

export const PersonMaxMintAmount = async () => {
  const amountHex = await nftContract.perPersonMaxMintAmount();
  return amountHex;
};
export const totalSupply = async () => {
  const supply = await nftContract.totalSupply();
  return supply.toString();
};

export const contractName = async () => {
  const name = await nftContract.name();
  return name;
};

export const getNFTOwner = async (id) => {
  const owner = await nftContract.ownerOf(id);
  return owner;
};

export const contractOwnerr = async () => {
  const own = await nftContract.owner();
  return own;
};

export const transfer = async (transferTo, id) => {
  if (!ethers.utils.isAddress(transferTo)) {
    console.log(`Invalid address: ${transferTo}`);
    return;
  }
  
  if (!(await connectWallet())) return;

  const owner = await getNFTOwner(id);
  const currAcc = (await getCurrentWalletConnected()).address;
  console.log(owner);
  console.log(currAcc);

  const isAproved = owner.toLowerCase() === currAcc.toLowerCase();

  console.log(isAproved);

  if (isAproved) {
    await nftContract.transferFrom(currAcc, transferTo, id);
  } else {
  }
};