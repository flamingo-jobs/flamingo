import {
  Button, Card,
  CardContent, Grid, Modal, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    padding: `0px 30px`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    paddingBottom: "30px",
    maxHeight: "98vh",
    overflowY: "auto",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteContainer: {
    width: "100%",
    marginTop: "20px",
  },
  deleteText: {
    fontSize: "18px",
    fontWeight: 400,
    textAlign: "center",
  },
  deleteBtnContainer: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
  },
  cancelBtn: {
    paddingLeft: "20px",
    paddingRight: "20px",
    backgroundColor: "#ddd",
    marginRight: "10px",
    color: theme.palette.black,
    "&:hover": {
      backgroundColor: "#bbb",
    },
  },
  deleteBtn: {
    paddingLeft: "20px",
    paddingRight: "20px",
    marginLeft: "10px",
    backgroundColor: theme.palette.lightRed,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.red,
    },
  },
}));

// style={{border: "1px solid red"}}
const DeleteModal = (props) => {
  const classes = useStyles();

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
              <div className={classes.deleteContainer}>
                <Typography className={classes.deleteText}>
                  Are you sure you want to delete?
                </Typography>
                <div className={classes.deleteBtnContainer}>
                  <Button className={classes.cancelBtn} onClick={props.handleClose}>Cancel</Button>
                  <Button className={classes.deleteBtn} onClick={props.handleDelete}>Delete</Button>
                </div>
              </div>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default DeleteModal;
