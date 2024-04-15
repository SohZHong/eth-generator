"use client";
import AccountContext from "@/context/context";
import { useContext, useEffect, useState } from "react";
import { transferToken } from "@/api/transferToken";
import { getBalance } from "@/api/getBalance";

export default function Home() {
  const [receiverAddress, setReceiverAddress] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [balance, setBalance] = useState<number | null>(null);
  // Obtain current selected account
  const account = useContext(AccountContext);
  // Handle Address Change
  const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(e.target.value);
  }
  // Handle Amount Change
  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)){
      setAmount(value);
    }
  }
  // Function to handle transfers
  const handleTransfer = async () => {
    if (amount == 0){
      setErrorMsg("Invalid Amount!");
    }
    else if (receiverAddress == '') {
      setErrorMsg("Empty Receiver Address!")
    }
    else {
      transferToken(account, receiverAddress, String(amount));
    }
  }

  useEffect(() => {
    // Fetch balance when account changes
    if (account) {
      getBalance(account)
        .then(balance => setBalance(balance))
        .catch(error => console.error("Error fetching balance:", error));
    }
  }, [account]); // Run effect when account changes

  return (
    <main className="flex flex-col gap-5 items-center justify-between p-24">
      <h1 className="text-2xl font-bold">Sepolia Boilerplate</h1>
      <div className="p-3 dark:text-white border border-white rounded-md">
        Connected Account: {!account ? "Not Connected" : account}
      </div>
      <div className="p-3 dark:text-white border border-white rounded-md">
        Balance: {balance === null ? "Loading..." : balance}
      </div>
      {
        account 
        &&
        <div  className="flex flex-col items-center">
          <label htmlFor="address" className="text-lg font-bold">Receiver Address:</label><br></br>
          <input 
            type="text" 
            className="p-3 bg-transparent border border-white rounded-md outline-none" 
            value={receiverAddress} 
            name="address" 
            onChange={onAddressChange}
          />
          <br></br>
          <label htmlFor="amount" className="text-lg font-bold">Amount:</label><br></br>
          <input 
            type="number" 
            className="p-3 bg-transparent border border-white rounded-md outline-none" 
            value={amount} 
            name="amount" 
            onChange={onAmountChange}
          />
          <br></br>
          <button onClick={handleTransfer} type="button">
            Send Tokens
          </button>
        </div>
      }
      {
        errorMsg != ''
        &&
        <div className="text-red-500">{errorMsg}</div>
      }
    </main>
  );
}
