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
  Toolbar,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const storedAccounts = JSON.parse(
  localStorage.getItem('metamask-cb-accounts')!,
);
const defaultAccounts: any[] = storedAccounts || [];

function Accounts() {
  const classes = useStyles();

  const [form, setForm] = useState({
    name: '',
    address: '',
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [accounts, setAccounts] = useState(defaultAccounts);

  const handleAddAccount = () => {
    setAccounts([...accounts, form]);

    setOpen(false);
  };
  useEffect(() => {
    localStorage.setItem('metamask-cb-accounts', JSON.stringify(accounts));
  }, [accounts]);

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
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts?.map((account: any) => (
                  <TableRow key={account.name}>
                    <TableCell component="th" scope="row">
                      {account.name}
                    </TableCell>
                    <TableCell align="right">{account.address}</TableCell>
                    <TableCell align="right">
                      <Button color="secondary" variant="outlined">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container item xs justifyContent="flex-end">
          <Fab color="primary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>

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
