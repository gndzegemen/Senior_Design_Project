// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract Ejderyaa is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
//     using Counters for Counters.Counter;
//     uint256 public cost = 0.01 ether;
//     uint256 public maxSupply = 109;

//     Counters.Counter private _tokenIdCounter;

//     string private _baseTokenURI;

//     constructor() ERC721("Ejderyaa", "EJJ") {}

//     function _baseURI() internal view override returns (string memory) {
//         return _baseTokenURI;
//     }

//     function setBaseURI(string calldata newBaseTokenURI) public onlyOwner {
//         _baseTokenURI = newBaseTokenURI;
//     }

//     function getBaseURI() public view returns (string memory) {
//         return _baseTokenURI;
//     }

//     function setCost(uint256 newCost) public onlyOwner {
//         cost = newCost;
//     }

//     function setMaxSupply(uint256 newSupply) public onlyOwner {
//         maxSupply = newSupply;
//     }

//     function safeMint(address to) public payable {
//         require(bytes(_baseTokenURI).length > 0, "Base URI not set");
//         if (_tokenIdCounter.current() == 0) {
//             _tokenIdCounter.increment();
//         }

//         uint256 minCount = totalSupply();
//         require(minCount < maxSupply, "Maximum supply reached");
//         require(msg.value >= cost, "Not enough Ether provided for minting");

//         uint256 tokenId = _tokenIdCounter.current();
//         _tokenIdCounter.increment();
//         _safeMint(to, tokenId);
//     }

//     // The following functions are overrides required by Solidity.

//     function _beforeTokenTransfer(
//         address from,
//         address to,
//         uint256 tokenId,
//         uint256 batchSize
//     ) internal override(ERC721, ERC721Enumerable) {
//         super._beforeTokenTransfer(from, to, tokenId, batchSize);
//     }

//     function supportsInterface(
//         bytes4 interfaceId
//     ) public view override(ERC721, ERC721Enumerable) returns (bool) {
//         return super.supportsInterface(interfaceId);
//     }

//     function burnNFT(uint256 tokenId) public {
//         require(
//             _isApprovedOrOwner(_msgSender(), tokenId),
//             "Caller is not owner nor approved"
//         );
//         burn(tokenId);
//     }
// }
