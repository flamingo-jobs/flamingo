import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Loading from "../../components/Loading";
import SnackBarAlert from "../../components/SnackBarAlert";
import axios from "axios";
import BACKEND_URL from "../../Config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.whiteHover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  activeChip: {
    backgroundColor: theme.palette.green,
    color: theme.palette.black,
  },
  inactiveChip: {
    backgroundColor: theme.palette.lightRed,
    color: theme.palette.black,
  },
  button: {
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    margin: 10,
    borderRadius: 25,
    paddingLeft: 10,
    paddingRight: 10,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    },
  },
  category: {
    alignSelf: "left",
    backgroundColor: theme.palette.tagYellow,
  },
  location: {
    backgroundColor: theme.palette.tagYellow,
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();

  const accessTokens = [
    {
      value: "alljobs",
      description: "Handle all jobs",
    },
    {
      value: "allresume",
      description: "Handle all resumes",
    },
    {
      value: "singlejob",
      description: "Post and handle jobs",
    },
    {
      value: "singleresume",
      description: "Handle resumes for the jobs posted by the user",
    },
    {
      value: "billing",
      description: "Billing",
    },
    {
      value: "user",
      description: "Handle users",
    },
    {
      value: "company",
      description: "Edit company profile",
    },
  ];

  const loginId = sessionStorage.getItem("loginId");

  // Alert stuff
  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });
  const displayAlert = () => {
    return (
      <SnackBarAlert
        open={alertShow}
        onClose={handleAlertClose}
        severity={alertData.severity}
        msg={alertData.msg}
      />
    );
  };
  const handleAlert = () => {
    setAlertShow(true);
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  const [checked, setChecked] = useState([]);

  const handleChecked = (value, itemId) => () => {
    const newChecked = [...checked];
    const itemObj = { index: itemId, name: value };
    const currentIndex = checked.findIndex((x) => x.index === itemId);

    if (currentIndex === -1) {
      newChecked.push(itemObj);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const [open, setOpen] = React.useState(-1);

  const handleClickOpen = (tokens, index) => {
    const newChecked = [...checked];
    accessTokens.forEach((x, i) => {
      if (tokens.includes(x.value)) {
        newChecked.push({ index: i, name: x.value });
      }
    });
    setChecked(newChecked);
    setOpen(index);
  };

  const handleDialogClose = () => {
    setOpen(-1);
    setChecked([]);
  };

  const updatePrivileges = async (email) => {
    const newTokens = checked.map((x) => x.name);
    const updateData = {
      email: email,
      accessTokens: newTokens,
    };
    axios
      .post(`${BACKEND_URL}/api/update-tokens`, updateData)
      .then((res) => {
        if (res.data.success) {
          handleDialogClose();
          setAlertData({
            severity: "success",
            msg: "Updated successfully!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Failed to update access privileges!",
          });
          handleAlert();
        }
      });
  };

  const [state, setState] = useState({
    allUsers: [],
  });
  const allUsers = state.allUsers;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/getUsersByEmployer/${loginId}`)
      .then((res) => {
        if (res.data.success) {
          setState({
            allUsers: res.data.employerUsers,
          });
        }
      });
  }, [open]);

  return allUsers.length ? (
    <TableContainer component={Paper}>
      {displayAlert()}
      <Table className={classes.table} aria-label="customized table">
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "35%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Priviledges</StyledTableCell>
            <StyledTableCell align="center">Registered Date</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((row, index) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.username}
              </StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">
                {row.accessTokens.map((x, i) => (
                  <Chip
                    key={i}
                    icon={<VpnKeyIcon />}
                    label={x}
                    className={classes.location}
                  />
                ))}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.dateRegistered?.slice(0, 10)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.passwordResetCode ? (
                  <Chip
                    icon={<CancelIcon />}
                    label="Inactive"
                    className={classes.inactiveChip}
                  />
                ) : (
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="Active"
                    className={classes.activeChip}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {!row.accessTokens.includes("all") && (
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={() => handleClickOpen(row.accessTokens, index)}
                    endIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                )}
              </StyledTableCell>
              <Dialog
                open={open === index}
                onClose={handleDialogClose}
                aria-labelledby="edit-details-form"
                fullWidth
                className={classes.dialogBox}
              >
                <DialogTitle id="edit-details-form">
                  Edit access pivileges
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Select all the privileges apply to {row.username} (
                    {row.email})
                  </DialogContentText>
                  <List component="nav">
                    <Grid
                      container
                      spacing={1}
                      justify="space-between"
                      direction="row"
                      className={classes.gridCont}
                    >
                      {accessTokens.map((x, i) => {
                        return (
                          <Grid item xs={12} md={12} lg={6} align="left">
                            <ListItem
                              className={classes.listItem}
                              key={i}
                              role={undefined}
                              dense
                              button
                              disabled={
                                x.value === "singlejob"
                                  ? checked
                                      .map((x) => x.name)
                                      .includes("alljobs")
                                    ? true
                                    : false
                                  : x.value === "singleresume"
                                  ? checked
                                      .map((x) => x.name)
                                      .includes("allresume")
                                    ? true
                                    : false
                                  : false
                              }
                              onClick={handleChecked(x.value, i)}
                            >
                              <ListItemIcon className={classes.itemCheckBox}>
                                <Checkbox
                                  edge="start"
                                  checked={
                                    checked.findIndex((x) => x.index === i) !==
                                    -1
                                  }
                                  tabIndex={-1}
                                  disableRipple
                                  className={classes.checkBox}
                                  inputProps={{
                                    "aria-labelledby": i,
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText id="i" primary={x.description} />
                            </ListItem>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </List>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialogClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    className={classes.button}
                    onClick={() => updatePrivileges(row.email)}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Loading />
  );
}
