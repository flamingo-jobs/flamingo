import React from "react";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import {
  Avatar,
  Button,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import wso2 from "../images/wso2.png";
import FloatCard from "./FloatCard";
import EditIcon from "@material-ui/icons/Edit";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import LanguageIcon from "@material-ui/icons/Language";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import axios from "axios";
import BACKEND_URL from "../../Config";
import { useState, useEffect } from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import swal from "sweetalert";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link } from "react-router-dom";

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
    marginBottom:-30,
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
 

  var successAlert = false;

  useEffect(() => {
    axios.get(`${BACKEND_URL}/employers/${loginId}`).then((res) => {
      console.log(res.data.employer);
      if (res.data.success) {
        setState({
         
          description: res.data.employer.description,
          technologyStack: res.data.employer.technologyStack,
         
        });
      }
      res.data.employer.locations.forEach((element) => {
        console.log(element);
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
    setOpen(false);
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

    axios
      .put(`${BACKEND_URL}/employers/update/${loginId}`, employer)
      .then((res) => {
        if (res.status == 200) {
          successAlert = true;
          // alert(successAlert)
        } else {
          successAlert = false;
          // alert(successAlert)
        }
      });

    handleClose();
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