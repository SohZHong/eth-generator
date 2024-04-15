import { ethers } from "ethers";
import config from "../config";

export async function transferToken(account: string | null, receiverAddress: string, amount: string) {
    //Provider
    const alchemyProvider = new ethers.JsonRpcProvider(config.alchemyApiUrl);
    // Contract Address
    const contractAddress = config.contractAddresses.transferToken.address;
    // Contract ABI
    const abi = config.contractAddresses.transferToken.abi;
    // Contract
    const transferContract = new ethers.Contract(contractAddress, abi, alchemyProvider);
    
    try {
        if (!account) {
            console.error("Wallet not connected!");
            return;
        }
        // Execute the transfer method in the contract
        const tx = await transferContract.transfer(receiverAddress, amount);
        console.log("Transaction Successful!", tx);
    } catch (error) {
        console.error("Error retrieving token balances:", error);
        throw error;
    }
}