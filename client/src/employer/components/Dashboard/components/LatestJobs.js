import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  withStyles,
  makeStyles,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../FloatCard";
import Box from "@material-ui/core/Box";
import WorkIcon from "@material-ui/icons/Work";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import BACKEND_URL from "../../../../Config";
import { useState, useEffect } from "react";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.greenyLightSky,
    color: theme.palette.stateBlue,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.greenyLightSky,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  peopleIcon: {
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: "80%",
  },
  button: {
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    margin: 27,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    },
  },
  activeChip: {
    backgroundColor: theme.palette.green,
    color: theme.palette.black,
  },
  inactiveChip: {
    backgroundColor: theme.palette.lightRed,
    color: theme.palette.black,
  },
  category: {
    alignSelf: "left",
    backgroundColor: theme.palette.tagYellow,
  },
  tableContainer: {
    marginLeft: 20,
    marginTop: 30,
    marginRight: 100,
  },
}));

const LatestJobs = (props) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(2);

  const [state, setState] = useState({
    allJobs: [],
  });

  const allJobs = state.allJobs;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/jobs/filterAllByOrganization/${props.employerId}`)
      .then((res) => {
        console.log(res.data.employerJobs);
        if (res.data.success) {
          setState({
            allJobs: res.data.employerJobs.slice(0, 5),
          });
        }
      });
  }, []);

  const getPending = (row) => {
    var pending = 0;

    row.applicationDetails.forEach((element) => {
      if (element.status == "pending") {
        pending++;
      }
      console.log(element.status);
    });

    return pending;
  };

  const getReviewing = (row) => {
    var reviewing = 0;

    row.applicationDetails.forEach((element) => {
      if (element.status == "reviewing") {
        reviewing++;
      }
      console.log(element.status);
    });

    return reviewing;
  };

  const getShortlisted = (row) => {
    var shortlisted = 0;

    row.applicationDetails.forEach((element) => {
      if (element.status == "shortlisted") {
        shortlisted++;
      }
      console.log(element.status);
    });

    return shortlisted;
  };

  const getRejected = (row) => {
    var rejected = 0;

    row.applicationDetails.forEach((element) => {
      if (element.status == "rejected") {
        rejected++;
      }
      console.log(element.status);
    });

    return rejected;
  };

  return (
    <div className={classes.root}>
      <FloatCard>
        <Typography variant="h6" className={classes.title}>
          Latest Jobs
        </Typography>
        <WorkIcon className={classes.peopleIcon} />

        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="customized table">
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Job Title</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Active</StyledTableCell>
                <StyledTableCell align="center">No of Resumes</StyledTableCell>
                <StyledTableCell align="center">Pending</StyledTableCell>
                <StyledTableCell align="center">Reviewing</StyledTableCell>
                <StyledTableCell align="center">Shortlisted</StyledTableCell>
                <StyledTableCell align="center">Rejected</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allJobs.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Chip
                      icon={<LocalOfferRoundedIcon />}
                      label={row.category}
                      className={classes.category}
                    />
                  </StyledTableCell>

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
                    {row.applicationDetails.length}
                  </StyledTableCell>

                  {/* Pending */}
                  <StyledTableCell align="center">
                    {getPending(row)}
                  </StyledTableCell>

                  {/* Reviewing */}
                  <StyledTableCell align="center">
                    {getReviewing(row)}
                  </StyledTableCell>

                  {/* Shortlisted  */}
                  <StyledTableCell align="center">
                    {getShortlisted(row)}
                  </StyledTableCell>

                  {/* Rejected */}
                  <StyledTableCell align="center">
                    {getRejected(row)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Link to={`/employer/jobs`}>
          <Button className={classes.button}>View All</Button>
        </Link>
      </FloatCard>
    </div>
  );
};

export default LatestJobs;
