import { Network } from 'alchemy-sdk';
import tokenTransferAbi from "./contracts/TokenTransfer.json";
import checkBalanceAbi from "./contracts/CheckBalance.json";

const config = {
    alchemyApiKey: "KDEGdFfFHH-leVvss6lolaYLe5XVohb3", // Change accordingly
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
}

export default config