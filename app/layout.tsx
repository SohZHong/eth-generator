"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import AccountContext from '../context/context';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* Create local state to save account information after signin */
  const [account, setAccount] = useState<String>('');

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, //required
      options: {
        infuraId: "your-infura-id"
      }
    } 
  };

  /* Web3Modal configuration to enable wallet access */
  async function getWeb3Modal(){
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
    })
    return web3Modal;
  }
  
  async function connect(){
    try {
      const instance = await getWeb3Modal();
      const connection = await instance.connect();
      const provider = new ethers.BrowserProvider(connection);
      const accounts = await provider.listAccounts();
      // Grab the first account
      setAccount(accounts[0].address);
      // Flag for global access on checking connectivity
      localStorage.setItem("isWalletConnected", 'true');
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="p-10 flex items-center justify-end">
          {
            !account 
              ? 
              <button className="dark:text-white p-3 border border-white rounded-md" onClick={connect}>
                Connect
              </button>
              :
              <div className="p-3 dark:text-white border border-white rounded-md">
                {account}
              </div>
          }
        </nav>
        <AccountContext.Provider value={account}>
          {children}
        </AccountContext.Provider>
      </body>
    </html>
  );
}
