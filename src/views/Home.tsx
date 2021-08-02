import { Grid } from '@material-ui/core';
import React from 'react';
import Accounts from '../components/Accounts';
import Dashboard from '../components/Dashboard';

function Home() {
  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Dashboard />
      </Grid>
      <Grid item>
        <Accounts />
      </Grid>
    </Grid>
  );
}

export default Home;
