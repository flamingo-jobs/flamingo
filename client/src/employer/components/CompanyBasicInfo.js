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
import FloatCard from '../../components/FloatCard';
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Route } from "react-router-dom";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
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
  },
  headerInfo: {
    marginTop: -25,
    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
      marginTop: 0
    }
  },
  body: {},
  logoItem: {
  },
  logo: {
    borderRadius: 12,
    width: 150,
    height: 150,
    margin: '0px auto'
  },
  title: {
    fontWeight: 700
  },
  infoTags: {

  },
  infoTagsContainer: {

  },
  companyName: {

  },
  membershipType: {

  },
  listItem: {

  },
  editButton: {
    position: 'relative',
    right: '-45%'
  },
  locationTags: {
    marginTop: 16,
    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
      marginLeft: -5
    }
  },
  tag: {
    marginRight: 10,
    backgroundColor: theme.palette.tagYellow,
  },
  label: {

    backgroundColor: theme.palette.tagYellow,
  },
  rating: {
    margin: 10,
    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
      marginLeft: -5
    }
  },
  links: {
    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
      marginLeft: -15
    }
  },
  ratingText: {

  },
  smIcons: {

  },
  dialogbuttons: {

  },
  dialogBox: {

  },
  editPhoto: {

  },
  textField: {

  },
  locations: {

  },
  textFieldColor: {

  },
  setMargin: {

  },
  link: {
    marginLeft: 5,
    marginRight: 5,
    [theme.breakpoints.up('lg')]: {
      marginLeft: 0
    }
  },
  editPhotoButton: {
    position: 'relative',
    top: '-25px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: 'rgba(0,0,0,0.5)',

    }
  }
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
    loginId = props.userRole;;
  } else if (header.payload.userRole === "employer") {
    login = true;
    loginId = sessionStorage.getItem("loginId");
  } else {
    loginId = props.userRole;;
  }

  const [state, setState] = useState({
    name: " ",
    technologyStack: Object,
    reviews: [],
    subscription: " ",
    website: " ",
    facebook: " ",
    linkedIn: " ",
    twitter: " ",
    logo: " ",
    locations: []
  });

  const name = state.name;
  const logo = state.logo;
  const reviews = state.reviews;
  const technologyStack = state.technologyStack;
  const links = state.links;
  const subscription = state.subscription;
  const website = state.website;
  const facebook = state.facebook;
  const linkedIn = state.linkedIn;
  const twitter = state.twitter;
  const locations = state.locations;

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(() => {
    axios.get(`${BACKEND_URL}/employers/${loginId}`).then((res) => {
      // console.log(res.data.employer.reviews);
      if (res.data.success) {
        setState({
          name: res.data.employer.name,
          technologyStack: res.data.employer.technologyStack,
          links: res.data.employer.links,
          subscription: res.data.employer.subscription.type,
          website: res.data.employer.links.website,
          facebook: res.data.employer.links.facebook,
          linkedIn: res.data.employer.links.linkedIn,
          twitter: res.data.employer.links.twitter,
          reviews: res.data.employer.reviews,
          logo: res.data.employer.logo,
          locations: res.data.employer.locations,
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
    if (state.name != "" && location.length != 0) {
      setOpen(false);
    } else {
      handleClickAlertValidationError();
    }
  };

  //for the company details update form

  function onChangeName(e) {
    setState((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  }

  function onChangeWebsite(e) {
    setState((prevState) => {
      return { ...prevState, website: e.target.value };
    });
  }

  function onChangeFacebook(e) {
    setState((prevState) => {
      return { ...prevState, facebook: e.target.value };
    });
  }

  function onChangeLinkedIn(e) {
    setState((prevState) => {
      return { ...prevState, linkedIn: e.target.value };
    });
  }

  function onChangeTwitter(e) {
    setState((prevState) => {
      return { ...prevState, twitter: e.target.value };
    });
  }

  //alert handling
  const [openAlertValidationError, setOpenAlertValidationError] =
    React.useState(false);
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

  function onSubmit(e) {
    e.preventDefault();
    var temp = [];
    location.forEach((element) => {
      temp.push(element.city);
    });
    const employer = {
      name: name,

      // locations: locations,

      links: {
        website: website,
        facebook: facebook,
        linkedIn: linkedIn,
        twitter: twitter,
      },
      locations: temp,
    };

    if (employer.name != "" && temp.length != 0) {
      axios
        .put(`${BACKEND_URL}/employers/update/${loginId}`, employer)
        .then((res) => {
          if (res.status == 200) {
            handleClickAlertSuccess();
          } else {
            handleClickAlertServerError();
          }
        })
        .catch(() => {
          handleClickAlertServerError();
        });

      handleClose();
    } else {
      handleClickAlertValidationError();
    }
  }

  const getAverageRating = () => {
    var totalRating = 0;

    reviews.forEach((review) => {
      totalRating += review.rating;
    });

    var averageRating = totalRating / reviews.length;
    averageRating = parseInt(averageRating);

    console.log(averageRating);

    return averageRating;
  };

  const loadLogo = () => {
    try {
      return require(`../images/${logo}`).default;
    } catch (err) {
      return require(`../images/default_company_logo.png`).default;
    }
  };

  const displayEditForm = () => {
    return (
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
            Company Profile
          </DialogTitle>
          <DialogContent>
            <DialogContentText>*Required Fields</DialogContentText>

            {/* input fields */}

            <div>
              <Grid
                container
                xs={12}
                direction="column"
                spacing={2}
              >
                <Grid item sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Company Name"
                    variant="outlined"
                    defaultValue={name}
                    InputProps={{
                      classes: {
                        input: classes.textField,
                      },
                    }}
                    onChange={onChangeName}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Autocomplete
                    multiple
                    required={true}
                    id="fixed-tags-demo"
                    value={location}
                    onChange={(event, newValue) => {
                      setLocation([
                        ...fixedOptions,
                        ...newValue.filter(
                          (option) =>
                            fixedOptions.indexOf(option) === -1
                        ),
                      ]);
                    }}
                    options={cities}
                    getOptionLabel={(option) => option.city}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Location"
                        variant="outlined"
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid
                  item
                  container
                  direction="row"
                  sm={12}
                  spacing={1}
                >
                  <Grid item sm={6}>
                    <InputLabel htmlFor="linkedIn">
                      LinkedIn
                    </InputLabel>
                    <Input
                      id="linkedIn"
                      startAdornment={
                        <InputAdornment position="start">
                          <LinkedInIcon />
                        </InputAdornment>
                      }
                      defaultValue={linkedIn}
                      InputProps={{
                        classes: {
                          input: classes.textField,
                        },
                      }}
                      onChange={onChangeLinkedIn}
                    />
                  </Grid>

                  <Grid item sm={6}>
                    <InputLabel htmlFor="website">
                      Website
                    </InputLabel>
                    <Input
                      id="website"
                      startAdornment={
                        <InputAdornment position="start">
                          <LanguageIcon />
                        </InputAdornment>
                      }
                      defaultValue={website}
                      InputProps={{
                        classes: {
                          input: classes.textField,
                        },
                      }}
                      onChange={onChangeWebsite}
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  direction="row"
                  sm={12}
                  spacing={1}
                >
                  <Grid item sm={6}>
                    <InputLabel htmlFor="facebook">
                      Facebook
                    </InputLabel>
                    <Input
                      id="facebook"
                      startAdornment={
                        <InputAdornment position="start">
                          <FacebookIcon />
                        </InputAdornment>
                      }
                      defaultValue={facebook}
                      InputProps={{
                        classes: {
                          input: classes.textField,
                        },
                      }}
                      onChange={onChangeFacebook}
                    />
                  </Grid>

                  <Grid item sm={6}>
                    <InputLabel htmlFor="twitter">
                      Twitter
                    </InputLabel>
                    <Input
                      id="twitter"
                      startAdornment={
                        <InputAdornment position="start">
                          <TwitterIcon />
                        </InputAdornment>
                      }
                      defaultValue={twitter}
                      InputProps={{
                        classes: {
                          input: classes.textField,
                        },
                      }}
                      onChange={onChangeTwitter}
                    />
                  </Grid>
                </Grid>
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

    )
  }

  return (
    <>
      <FloatCard>
        {props.userRole == "employer" || haveAccess == true ?
          <IconButton
            variant="outlined"
            aria-label="edit"
            className={classes.editButton}
            onClick={handleClickOpen}
          >
            <EditIcon />
          </IconButton>
          : null
        }
        <Grid container spacing={3} direction="row">
          <Grid item container spacing={3} xs={12}>
            <Grid item xs={12} lg={6}>
              <Avatar className={classes.logo} src={loadLogo()} variant="square" />
              {props.userRole == "employer" || haveAccess == true && (
                <IconButton
                  variant="outlined"
                  aria-label="edit"
                  className={classes.editPhotoButton}
                // onClick={handleClickOpen}
                >
                  <PhotoCameraIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={12} lg={6} className={classes.headerInfo}>
              <Typography variant="h5" className={classes.title}>
                {name}
              </Typography>
              <div className={classes.locationTags}>
                {locations.map((item, i) => (
                  <Chip
                    icon={<LocationOnRoundedIcon />}
                    label={item}
                    className={classes.tag}
                  />
                ))}
              </div>
              <div className={classes.rating}>
                {/* <Typography style={{ marginTop: 8 }}>{getAverageRating()}/5 ratings</Typography> */}
                <Rating name="read-only" style={{ marginTop: 8 }} value={getAverageRating()} readOnly />
              </div>
              <div className={classes.links}>
                <Link to={{ pathname: website }} target="_blank">
                  <IconButton variant="outlined" aria-label="website" className={classes.link}>
                    <LanguageIcon />
                  </IconButton>
                </Link>
                <Link to={{ pathname: linkedIn }} target="_blank">
                  <IconButton variant="outlined" aria-label="website" className={classes.link}>
                    <LinkedInIcon />
                  </IconButton>
                </Link>

                <Link to={{ pathname: twitter }} target="_blank">
                  <IconButton variant="outlined" aria-label="website" className={classes.link}>
                    <TwitterIcon />
                  </IconButton>
                </Link>

                <Link to={{ pathname: facebook }} target="_blank">
                  <IconButton variant="outlined" aria-label="website" className={classes.link}>
                    <FacebookIcon />
                  </IconButton>
                </Link>

              </div>
            </Grid>
          </Grid>

        </Grid>

      </FloatCard >
      {displayEditForm()}
      <Snackbar
        open={openAlertValidationError}
        autoHideDuration={6000}
        onClose={handleCloseAlertValidationError}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseAlertValidationError}
          severity="error"
        >
          Required fields cannot be empty!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openAlertServerError}
        autoHideDuration={6000}
        onClose={handleCloseAlertServerError}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleCloseAlertServerError} severity="error">
          Server error! Changes couldn't be saved!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openAlertSuccess}
        autoHideDuration={6000}
        onClose={handleCloseAlertSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleCloseAlertSuccess} severity="success">
          Changes saved successfully!
        </Alert>
      </Snackbar>
    </>
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
