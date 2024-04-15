import { alchemy } from "./settings";
import config from "../config";
import { ethers } from "ethers";

// Contract Address
const contractAddress = config.contractAddresses.checkBalance.address;
// Provider
const alchemyProvider = new ethers.JsonRpcProvider(config.alchemyApiUrl);

export async function getBalanceAsJson(walletAddress: string) {
    try {
        // Retrieve wallet balance
        const balances = await alchemy.core.getTokenBalances(walletAddress, [contractAddress]);
        return balances;
    } catch (error) {
        console.error("Error retrieving token balances:", error);
        throw error;
    }
}

export async function getBalance(walletAddress: string): Promise<number> {
    try {
        // Retrieve wallet balance
        const balances = await alchemyProvider.getBalance(walletAddress);
        console.log(balances)
        return Number(balances);
    } catch (error) {
        console.error("Error retrieving token balances:", error);
        throw error;
    }
}