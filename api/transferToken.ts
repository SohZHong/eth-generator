import { Contract } from "web3";
import config from "../config";
import { useContext } from "react";
import AccountContext from "@/context/context";

// Contract Address
const contractAddress = config.contractAddresses.transferToken.address;
// Contract ABI
const abi = config.contractAddresses.transferToken.abi;
// Contract
const transferContract = new Contract(abi, contractAddress);
// Wallet
const account = useContext(AccountContext);

export async function transferToken(receiverAddress: string, amount: string) {
    try {
        if (!account) {
            console.error("Wallet not connected!");
            return;
        }
        // Execute the transfer method in the contract
        const tx = await transferContract.methods.transferToken(receiverAddress, amount);
        console.log("Transaction Successful!", tx);
    } catch (error) {
        console.error("Error retrieving token balances:", error);
        throw error;
    }
}