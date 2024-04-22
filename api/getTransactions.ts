import Web3 from "web3";
import config from "../config";
import axios from "axios";

// Gets transactions from the most recent block only, does not consider historical data
// export async function getRecentTransactions(address: string) {
//     // Create Web3 instance with Alchemy
//     const web3 = new Web3(config.alchemyApiUrl);
//     // Obtain latest block
//     let block = await web3.eth.getBlock('latest');
//     // Get transactions from the block
//     let transactions = block.transactions;
//     // Create array instance to store values
//     const transactionList: string[] = [];
//     // Check if said wallet exists or had any transactions
//     if (block != null && transactions != null) {
//         for (let txHash of transactions) {
//             let tx = await web3.eth.getTransaction(txHash as Bytes);
//             // Check if transaction recipient matches the specified address
//             if (address == tx.to?.toLowerCase() || address == tx.from.toLowerCase()) {
//                 let transaction = "from: " + tx.from.toLowerCase() + " to: " + tx.to?.toLowerCase() + " value: " + web3.utils.fromWei(tx.value, 'ether') + ' ETH';
//                 console.log("Transaction: " + transaction);
//                 transactionList.push(transaction);  // Add transaction info to the list
//             }
//         }
//     }
//     return transactionList;
// }

// Refer to https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-internal-transactions-by-address for response sample
export async function getTransactions(address: string): Promise<string[]>{
    // Create Web3 instance with Alchemy
    const web3 = new Web3(config.alchemyApiUrl);
    // Endpoint URL
    const url = `${config.etherScanApiUrl}?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=9999999&page=1&offset=10&sort=asc&apikey=${config.etherScanApiKey}`;
   console.log(url);
    const transactionList:string[] = [];
   // Fetch data using axios
   axios.get(url)
        .then(response => {
            const data = response.data;
            console.log(data);
            // If transaction is successful
            if (data.status === "1"){
                data.result.forEach((tx: { from: string; to: string; value: string; }) => {
                    let txStr = "from: " + tx.from.toLowerCase() + " to: " + tx.to.toLowerCase() + " value: " + web3.utils.fromWei(tx.value, 'ether') + ' ETH';
                    transactionList.push(txStr);
                });
            }
            else {
                console.error("Failed to retrieve transactions: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching data from Etherscan:', error);
        })
    return transactionList;
}