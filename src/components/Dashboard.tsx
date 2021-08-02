import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { Web3Context } from '../context/web3-context';
import Oracle from './OracleCard';
import SkillCard from './SkillCard';

function Dashboard() {
  const web3 = useContext(Web3Context);

  return (
    <Grid item container spacing={3} direction="row">
      <Grid item xs>
        <Oracle />
      </Grid>
      <Grid item xs>
        <SkillCard />
      </Grid>
    </Grid>
  );
}
export default Dashboard;
