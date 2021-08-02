import { Card, CardContent, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';

const currencies = ['usd'];

function SkillCard() {
  const [skillPrice, setSkilPrice] = useState(0);

  const getSkillPrice = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=cryptoblades,binancecoin,tether&vs_currencies=${currencies.join(
        ',',
      )}`,
    );
    const json = await res.json();
    setSkilPrice(json.cryptoblades.usd);
  };

  useEffect(() => {
    getSkillPrice();
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
          Skill
        </Typography>
        <Typography style={{ color: 'white' }} variant="h5" component="h2">
          ${skillPrice}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SkillCard;
