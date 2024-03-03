import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface MetaMaskConnectProps {
  onConnect: (account: string) => void;
  onDisconnect: () => void;
}

const MetaMaskConnect: React.FC<MetaMaskConnectProps> = ({ onConnect, onDisconnect }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    connectToMetaMask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to connect to MetaMask
  const connectToMetaMask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Connect to MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);

        // Get selected account
        const accounts = await web3Instance.eth.getAccounts();
        const selectedAccount = accounts[0];

        setAccount(selectedAccount);
        onConnect(selectedAccount);

        // Fetch account balance
        const weiBalance = await web3Instance.eth.getBalance(selectedAccount);
        const etherBalance = web3Instance.utils.fromWei(weiBalance, 'ether');
        setBalance(etherBalance);
      } else {
        alert('MetaMask is not installed');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Error connecting to MetaMask. Please try again.');
    }
  };

  // Function to disconnect MetaMask
  const disconnectFromMetaMask = () => {
    setAccount(null);
    setBalance('0');
    onDisconnect();
  };

  return (
    <div>
      {account ? (
        <div className="mb-4">
          <p>Connected Account: {account}</p>
          <p>Account Balance: {balance} ETH</p>
          <button onClick={disconnectFromMetaMask} className="mt-2 bg-red-500 text-white rounded-md px-4 py-2">
            Disconnect
          </button>
        </div>
      ) : (
        <button onClick={connectToMetaMask} className="bg-blue-500 text-white rounded-md px-4 py-2">
          Connect to MetaMask
        </button>
      )}
    </div>
  );
};

export default MetaMaskConnect;
