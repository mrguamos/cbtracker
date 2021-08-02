import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Web3Provider from './context/web3-context';
import { Box, Container, Toolbar, Typography } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import Link from '@material-ui/core/Link';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">CryptoBlades Tracker</Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
        <Toolbar style={{ textAlign: 'center' }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Powered by
            <Link
              href="https://github.com/mrguamos/cbtracker"
              color="textSecondary"
            >
              {' '}
              mrguamos
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Box mt={10}>
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
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
