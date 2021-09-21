import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: 20,
    minWidth: "500px",
    [theme.breakpoints.down('sm')]: {
      minWidth: "400px",
    }
  },
  noBtn: {
    boxShadow: "none",
    color: "#6c757d",
    borderRadius: 12,
    padding: "10px",
  },
  yesBtn: {
    boxShadow: "none",
    borderRadius: 12,
    marginLeft: "16px !important",
    padding: "10px",
  }
}));

// style={{border: "1px solid red"}}
const ShortlistAllModal = (props) => {
  const classes = useStyles();

  const [isEarly, setIsEarly] = useState(false);

  const returnMessage = () => {
    const currentDate = new Date();
    const dueDate = new Date(props.dueDate);
    if(currentDate < dueDate){
      return `Due date of this job is not reached yet. So there could be more applicants in the future.
      After shortlisting, all the applicants under "Shortlisted Applicants" will be notified.${" "}`;
    } else {
      return "";
    }
  }

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paperRoot }}
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Shortlisting?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {returnMessage()}
            <b>Are you sure?</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" className={classes.noBtn}>
            No
          </Button>
          <Button
            onClick={props.shortlistMatchedApplicants}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShortlistAllModal;
