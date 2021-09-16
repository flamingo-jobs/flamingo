import React from "react";
import {
  withStyles,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../../../components/FloatCard";

import { Link } from "react-router-dom";

import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import BACKEND_URL from "../../../../Config";
import { useState, useEffect } from "react";
import EmployerJobCard from "../../DetailedJobCard";
import theme from "../../../../Theme";
import Loading from "../../../../components/Loading";
import NotEnoughData from "../../../../components/NotEnoughData";
import NoInfo from "../../../../components/NoInfo";
const jwt = require("jsonwebtoken");

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
  root: {
    padding: 10
  },
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
    backgroundColor: theme.palette.lightSkyBlueHover,
    color: theme.palette.blueJeans,
    borderRadius: 12,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.lightSkyBlue,
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
    allJobs: "empty",
  });

  const userId = jwt.decode(sessionStorage.getItem("userToken"), {
    complete: true,
  }).payload.userId;

  const allJobs = state.allJobs;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/jobs/filterAllByOrganization/${props.employerId}`)
      .then((res) => {
        // console.log(res.data.employerJobs);
        if (res.data.success) {
          setState({
            allJobs: res.data.employerJobs.sort((a, b) => {
              return new Date(a.postedDate).getTime() < new Date(b.postedDate).getTime() ? 1 : -1
            }).slice(0, 5),
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
      // console.log(element.status);
    });

    return pending;
  };

  const getReviewing = (row) => {
    var reviewing = 0;

    row.applicationDetails.forEach((element) => {
      if (element.status == "reviewing") {
        reviewing++;
      }
      // console.log(element.status);
    });

    return reviewing;
  };

  const getShortlisted = (row) => {
    var shortlisted = 0;

    row.applicationDetails.forEach((element) => {
      if (element.status == "shortlisted") {
        shortlisted++;
      }
      // console.log(element.status);
    });

    return shortlisted;
  };

  const getRejected = (row) => {
    var rejected = 0;

    row.applicationDetails.forEach((element) => {
      if (element.status == "rejected") {
        rejected++;
      }
      // console.log(element.status);
    });

    return rejected;
  };

  const getMerged = (row) => {
    let mergedArray = [];
    let pending = getPending(row);
    let reviewing = getReviewing(row);
    let shortlisted = getShortlisted(row);
    let rejected = getRejected(row);

    if (pending) {
      mergedArray.push({
        label: "Pending",
        value: pending,
        color: "#ffce63"
      })
    }

    if (reviewing) {
      mergedArray.push({
        label: "Reviewing",
        value: reviewing,
        color: "#eb78ff"
      })
    }

    if (shortlisted) {
      mergedArray.push({
        label: "Shortlisted",
        value: shortlisted,
        color: "#52ff52"
      })
    }

    if (rejected) {
      mergedArray.push({
        label: "Rejected",
        value: rejected,
        color: "#f52560"
      })
    }

    return mergedArray;
  }

  return (

    <FloatCard backColor={theme.palette.lightyPurple}>
      <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          Latest Jobs
        </Typography>
        <Grid container spacing={2}>
          {allJobs === "empty" ?
            <Loading />
            : null}
          {allJobs !== "empty" && allJobs.length > 0 ?
            allJobs.map((row) => (
              <Grid item xs={12}>
                <EmployerJobCard
                  userId={userId}
                  info={row}
                  userRole={props.userRole}
                  values={getMerged(row)}
                />
              </Grid>
            )) : null }
            {allJobs !== "empty" && allJobs.length === 0 ? <NoInfo message="Sorry, you havent posted any jobs yet." /> : null}
          {/* </TableBody>
          </Table>
        </TableContainer> */}
          {allJobs !== "empty" && allJobs.length > 0 ?
            <Grid item xs={12}>
              <Link to={`/employer/jobs`}>
                <Button className={classes.button}>View All</Button>
              </Link>
            </Grid> : null}
        </Grid>

      </div>
    </FloatCard >

  );
};

export default LatestJobs;
