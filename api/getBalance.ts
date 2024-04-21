import { alchemy } from "./settings";
import config from "../config";
import { ethers } from "ethers";

// Contract Address
const contractAddress = config.contractAddresses.checkBalance.address;

// Using Alchemy
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

// Using Ethers
export async function getBalance(walletAddress: string): Promise<string> {
    try {
        if (typeof window.ethereum !== "undefined"){
            const ethersProvider = new ethers.BrowserProvider(window.ethereum);
            // Retrieve wallet balance
            const balances = await ethersProvider.getBalance(walletAddress);
            return ethers.formatEther(balances);
        }
        else {
            console.error("Wallet not connected!");
            throw new Error("Wallet not connected!");
        }
    } catch (error) {
        console.error("Error retrieving token balances:", error);
        throw error;
    }
}