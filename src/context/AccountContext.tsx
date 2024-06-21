
import { JsonRpcSigner } from 'ethers';
import { Provider } from 'ethers';
import React, { createContext, useContext, useState,ReactNode, Children } from 'react';

interface AccountType {
  isConnected: boolean;
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
  provider?: Provider;
  signer?: JsonRpcSigner;
}

interface AccountProviderProps {
  children?: ReactNode | ReactNode[]; 
}

const AccountContext = createContext<{ accountPData: AccountType; setAccountPData: React.Dispatch<React.SetStateAction<AccountType>> }>({
  accountPData: {
    isConnected: false,
    address: undefined,
    balance: undefined,
    chainId: undefined,
    network: undefined,
    provider: undefined,
    signer: undefined,

  },
  setAccountPData: () => {},
});

export const useAccount = () => useContext(AccountContext);

export const AccountProvider: React.FC<AccountProviderProps> = ({children}) => {
  const [accountPData, setAccountPData] = useState<AccountType>({
    isConnected: false,
    address: undefined,
    balance: undefined,
    chainId: undefined,
    network: undefined,
    provider: undefined,
    signer: undefined
  });

  return (
    <AccountContext.Provider value={{ accountPData, setAccountPData }}>
      {children}
    </AccountContext.Provider>
  );
};