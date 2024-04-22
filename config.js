import { Network } from 'alchemy-sdk';
import tokenTransferAbi from "./contracts/TokenTransfer.json";
import checkBalanceAbi from "./contracts/CheckBalance.json";

const alchemyApiKey = "KDEGdFfFHH-leVvss6lolaYLe5XVohb3";

const config = {
    alchemyApiKey: alchemyApiKey, // Change accordingly
    alchemyApiUrl: `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
    network: Network.ETH_SEPOLIA, // Change to Network.ETH_MAINNET when developing on main net
    contractAddresses: {
        checkBalance: {
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            abi: checkBalanceAbi,
        },
        transferToken: {
            address: "0xd9145CCE52D386f254917e481eB44e9943F39138",
            abi: tokenTransferAbi,
        },
    },
    etherScanApiKey: "QY5S11KJFDWKJXGA7IUHE75NNWQDWKKEBT", // Change accordingly
    etherScanApiUrl: "https://api-sepolia.etherscan.io/api" // Change to https://api.etherscan.io/api when on mainnet
}

export default config