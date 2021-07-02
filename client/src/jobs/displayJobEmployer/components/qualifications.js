import React, { useState } from "react";
import { Container, Typography, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FloatCard from "../../../components/FloatCard";
import CreateIcon from "@material-ui/icons/Create";
import QualificationsModal from "./qualificationsModal";
import axios from "axios";
import BACKEND_URL from "../../../Config";

const useStyles = makeStyles((theme) => ({
  req: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    position: "relative",
  },
  reqTitle: {
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
  list: {
    color: theme.palette.black,
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  createIcon: {
    fontSize: "20px",
    color: theme.palette.tagIcon,
  },
  iconGridItem: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Qualifications = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleQualificationsChange = (event, index) => {
    const newJob = { ...props.job };

    const newQualifications = newJob.qualifications.map((qualification, i) => {
      if (index === i) {
        qualification = event.target.value;
      }
      return qualification;
    });
    newJob.qualifications = newQualifications;
    props.setJob(newJob);
  };

  const handleQualificationRemove = (index) => {
    const newJob = {...props.job};
    newJob.qualifications.splice(
      newJob.qualifications.findIndex((qualification, i) => index === i),
      1
    );
    props.setJob(newJob);
  };

  const handleQualificationAdd = () => {
    const newJob = {...props.job};
    newJob.qualifications = [...newJob.qualifications, [""]];
    props.setJob(newJob)
  };

  const handleQualificationsSubmit = async (e) => {
    e.preventDefault();

    const updateFields = {
      qualifications: props.job.qualifications,
    };

    try {
      const response = await axios.put(
        `${BACKEND_URL}/jobs/update/${props.jobId}`,
        updateFields
      );
      // console.log(response);
      props.setChangesApplied(true);
      handleClose();
      setTimeout(() => props.setChangesApplied(false), 10000);
    } catch (err) {
      props.setChangesNotApplied(true);
      handleClose();
      setTimeout(() => props.setChangesNotApplied(false), 10000);
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <QualificationsModal
        qualifications={props.job.qualifications}
        open={open}
        handleClose={handleClose}
        handleQualificationsChange={handleQualificationsChange}
        handleQualificationRemove={handleQualificationRemove}
        handleQualificationAdd={handleQualificationAdd}
        handleQualificationsSubmit={handleQualificationsSubmit}
      ></QualificationsModal>

      <FloatCard>
        <Container className={classes.req}>
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="h6" className={classes.reqTitle}>
                Skills and Requirements
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.iconGridItem}>
              <IconButton className={classes.iconButton} onClick={handleOpen}>
                <CreateIcon className={classes.createIcon} />
              </IconButton>
            </Grid>
          </Grid>
          <List dense={true} className={classes.list}>
            {props.job.qualifications.map((qualification) => (
              <ListItem key={qualification}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={qualification} />
              </ListItem>
            ))}
          </List>
        </Container>
      </FloatCard>
    </>
  );
};

export default Qualifications;
