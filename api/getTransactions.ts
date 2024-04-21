import Web3, { Bytes } from "web3";
import config from "../config";
import { getBalance } from "./getBalance";

// Heuristic approach to get all transactions from the specified address 
export async function getAllTransactions(address: string) {
    // Create Web3 instance with Alchemy
    const web3 = new Web3(config.alchemyApiUrl);
    // Block number
    let blockNum = await web3.eth.getBlockNumber();
    // Transaction count
    let n = await web3.eth.getTransactionCount(address, blockNum);
    // Balance
    let bal = Number(getBalance(address));
    // Create array instance to store values
    const transactionList: string[] = [];
    // Process block
    for (var i=blockNum; i >= 0 && (n > 0 || bal > 0); i--){
        try {
            // true to get all transactions as objects instead of hashes
            var block = await web3.eth.getBlock(i);
            var transactions = block.transactions;
            if (block && transactions) {
                for (let txHash of transactions) {
                    let tx = await web3.eth.getTransaction(txHash as Bytes);
                    // Verify if transactions were made from specified address
                    if (address == tx.from) {
                        // Exclude transferring to oneself
                        if (tx.from != tx.to)
                            bal += Number(tx.value);
                        let transaction = i + ": from: " + tx.from + ", to: " + tx.to + "value: " + tx.value.toString();
                        transactionList.push(transaction)
                        console.log(transaction);
                        --n;
                    }
                    if (address == tx.to) {
                        if (tx.from != tx.to)
                            bal -= Number(tx.value);
                        let transaction = i + ": from: " + tx.from + ", to: " + tx.to + "value: " + tx.value.toString();
                        transactionList.push(transaction);
                        console.log(transaction);
                    }
                };
            }
        } catch (e) { console.error("Error in block " + i, e); }
    }
    return transactionList;
}

// Gets transactions from the most recent block only, does not consider historical data
export async function getRecentTransactions(address: string) {
    // Create Web3 instance with Alchemy
    const web3 = new Web3(config.alchemyApiUrl);
    // Obtain latest block
    let block = await web3.eth.getBlock('latest');
    // Get transactions from the block
    let transactions = block.transactions;
    // Create array instance to store values
    const transactionList: string[] = [];
    // Check if said wallet exists or had any transactions
    if (block != null && transactions != null) {
        for (let txHash of transactions) {
            let tx = await web3.eth.getTransaction(txHash as Bytes);
            console.log(tx);
            // Check if transaction recipient matches the specified address
            if (address === tx.to?.toLowerCase()) {
                let transaction = "from: " + tx.from.toLowerCase() + " to: " + tx.to?.toLowerCase() + " value: " + web3.utils.fromWei(tx.value, 'ether') + ' ETH';
                console.log("Transaction: " + transaction);
                transactionList.push(transaction);  // Add transaction info to the list
            }
        }
    }
    return transactionList;
}
