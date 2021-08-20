import React from "react";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import {
  Avatar,
  Button,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FloatCard from "./FloatCard";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import BACKEND_URL from "../../Config";
import { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const jwt = require("jsonwebtoken");
let haveAccess = false;

if (sessionStorage.getItem("userToken")) {
  var accessTokens = jwt.decode(sessionStorage.getItem("userToken"), {
    complete: true,
  }).payload.accessTokens;
  if (accessTokens.includes("all") || accessTokens.includes("company")) {
    haveAccess = true;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
  header: {},
  body: {},
  logoItem: {
    marginLeft: 10,
    marginTop: 10,
  },
  info: {
    marginLeft: 150,
    marginTop: -130,
  },
  infoTags: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    marginTop: -10,
    maxWidth: 200,
    marginBottom: 15,
  },
  infoTagsContainer: {
    marginLeft: theme.spacing(2),
  },
  companyDescription: {
    paddingTop: -25,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  editButton: {
    marginTop: 140,
    marginLeft: 110,
    marginBottom: -30,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  tag: {
    marginRight: -10,
    backgroundColor: "white",
  },
  label: {
    alignSelf: "left",
    marginRight: 15,
    marginBottom: 5,
    backgroundColor: theme.palette.tagYellow,
  },
  headerRight: {
    marginLeft: 260,
  },
  dialogbuttons: {
    color: theme.palette.purple,
  },
  dialogBox: {
    minHeight: "100vh",
    maxHeight: "100vh",
  },
  textField: {
    fontSize: 14,
  },
  textFieldColor: {
    color: theme.palette.purple,
  },
}));

function CompanyBasicInfo(props) {
  const classes = useStyles();

  const fixedOptions = [];
  const [location, setLocation] = React.useState([...fixedOptions]);

  let loginId;
  let login = false;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if (token === null) {
    loginId = props.employerID;
  } else if (header.payload.userRole === "employer") {
    login = true;
    loginId = sessionStorage.getItem("loginId");
  } else {
    loginId = props.employerID;
  }

  const [state, setState] = useState({
    description: " ",
    technologyStack: Object,
  });

  const description = state.description;
  const technologyStack = state.technologyStack;

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [openAlertValidationError, setOpenAlertValidationError] = React.useState(false);
  const [openAlertServerError, setOpenAlertServerError] = React.useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = React.useState(false);

  const handleClickAlertValidationError = () => {
    setOpenAlertValidationError(true);
  };

  const handleCloseAlertValidationError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertValidationError(false);
  };

  const handleClickAlertServerError = () => {
    setOpenAlertServerError(true);
  };

  const handleCloseAlertServerError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertServerError(false);
  };

  const handleClickAlertSuccess = () => {
    setOpenAlertSuccess(true);
  };

  const handleCloseAlertSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertSuccess(false);
  };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/employers/${loginId}`).then((res) => {
      // console.log(res.data.employer);
      if (res.data.success) {
        setState({
          description: res.data.employer.description,
          technologyStack: res.data.employer.technologyStack,
        });
      }
      res.data.employer.locations.forEach((element) => {
        // console.log(element);
        setLocation((location) => [...location, { city: element }]);
      });
    });
  }, []);

  //Event handlers for the edit detail dialog box
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (description != "") {
      setOpen(false);
    }
    else{
      handleClickAlertValidationError();
    }
    
  };

  //for the company details update form

  function onChangeDescription(e) {
    setState((prevState) => {
      return { ...prevState, description: e.target.value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    var temp = [];
    location.forEach((element) => {
      temp.push(element.city);
    });
    const employer = {
      description: description,
    };

    if (employer.description != "") {
      axios
        .put(`${BACKEND_URL}/employers/update/${loginId}`, employer)
        .then((res) => {
          if (res.status == 200) {
            handleClickAlertSuccess()
          } else {
            handleClickAlertServerError()
          }
        
        })
        .catch(()=>{
          handleClickAlertServerError()
        })


      handleClose();
    } else {
      handleClickAlertValidationError();
    }
  }

  return (
    <div className={classes.root}>
      <FloatCard>
        <Grid item container direction="row" spacing={3}>
          {/* HEAD PART OF THE COMPANY INFO CARD */}

          <Grid
            xs={12}
            item
            container
            direction="column"
            spacing={1}
            className={classes.header}
          >
            {/* OTHER INFO NEXT TO LOGO */}

            <Grid
              item
              container
              xs={9}
              direction="row"
              spacing={1}
              className={classes.info}
            >
              {/* EDIT BUTTON */}

              <Grid item xs={9}>
                <div className={classes.headerRight}>
                  {props.userRole === "employer" && haveAccess && (
                    <IconButton
                      variant="outlined"
                      aria-label="edit"
                      className={classes.editButton}
                      onClick={handleClickOpen}
                    >
                      <EditIcon />
                    </IconButton>
                  )}

                  {/* <form onSubmit={onSubmit}> */}
                  <form>
                    {/* Dialog box for the edit details */}

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="edit-details-form"
                      fullWidth
                      className={classes.dialogBox}
                    >
                      <DialogTitle id="edit-details-form">
                        Company Description
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>*Required Fields</DialogContentText>

                        {/* input fields */}

                        <div>
                          <Grid item sm={12}>
                            <TextField
                              multiline
                              fullWidth
                              id="description"
                              defaultValue={description}
                              label="Description"
                              rows={5}
                              variant="outlined"
                              InputProps={{
                                classes: {
                                  input: classes.textField,
                                },
                              }}
                              onChange={onChangeDescription}
                            />
                          </Grid>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleClose}
                          color="primary"
                          className={classes.dialogbuttons}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          onClick={onSubmit}
                          color="primary"
                          className={classes.dialogbuttons}
                        >
                          Save
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </form>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <br />

        <Snackbar open={openAlertValidationError} autoHideDuration={6000} onClose={handleCloseAlertValidationError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}>
          <Alert onClose={handleCloseAlertValidationError} severity="error">
            Company Description cannot be empty!
          </Alert>
        </Snackbar>

        <Snackbar open={openAlertServerError} autoHideDuration={6000} onClose={handleCloseAlertServerError} 
         anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}>
          <Alert onClose={handleCloseAlertServerError} severity="error">
            Server error! Changes couldn't be saved
          </Alert>
        </Snackbar>

        <Snackbar open={openAlertSuccess} autoHideDuration={6000} onClose={handleCloseAlertSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}>
          <Alert onClose={handleCloseAlertSuccess} severity="success">
            Changes saved successfully!
          </Alert>
        </Snackbar>

        <Grid container xs={12} direction="row" spacing={3}>
          {/* BODY PART OF THE COMPANY INFO CARD */}

          <Grid item xs={12}>
            {/* <div className={classes.infoTags}> */}
            <div className={classes.infoTagsContainer}>
              {Object.keys(technologyStack).map((item, i) => (
                <Chip
                  icon={<LocalOfferRoundedIcon className={classes.tagIcon} />}
                  label={technologyStack[i].type}
                  className={classes.label}
                />
              ))}
            </div>
          </Grid>

          <Grid item xs={12} className={classes.body}>
            <div className={classes.companyDescription}>
              <Typography
                style={{ whiteSpace: "pre-line" }}
                variant="body2"
                align="justify"
              >
                {description}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </FloatCard>
    </div>
  );
}

// list of locations

const mycities = [{ city: "A" }, { city: "B" }, { city: "C" }];

const cities = [
  { city: "Colombo" },
  { city: "Gampaha" },
  { city: "Kandy" },
  { city: "Mumbai" },
  { city: "Delhi" },
  { city: "Bangalore" },
  { city: "Male" },
  { city: "New York" },
  { city: "Uppsala" },
  { city: "Göteborg" },
  { city: "Linköping" },
  { city: "A" },
  { city: "B" },
  { city: "C" },
];

export default CompanyBasicInfo;
