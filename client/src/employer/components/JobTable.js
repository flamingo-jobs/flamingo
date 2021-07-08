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
import CancelIcon from '@material-ui/icons/Cancel';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.blueJeans,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.greenyLightSky,
    },
  },
}))(TableRow);

function createData(title, postedDate, dueDate, isPublished, noOfResumes) {
  return { title, postedDate, dueDate, isPublished, noOfResumes };
}

const rows = [
  createData("Sodtware Engineer", "2021-02-03", "2021-08-22", true, 5),
  createData("Sodtware Engineer", "2021-02-03", "2021-08-22", false, 0),
  createData("Sodtware Engineer", "2021-02-03", "2021-08-22", true, 2),
  createData("Sodtware Engineer", "2021-02-03", "2021-08-22", false, 6),
  createData("Sodtware Engineer", "2021-02-03", "2021-08-22", true, 4),
  createData("Sodtware Engineer", "2021-02-03", "2021-08-22", true, 3),
];

const useStyles = makeStyles((theme) => ({
    activeChip:{
        backgroundColor: theme.palette.green,
        color: theme.palette.black,
    },
    inactiveChip:{
        backgroundColor: theme.palette.lightRed,
        color: theme.palette.black,
    }
}));

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Job Title</StyledTableCell>
            <StyledTableCell align="center">Posted Date</StyledTableCell>
            <StyledTableCell align="center">Due Date</StyledTableCell>
            <StyledTableCell align="center">Active</StyledTableCell>
            <StyledTableCell align="center">No of Resumes</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="center">{row.postedDate}</StyledTableCell>
              <StyledTableCell align="center">{row.dueDate}</StyledTableCell>
              <StyledTableCell align="center">
                {row.isPublished ? (
                  <Chip
                  icon={<CheckCircleIcon />}
                  label="Active"
                  className={classes.activeChip}
                />
                ) : (
                    <Chip
                    icon={<CancelIcon />}
                    label="Inactive"
                    className={classes.inactiveChip}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.noOfResumes}
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
