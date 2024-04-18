import { ethers } from "ethers";
import config from "../config";

export async function transferToken(receiverAddress: string, amount: string) {
    if (typeof window.ethereum !== "undefined"){
        // Provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        // Signer
        const signer = await provider.getSigner();
        // Contract Address
        const contractAddress = config.contractAddresses.transferToken.address;
        // Contract ABI
        const abi = config.contractAddresses.transferToken.abi;
        // Contract
        const transferContract = new ethers.Contract(contractAddress, abi, signer);
        try {
            // Execute the transfer method in the contract
            const amountValue = ethers.parseEther(amount);
            const tx = await transferContract.transfer(receiverAddress, amountValue);
            console.log("Transaction Successful!", tx);
        } catch (error) {
            console.error("Insufficient token balances:", error);
            throw error;
        }
    }
    else {
        console.error("Wallet Not Connected!");
    }
}