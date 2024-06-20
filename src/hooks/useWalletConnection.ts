import { useState, useCallback } from 'react';
import { ethers, Provider, JsonRpcSigner } from 'ethers';
import { useAccount } from '@/context/AccountContext';


interface WalletConnectionResult {
  isConnected: boolean;
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
  error?: string;
  provider?: Provider;
  signer?: JsonRpcSigner;
}

const useWalletConnection = (): { result: WalletConnectionResult; connectToMetaMask: () => Promise<void> } => {
  const [connectionStatus, setConnectionStatus] = useState<WalletConnectionResult>({
    isConnected: false,
    address: undefined,
    balance: undefined,
    chainId: undefined,
    network: undefined,
    error: undefined,
    provider: undefined,
    signer: undefined,
  });
  const { setAccountPData } = useAccount();


  const connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;

    if (typeof window.ethereum!== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const address = accounts[0];
        const provider = new ethers.BrowserProvider(ethereum);
        const balance = await provider.getBalance(address);
        const network = await provider.getNetwork();
        const signer = await provider.getSigner();
        const chainId = network.chainId;
        const formattedBalance = ethers.formatEther(balance);

        setConnectionStatus({
          isConnected: true,
          address,
          balance: formattedBalance,
          chainId: chainId.toString(),
          network: network.name,
          provider,
          signer,
        });
        setAccountPData({
          isConnected: true,
          address,
          balance: formattedBalance,
          chainId: chainId.toString(),
          network: network.name,
          provider,
          signer,
        })
      } catch (error) {
        setConnectionStatus({
         ...connectionStatus,
          isConnected: false,
          error: error instanceof Error? error.message : 'Failed to connect to MetaMask',
        });
      }
    } else {
      setConnectionStatus({
       ...connectionStatus,
        isConnected: false,
        error: 'MetaMask is not installed',
      });
      
    }
  }, []);

  return { result: connectionStatus, connectToMetaMask };
};

export default useWalletConnection;