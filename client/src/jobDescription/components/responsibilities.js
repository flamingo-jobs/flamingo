import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  res: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  resTitle: {
    textAlign: "left",
    color: theme.palette.black,
  },
  readMoreBtn: {
    cursor: "pointer",
    color: theme.palette.stateBlue,
    "&:hover": {
      color: theme.palette.frenchViolet,
    },
  },
}));

const Responsibilities = ({ responsibilities }) => {
  const classes = useStyles();

  const [duties, setDuties] = useState(responsibilities);

  // const displayResponsibilities = () => {
  //   if (jobs) {
  //     return jobs.map(job => (
  //       <Grid item xs={12} md={12} lg={6}>
  //         <JobCard info={job} />
  //       </Grid>
  //     ))
  //   } else {
  //     return (
  //       <Grid item sm={12}>
  //         <Typography>No featured Jobs</Typography>
  //       </Grid>)
  //   }
  // }

  return (
    <Container className={classes.res}>
      <Typography variant="h6" className={classes.resTitle}>
        Duties and Responsibilities
      </Typography>
      <List dense={true}>
        {duties.map((dutie) => (
          <ListItem key={duties.indexOf(dutie)}>
            <ListItemIcon style={{minWidth: 24}}>
              <FiberManualRecordRoundedIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary={dutie} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Responsibilities;
