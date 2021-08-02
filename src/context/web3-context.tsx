import * as React from 'react';
import { useEffect } from 'react';
import Web3 from 'web3';

const web3Instance = new Web3(
  Web3.givenProvider || 'https://bsc-dataseed1.defibit.io/',
);
export const Web3Context = React.createContext(web3Instance);
const Web3Provider: React.FC = ({ children }) => {
  return <> {children} </>;
};

export default Web3Provider;
