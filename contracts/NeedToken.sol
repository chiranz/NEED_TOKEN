//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NeedToken is ERC20 {
    // A better form of UBI where you can claim need token and later burn it
    // to support the network.
    uint256 public immutable defaultTrustScore = 10;

    mapping(address => bool) private claimed;
    mapping(address => uint256) private trustScore;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100 * 10**decimals());
        claimed[msg.sender] = true;
    }

    function mint() external returns (bool) {
        bool scammer;
        if (claimed[msg.sender]) {
            trustScore[msg.sender] -= 3;
            scammer = true;
            return false;
        } else {
            _mint(msg.sender, 100 * 10**decimals());
            claimed[msg.sender] = true;
            trustScore[msg.sender] = defaultTrustScore;
        }

        return true;
    }

    // Burn to support the cause
    function burn(uint256 amount) external returns (bool) {
        _burn(msg.sender, amount);
        return true;
    }

    // Trust Score of network participant
    function trustScoreOf(address _address) external view returns (uint256) {
        return trustScore[_address];
    }
}
