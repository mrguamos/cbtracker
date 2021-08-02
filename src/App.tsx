import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Web3Provider from './context/web3-context';
import { Box, Container, Toolbar, Typography } from '@material-ui/core';
import { AppBar } from '@material-ui/core';

function App() {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">CryptoBlades Tracker</Typography>
        </Toolbar>
      </AppBar>
      <Container component={Box} fixed m={10}>
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
    </div>
  );
}

export default App;
