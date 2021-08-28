import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Modal,
  Button,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from 'axios';
import BACKEND_URL from '../../../Config';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "600px",
    padding: `0px 30px`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    paddingBottom: "10px",
    maxHeight: "98vh",
    overflowY: "auto",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  closeBtnContainer: {
    marginTop: "5px",
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: "20px !important",
    },
    padding: "20px !important",
    margin: "0px",
  },
  closeButton: {
    width: "20px",
    "&:hover": {
      backgroundColor: "#fff",
    },
    padding: "0px",
  },
  closeIcon: {
    color: "#888",
    "&:hover": {
      color: "#555",
    },
  },
  radioBtnContainer: {
    width: "100%",
    marginBottom: "20px",
  },
  applyBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  applyBtn: {
    paddingLeft: "40px",
    paddingRight: "40px",
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
    },
  },
}));

const CustomRadio = withStyles((theme) => ({
  root: {
    color: theme.palette.tuftsBlue,
    "&$checked": {
      color: theme.palette.tuftsBlue,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

// style={{border: "1px solid red"}}
const StatusModal = (props) => {
  const classes = useStyles();

  const handleStatusChange = (event) => {
    props.setStatus(event.target.value);
  };

  const handleStatusSubmit = async () => {
    const status = props.status;

    const jobseekerData = {
      status: status,
      jobId: props.jobId,
    };
    const jobData = {
      status: status,
      userId: props.userId
    };
    props.handleClose();
    try {
      const jobseekerResponse = await axios.patch(
        `${BACKEND_URL}/jobseeker/updateResumeStatus/${props.userId}`,
        jobseekerData
      );

      const jobResponse = await axios.patch(
        `${BACKEND_URL}/jobs/updateResumeStatus/${props.jobId}`,
        jobData
      );
      if (jobseekerResponse.data.success && jobResponse.data.success) {
        props.setAlertData({
          severity: "success",
          msg: "Status Changed successfully!",
        });
        props.handleAlert();

      }
    } catch (err) {
      // console.log(err);
      props.setAlertData({
        severity: "error",
        msg: "Status Could Not Be Changed!",
      });
      props.handleAlert();
    }
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <Grid container>
              <div className={classes.topContainer}>
                <div className={classes.title}>
                  <Typography variant="h6">Resume Status</Typography>
                </div>

                <div className={classes.closeBtnContainer}>
                  <IconButton
                    onClick={props.handleClose}
                    className={classes.closeButton}
                  >
                    <CloseIcon className={classes.closeIcon} />
                  </IconButton>
                </div>
              </div>

              <div className={classes.radioBtnContainer}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="status"
                    name="status"
                    value={props.status}
                    onChange={handleStatusChange}
                  >
                    <FormControlLabel
                      value="pending"
                      control={<CustomRadio />}
                      label="Pending"
                    />
                    <FormControlLabel
                      value="reviewing"
                      control={<CustomRadio />}
                      label="Reviewing"
                    />
                    <FormControlLabel
                      value="shortlisted"
                      control={<CustomRadio />}
                      label="Shortlisted"
                    />
                    <FormControlLabel
                      value="rejected"
                      control={<CustomRadio />}
                      label="Rejected"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className={classes.applyBtnContainer}>
                <Button
                  
                  type="submit"
                  className={classes.applyBtn}
                  onClick={handleStatusSubmit}
                >
                  Apply
                </Button>
              </div>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default StatusModal;
