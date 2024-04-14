// Specifies the version of Solidity.
pragma solidity 0.8.25;

/// @title - A simple contract for transferring Seporia testnet tokens
contract SepoliaTokenTransfer {
    // Sepolia token contract address
    address public sepoliaTokenAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789;

    // Transfer Sepolia tokens to a given address.
    function transferToken(
        address _to, //destination address
        uint256 _value // token amount
        ) 
        public returns (bool success) {
        // Interface of the Sepolia token contract
        SepoliaToken sepoliaToken = SepoliaToken(sepoliaTokenAddress);
        // Transfer tokens using the transfer function of the Sepolia token contract
        require(sepoliaToken.transfer(_to, _value), "Transfer failed");
        return true;
    }
}

// Interface of the Sepolia token contract
interface SepoliaToken {
    function transfer(address to, uint256 value) external returns (bool);
}