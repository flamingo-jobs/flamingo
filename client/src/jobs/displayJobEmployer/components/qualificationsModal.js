import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Modal,
  Button,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { StateBlueTextField } from "./customTextField";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "800px",
    padding: `0px 30px`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    paddingBottom: "30px",
    minHeight: "50vh",
    maxHeight: "80vh",
    overflowY: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "95%"
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: "20px !important",
    },
    padding: "20px !important",
    margin: "0px",
  },
  title: {
    color: theme.palette.stateBlue,
    marginBottom: theme.spacing(3),
    fontSize: "23px",
    fontWeight: 500,
    borderBottom: "1px solid #ddd",
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
  formContainer: {
    marginBottom: "24px",
  },
  textFieldContainer:{
    display: "flex",
    flexDirection :"column",
    justifyContent: "center",
    gap: theme.spacing(1)
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  buttonGridItem:{
    display: "flex",
    flexDirection :"column",
    justifyContent: "center",
  },
  buttonContainer:{
    marginBottom: theme.spacing(3),
  },
  addRemoveButton:{
    padding: "12px",
    [theme.breakpoints.down("sm")]: {
      padding: "5px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "2px",
    }
  },
  submitBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(3),
  },
  submitBtn: {
    background: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      background: theme.palette.stateBlue,
      color: theme.palette.white,
    },
  },
}));

// style={{border: "1px solid red"}}
const QualificationsModal = (props) => {
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
              <div className={classes.closeBtnContainer}>
                <IconButton
                  onClick={props.handleClose}
                  className={classes.closeButton}
                >
                  <CloseIcon className={classes.closeIcon} />
                </IconButton>
              </div>

              <Grid item xs={12} className={classes.formContainer}>
                <Typography align="center" className={classes.title}>
                  Skills and Requirements
                </Typography>

                <form onSubmit={props.handleQualificationsSubmit}>
                  <Grid container>
                    {props.qualifications.map((field, index) => (
                      <Grid item container key={index}>
                        <Grid item xs={10}> 
                          <StateBlueTextField
                            label="Qualification"
                            variant="outlined"
                            value={field}
                            fullWidth
                            multiline
                            className={classes.textField}
                            onChange={(event) =>
                              props.handleQualificationsChange(event, index)
                            }
                          />
                        </Grid>
                        <Grid item xs={2} className={classes.buttonGridItem}>
                          <div className={classes.buttonContainer}>
                            <IconButton
                              disabled={props.qualifications.length === 1}
                              onClick={() => props.handleQualificationRemove(index)}
                              className={classes.addRemoveButton}
                            >
                              <RemoveIcon
                                className={classes.removeIcon}
                                style={{
                                  color:
                                  props.qualifications.length === 1
                                      ? "#bbb"
                                      : null,
                                }}
                              />
                            </IconButton>
                            <IconButton 
                              onClick={props.handleQualificationAdd}
                              className={classes.addRemoveButton}
                            >
                              <AddIcon className={classes.addIcon} />
                            </IconButton>
                          </div>
                        </Grid>
                      </Grid>
                    ))}

                    <div className={classes.submitBtnContainer}>
                      <Button
                        variant="contained"
                        type="submit"
                        className={classes.submitBtn}
                      >
                        Save changes
                      </Button>
                    </div>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default QualificationsModal;
