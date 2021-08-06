import { Card, CardContent, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Web3Context, defaultAddress } from '../context/web3-context';

function OracleCard() {
  const cbContext = React.useContext(Web3Context);

  const [oracleState, setOracleState] = useState(0);
  const getOraclePrice = async () => {
    const price = await cbContext.cb.oracle.methods
      .currentPrice()
      .call({ from: defaultAddress });
    setOracleState(1 / Number(cbContext.web3.utils.fromWei(price, 'ether')));
  };

  useEffect(() => {
    getOraclePrice();
  }, []);

  return (
    <Card
      raised
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
