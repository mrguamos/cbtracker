import { Card, CardContent, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Web3Context } from '../context/web3-context';

const oracleAddress = '0x1cbfa0ec28da66896946474b2a93856eb725fbba';
const defaultAddress = '0x0000000000000000000000000000000000000000';

function OracleCard() {
  const web3 = React.useContext(Web3Context);
  const [oracleState, setOracleState] = useState(0);

  useEffect(() => {
    const getOraclePrice = async () => {
      const res = await fetch('/contracts/BasicPriceOracle.json');
      const oracleContract = await res.json();
      const Oracle = new web3.eth.Contract(oracleContract.abi, oracleAddress);
      const price = await Oracle.methods
        .currentPrice()
        .call({ from: defaultAddress });
      setOracleState(1 / Number(web3.utils.fromWei(price, 'ether')));
    };
    getOraclePrice();
  }, []);

  return (
    <Card
      elevation={5}
      style={{
        background:
          'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,30,121,1) 35%, rgba(0,212,255,1) 100%)',
      }}
    >
      <CardContent>
        <Typography style={{ color: 'white' }} gutterBottom>
          Oracle
        </Typography>
        <Typography style={{ color: 'white' }} variant="h5" component="h2">
          ${oracleState}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default OracleCard;
