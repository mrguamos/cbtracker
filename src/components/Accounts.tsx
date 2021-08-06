import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Fab,
  Modal,
  TextField,
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { Web3Context, defaultAddress } from '../context/web3-context';
import { Refresh } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Accounts() {
  const [local, setLocal] = useState(false);
  const storedAccounts = JSON.parse(
    localStorage.getItem('metamask-cb-accounts')!,
  );

  const defaultLocalAccounts: any[] = storedAccounts || [];
  const cbContext = React.useContext(Web3Context);
  const [localAccounts, setLocalAccounts] = useState(defaultLocalAccounts);
  const [accounts, setAccounts] = useState([] as any[]);
  const [dialogData, setDialogData] = useState({
    name: '',
    index: 0,
  });

  const fetchAccounts = async () => {
    const clone = [...localAccounts];
    await Promise.all(
      clone.map(async (account) => {
        try {
          let skillwallet = await cbContext.cb.skillWallet.methods
            .balanceOf(account.address)
            .call({ from: defaultAddress });
          skillwallet = parseFloat(
            cbContext.web3.utils.fromWei(
              BigInt(skillwallet).toString(),
              'ether',
            ),
          ).toFixed(6);
          account.skillWallet = skillwallet;
        } catch (error) {
          console.log(error);
        }
      }),
    );
    setAccounts(clone);
  };

  const classes = useStyles();

  const [form, setForm] = useState({
    name: '',
    address: '',
  });
  const [open, setOpen] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = (index: number, name: string) => {
    setDialogData({
      index: index,
      name: name,
    });
    setDialogOpen(true);
  };

  const handleDialogClose = (action: number) => {
    if (action == 1) deleteAccount();
    setDialogOpen(false);
  };

  const handleAddAccount = () => {
    setLocalAccounts([...localAccounts, form]);
    setLocal(!local);
    setOpen(false);
  };

  const deleteAccount = () => {
    const accounts = [...localAccounts];
    accounts.splice(dialogData.index, 1);
    setLocalAccounts(accounts);
    setLocal(!local);
  };

  const handleRefresh = () => {
    fetchAccounts();
  };

  useEffect(() => {
    localStorage.setItem('metamask-cb-accounts', JSON.stringify(localAccounts));
  }, [local]);

  useEffect(() => {
    fetchAccounts();
  }, [localAccounts]);

  return (
    <>
      <Grid container item direction="column" spacing={3}>
        <Grid item xs>
          <Typography variant="h6" gutterBottom>
            Accounts
          </Typography>
        </Grid>
        <Grid item xs>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">Total Skill</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts?.map((account: any, index) => (
                  <TableRow key={account.address}>
                    <TableCell component="th" scope="row">
                      {account.name}
                    </TableCell>
                    <TableCell align="right">{account.address}</TableCell>
                    <TableCell align="right">{account.skillWallet}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="secondary"
                        variant="outlined"
                        onClick={() => handleDialogOpen(index, account.name)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container item xs justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Fab color="primary" aria-label="refresh" onClick={handleRefresh}>
              <Refresh />
            </Fab>
          </Grid>
          <Grid item>
            <Fab color="primary" aria-label="add" onClick={handleOpen}>
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this Account? {dialogData.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(0)} color="primary">
            No
          </Button>
          <Button
            onClick={() => handleDialogClose(1)}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card>
            <CardHeader title="Add Account" />
            <CardContent>
              <Container maxWidth="xs">
                <form>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            size="small"
                            variant="outlined"
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            size="small"
                            variant="outlined"
                            onChange={(e) =>
                              setForm({ ...form, address: e.target.value })
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={handleAddAccount}
                        color="primary"
                        fullWidth
                        variant="contained"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Container>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </>
  );
}

export default Accounts;
