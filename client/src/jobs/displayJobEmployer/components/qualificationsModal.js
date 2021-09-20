import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React from "react";
import theme from "../../../Theme";
import { StateBlueTextField } from "./customTextField";

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
      width: "95%",
      padding: `0px 20px`,
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
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px !important",
      paddingRight: "0px !important",
    }
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
  textFieldContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: theme.spacing(1)
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  buttonGridItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonContainer: {
    marginBottom: theme.spacing(3),
  },
  addRemoveButton: {
    padding: "12px",
    [theme.breakpoints.down("sm")]: {
      padding: "5px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "1px",
    }
  },
  submitBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      justifyContent: "center",
    },
  },
  submitBtn: {
    background: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      background: theme.palette.stateBlue,
      color: theme.palette.white,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1)
    },
  },
  cancelBtn: {
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    },
  },
}));

// style={{border: "1px solid red"}}
const QualificationsModal = (props) => {
  const classes = useStyles();

  return (
    <>
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography style={{ color: theme.palette.stateBlue, textAlign: 'left', fontSize: 18, fontWeight: 600 }}>
              Qualifications and Requirements
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container>
              {props.qualifications.map((field, index) => (
                <Grid item container key={index} justifyContent="space-between" spacing={3} alignItems="center">
                  <Grid item xs={10}>
                    <StateBlueTextField
                      variant="outlined"
                      value={field}
                      fullWidth
                      multiline
                      size="small"
                      className={classes.textField}
                      onChange={(event) =>
                        props.handleQualificationsChange(event, index)
                      }
                      error={props.errors[index].length !== 0}
                      helperText={
                        props.errors[index].length !== 0 &&
                        props.errors[index]
                      }
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.buttonGridItem}>
                    <div className={classes.buttonContainer}>
                      <IconButton
                        disabled={props.qualifications.length === 1}
                        onClick={() => props.handleQualificationRemove(index)}
                        className={classes.addRemoveButton}
                        style={{ color: theme.palette.red }}
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
                      {props.qualifications.length === index + 1 ?
                        <IconButton
                          onClick={props.handleQualificationAdd}
                          className={classes.addRemoveButton}
                        >
                          <AddIcon className={classes.addIcon} />
                        </IconButton> : null}
                    </div>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} style={{ color: "#999" }}>
              Cancel
            </Button>
            <Button type="submit" color="primary" autoFocus onClick={props.handleQualificationsSubmit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
    </>
  );
};
// style={{border: "1px solid red"}}
export default QualificationsModal;
