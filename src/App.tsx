import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Web3Provider from './context/web3-context';
import { Box, Container, Toolbar, Typography } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">CryptoBlades Tracker</Typography>
        </Toolbar>
      </AppBar>
      <Container fixed component={Box} m={10}>
        <Web3Provider>
          <Router>
            <div>
              {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </Router>
        </Web3Provider>
      </Container>
    </React.Fragment>
  );
}

export default App;
