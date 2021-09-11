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
import ResponsibilitiesModal from "./responsibilitiesModal";

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

const Responsibilities = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState("empty");

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

  const handleResponsibilitiesChange = (e, index) => {
    const newJob = { ...props.job };
    const newErrors = [...errors];
    const value = e.target.value;

    const newResponsibilities = newJob.tasksAndResponsibilities.map(
      (responsibility, i) => {
        if (index === i) {
          responsibility = value;
        }
        return responsibility;
      }
    );
    newJob.tasksAndResponsibilities = newResponsibilities;
    props.setJob(newJob);

    if (value.trim() === "") {
      newErrors[index] = "This field cannot be empty.";
    } else {
      newErrors[index] = "";
    }
    setErrors(newErrors);
  };

  const handleResponsibilityRemove = (index) => {
    const newJob = { ...props.job };
    newJob.tasksAndResponsibilities.splice(
      newJob.tasksAndResponsibilities.findIndex(
        (responsibility, i) => index === i
      ),
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

  const handleResponsibilityAdd = () => {
    const newJob = { ...props.job };
    newJob.tasksAndResponsibilities = [
      ...newJob.tasksAndResponsibilities,
      [""],
    ];
    props.setJob(newJob);

    setErrors([...errors, ""]);
  };

  const handleResponsibilitiesSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const updateFields = {
      tasksAndResponsibilities: props.job.tasksAndResponsibilities.map((t) =>
        t.trim()
      ),
    };

    try {
      const response = await axios.put(
        `${BACKEND_URL}/jobs/update/${props.jobId}`,
        updateFields
      );
      if (response.data.success) {
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
      // console.log("Error: ", err);
    }
  };

  const validateFields = () => {
    const errorsLength = errors.filter((e) => e !== "").length;
    if (errorsLength === 0) {
      return true;
    }
    return false;
  };

  const displayResponsibilitiesModal = () => {
    if (errors !== "empty") {
      return (
        <ResponsibilitiesModal
          responsibilities={props.job.tasksAndResponsibilities}
          open={open}
          handleClose={handleClose}
          handleResponsibilitiesChange={handleResponsibilitiesChange}
          handleResponsibilityRemove={handleResponsibilityRemove}
          handleResponsibilityAdd={handleResponsibilityAdd}
          handleResponsibilitiesSubmit={handleResponsibilitiesSubmit}
          errors={errors}
        ></ResponsibilitiesModal>
      );
    }
  };

  return (
    <>
      {displayResponsibilitiesModal()}
      <FloatCard>
        <Container className={classes.res}>
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="h6" className={classes.resTitle}>
                Duties and Responsibilities
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.iconGridItem}>
              <IconButton className={classes.iconButton} onClick={handleOpen}>
                <CreateIcon className={classes.createIcon} />
              </IconButton>
            </Grid>
          </Grid>
          <List dense={true} className={classes.list}>
            {props.job.tasksAndResponsibilities.map((responsibility) => (
              <ListItem key={responsibility}>
                <ListItemIcon style={{ minWidth: 25 }}>
                  <FiberManualRecordIcon fontSize="inherit" />
                </ListItemIcon>
                <ListItemText primary={responsibility} />
              </ListItem>
            ))}
          </List>
        </Container>
      </FloatCard>
    </>
  );
};

export default Responsibilities;
