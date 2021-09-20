import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: 20,
  },
  confrimDelete: {
    boxShadow: "none",
    color: theme.palette.red,
    backgroundColor: theme.palette.lightyPink,
    borderRadius: 12,
    marginLeft: "16px !important",
    padding: "10px",
    "&:hover": {
      backgroundColor: theme.palette.lightyPinkHover,
      boxShadow: "none",
    },
  },
}));

// style={{border: "1px solid red"}}
const DeleteModal = (props) => {
  const classes = useStyles();

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paperRoot }}
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete the selected item? <b>This cannot be undone.</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            No
          </Button>
          <Button onClick={props.handleDelete} color="primary" className={classes.confrimDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
