import { Network } from 'alchemy-sdk';

const config = {
    alchemyApiKey: "BfLGjihpJNXOGndNQayT1N7X1l4_OpAD",
    network: Network.ETH_SEPOLIA, // Change to Network.ETH_MAINNET when developing on main net
    contractAddresses: {
        checkBalance: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        transferToken: "0xd9145CCE52D386f254917e481eB44e9943F39138",
    },
}

export default config