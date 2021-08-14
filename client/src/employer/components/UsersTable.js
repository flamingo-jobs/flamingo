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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Loading from "../../components/Loading";
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

  const loginId = sessionStorage.getItem("loginId");

  const [state, setState] = useState({
    allUsers: [],
  });
  const allUsers = state.allUsers;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/getUsersByEmployer/${loginId}`)
      .then((res) => {
        console.log(res.data.employerUsers);
        if (res.data.success) {
          setState({
            allUsers: res.data.employerUsers,
          });
        }
      });
  }, []);

  return allUsers.length ? (
    <TableContainer component={Paper}>
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
          {allUsers.map((row) => (
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
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  endIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Loading />
  );
}
