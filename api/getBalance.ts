import { alchemy } from "./settings";
import config from "../config";

const contractAddress = config.contractAddresses.checkBalance;

export async function getBalance(walletAddress: string) {
    try {
        // Retrieve wallet balance
        const balances = await alchemy.core.getTokenBalances(walletAddress, [contractAddress]);
        return balances;
    } catch (error) {
        console.error("Error retrieving token balances:", error);
        throw error;
    }
}