import React, { useState, useEffect } from "react";
import { Container, Grid, IconButton, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import axios from "axios";
import FloatCard from "../../../components/FloatCard";
import BACKEND_URL from "../../../Config";
import QualificationsModal from "./qualificationsModal";

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
    transition: "0.3s",
    "&:hover": {
      transition: "0.3s",
      color: theme.palette.black,
    },
  },
  iconGridItem: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Qualifications = (props) => {
  const classes = useStyles();

  const [errors, setErrors] = useState("empty");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    var fields = [];
    props.job.qualifications.map((q) => {
      const temp = [...fields, ""];
      fields = temp;
    });
    setErrors(fields);
  }, []);

  const handleQualificationsChange = (e, index) => {
    const newJob = { ...props.job };
    const newErrors = [...errors];
    const value = e.target.value;

    const newQualifications = newJob.qualifications.map((qualification, i) => {
      if (index === i) {
        qualification = value;
      }
      return qualification;
    });
    newJob.qualifications = newQualifications;
    props.setJob(newJob);

    if (value.trim() === "") {
      newErrors[index] = "This field cannot be empty.";
    } else {
      newErrors[index] = "";
    }
    setErrors(newErrors);
  };

  const handleQualificationRemove = (index) => {
    const newJob = { ...props.job };
    newJob.qualifications.splice(
      newJob.qualifications.findIndex((qualification, i) => index === i),
      1
    );
    props.setJob(newJob);

    const newErrors = [...errors];
    newErrors.splice(
      newErrors.findIndex((e, i) => index === i),
      1
    );
    setErrors(newErrors);
  };
  console.log("Errors", errors);

  const handleQualificationAdd = () => {
    const newJob = { ...props.job };
    newJob.qualifications = [...newJob.qualifications, ""];
    props.setJob(newJob);

    setErrors([...errors, ""]);
  };

  const handleQualificationsSubmit = async (e) => {
    e.preventDefault();

    if(!validateFields()){
      return;
    }

    const updateFields = {
      qualifications: props.job.qualifications.map((q) => q.trim()),
    };

    try {
      const response = await axios.put(
        `${BACKEND_URL}/jobs/update/${props.jobId}`,
        updateFields
      );
      if(response.data.success){
        handleClose();
        props.setAlertData({
          severity: "success",
          msg: "Changes saved successfully!",
        });
        props.handleAlert();
        await axios.get(
          `${BACKEND_URL}/jobs/generateRecommendations/${props.jobId}`
        );
      }
    } catch (err) {
      handleClose();
      props.setAlertData({
        severity: "error",
        msg: "Changes could not be applied",
      });
      props.handleAlert();
    }
  };

  const validateFields = () => {
    const errorsLength = errors.filter(e => e !== "").length;
    if(errorsLength === 0){
      return true;
    }
    return false;
  }

  const displayQualificationModal = () => {
    if (errors !== "empty") {
      return (
        <QualificationsModal
          qualifications={props.job.qualifications}
          open={open}
          handleClose={handleClose}
          handleQualificationsChange={handleQualificationsChange}
          handleQualificationRemove={handleQualificationRemove}
          handleQualificationAdd={handleQualificationAdd}
          handleQualificationsSubmit={handleQualificationsSubmit}
          errors={errors}
        ></QualificationsModal>
      );
    }
  };

  return (
    <>
      {displayQualificationModal()}

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
                <ListItemIcon style={{ minWidth: 25 }}>
                  <FiberManualRecordIcon fontSize="inherit" />
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
