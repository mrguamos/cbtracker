import * as React from 'react';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

export const defaultAddress = '0x0000000000000000000000000000000000000000';
const oracleAddress = '0x1cbfa0ec28da66896946474b2a93856eb725fbba';
const stakingRewardAddress = '0xd6b2D8f59Bf30cfE7009fB4fC00a7b13Ca836A2c';
const stakingTokenAddress = '0x154a9f9cbd3449ad22fdae23044319d6ef2a1fab';
const mainAddress = '0x39Bea96e13453Ed52A734B6ACEeD4c41F57B2271';
const charAddress = '0xc6f252c2cdd4087e30608a35c022ce490b58179b';
const weapAddress = '0x7e091b0a220356b157131c831258a9c98ac8031a';

const web3 = new Web3(
  Web3.givenProvider || 'https://bsc-dataseed1.defibit.io/',
);

export const Web3Context = React.createContext({
  web3: web3,
  cb: null as null | any,
});
const Web3Provider: React.FC = ({ children }) => {
  const [cb, setCB] = useState({});
  const [loading, setLoading] = useState(true);

  async function initWeb3() {
    const cbInstance = {
      oracle: null as null | any,
      skillWallet: null as null | any,
    };
    let res = await fetch('/contracts/BasicPriceOracle.json');
    const oracle = await res.json();
    const oracleContract = new web3.eth.Contract(oracle.abi, oracleAddress);
    cbInstance.oracle = oracleContract;

    res = await fetch('/contracts/IERC20.json');
    const skillWallet = await res.json();
    const skillWalletContract = new web3.eth.Contract(
      skillWallet.abi,
      stakingTokenAddress,
    );
    cbInstance.skillWallet = skillWalletContract;
    setCB(cbInstance);
    setLoading(false);
  }

  useEffect(() => {
    initWeb3();
  }, [loading]);

  return (
    <Web3Context.Provider value={{ web3, cb }}>
      {loading ? <div>Loading...</div> : children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
