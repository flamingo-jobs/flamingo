import React from "react";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import {
  Avatar,
  Button,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { FavoriteRounded } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
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
import differenceBy from 'lodash/differenceBy'



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
  logo: {
    borderRadius: 12,
    width: 125,
    height: 125,
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
  companyDescription: {
    paddingTop: -25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  companyName: {
    fontWeight: 500,
    marginBottom: 5,
  },
  membershipType: {
    marginTop: -55,
    backgroundColor: theme.palette.gold,
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  editButton: {
    marginTop: -90,
    marginLeft: 110,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  locationTags: {
    marginTop: -50,
    marginBottom: 10,
    marginLeft: -14,
    marginRight: -20,
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
  rating: {
    marginTop: -25,
  },
  ratingText: {
    marginTop: -35,
    marginLeft: 130,
  },
  smIcons: {
    marginLeft: -35,
    marginTop: -40,
  },
  dialogbuttons: {
    color: theme.palette.purple,
  },
  dialogBox: {
    minHeight: "100vh",
    maxHeight: "100vh",
  },
  editPhoto: {
    marginLeft: 50,
    marginTop: -35,
  },
  textField: {
    fontSize: 14,
  },
  locations: {
    width: 500,
  },
  textFieldColor: {
    color: theme.palette.purple,
  },
}));

function CompanyInfo() {
  const classes = useStyles();

  const [value, setValue] = React.useState(2);

  const [state, setState] = useState({
    name: " ",
    description: " ",
    technologyStack: Object,
    locations: [],
    subscription: " ",
    website: " ",
    facebook: " ",
    linkedIn: " ",
    twitter: " ",
  });

  const name = state.name;
  const description = state.description;
  const technologyStack = state.technologyStack;
  const links = state.links;
  const locations = state.locations;
  const subscription = state.subscription;
  const website = state.website;
  const facebook = state.facebook;
  const linkedIn = state.linkedIn;
  const twitter = state.twitter;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/employers/` + "60c246913542f942e4c84454")
      .then((res) => {
        console.log(res.data.employer.links);
        if (res.data.success) {
          setState({
            name: res.data.employer.name,
            description: res.data.employer.description,
            technologyStack: res.data.employer.technologyStack,
            links: res.data.employer.links,
            locations: res.data.employer.locations,
            subscription: res.data.employer.subscription,
            website: res.data.employer.links.website,
            facebook: res.data.employer.links.facebook,
            linkedIn: res.data.employer.links.linkedIn,
            twitter: res.data.employer.links.twitter,
          });
        }
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

  function onChangeName(e) {
    setState((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  }

  function onChangeDescription(e) {
    setState((prevState) => {
      return { ...prevState, description: e.target.value };
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

  // function onChangeLocations(e) {
  //   locations=e;
  //   state.locations=e;

  //   setState((prevState) => {
  //     return { ...prevState, locations: e};
  //   });
  //   console.log(e);
  //   console.log(state.locations)
  // }

  

  function onSubmit(e) {
    e.preventDefault();
    const employer = {
      name: name,
      description: description,
      // locations: locations,

      links: {
        website: website,
        facebook: facebook,
        linkedIn: linkedIn,
        twitter: twitter,
      },
    };

    console.log('test');
    console.log(employer)

    axios
      .put(`${BACKEND_URL}/employers/update/60c246913542f942e4c84454`, employer)
      .then((res) => console.log(employer));
    handleClose();
  }

  return (
    <div className={classes.root}>
      <FloatCard>
        <Grid item container direction="row" spacing={1}>
          {/* HEAD PART OF THE COMPANY INFO CARD */}

          <Grid
            xs={12}
            item
            container
            direction="column"
            spacing={1}
            className={classes.header}
          >
            {/* LOGO */}

            <Grid item xs={3} className={classes.logoItem}>
              {/* <Avatar className={classes.logo} src={require(`../images/${employer.logo}`).default} variant="square" /> */}
              <Avatar className={classes.logo} src={wso2} variant="square" />
            </Grid>

            {/* OTHER INFO NEXT TO LOGO */}

            <Grid
              item
              container
              xs={9}
              direction="row"
              spacing={1}
              className={classes.info}
            >
              {/* PANEL 01 FOR COMPANY NAME, MEMBERSHIP TYPE AND EDIT BUTTON */}

              <Grid item xs={9}>
                <Typography variant="h5" className={classes.companyName}>
                  {name}
                </Typography>

                <div className={classes.headerRight}>
                  <Chip
                    icon={<LoyaltyIcon />}
                    label={subscription}
                    className={classes.membershipType}
                  />

                  <IconButton
                    variant="outlined"
                    aria-label="edit"
                    className={classes.editButton}
                    onClick={handleClickOpen}
                  >
                    <EditIcon />
                  </IconButton>

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
                                id="locations"
                                // options={ differenceBy(cities, mycities, 'city')}
                                options={cities}
                                getOptionLabel={(option) => option.city}
                                defaultValue={[cities[1],cities[2],cities[5]]}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Locations"
                                  />
                                )}
                                // onClick={onChangeLocations}
                                // onChange={(event, value) => onChangeLocations(value)} 

                              />
                            </Grid>

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
                </div>
              </Grid>

              {/* PANEL 02 FOR LOCATION AND JOB TYPE */}

              <Grid item xs={9}>
                <div className={classes.locationTags}>
                  {locations.map((item, i) => (
                    <Chip
                      icon={<LocationOnRoundedIcon />}
                      label={item}
                      className={classes.tag}
                    />
                  ))}
                </div>
              </Grid>

              {/* PANEL 03 FOR STAR RATING DISPLAY */}

              <Grid item xs={9}>
                <div className={classes.rating}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                </div>

                <div className={classes.ratingText}>
                  <Typography>
                    <Box fontSize={14} fontWeight="fontWeightMedium" m={1}>
                      3.5 stars (124)
                    </Box>
                  </Typography>
                </div>
              </Grid>

              {/* PANEL 04 FOR SOCIAL MEDIA LINKS */}

              <Grid
                container
                item
                xs={9}
                className={classes.smIcons}
                spacing={5}
              >
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => window.open("https://" + website)}
                    variant="outlined"
                    aria-label="website"
                  >
                    <LanguageIcon />
                  </IconButton>
                </Grid>

                <Grid item xs={1}>
                  <IconButton
                    onClick={() => window.open("https://" + linkedIn)}
                    variant="outlined"
                    aria-label="website"
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => window.open("https://" + twitter)}
                    variant="outlined"
                    aria-label="website"
                  >
                    <TwitterIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => window.open("https://" + facebook)}
                    variant="outlined"
                    aria-label="website"
                  >
                    <FacebookIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Edit Company Logo */}

          <Grid item container alignItems="center" direction="row" xs={12}>
            <Grid item sm={3} className={classes.editPhoto}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
              />

              <label htmlFor="raised-button-file">
                <IconButton
                  variant="outlined"
                  component="span"
                  aria-label="edit"
                  className={classes.editPhotoButton}
                >
                  <PhotoCameraIcon />
                </IconButton>
              </label>
            </Grid>
          </Grid>

          {/* BODY PART OF THE COMPANY INFO CARD */}

          <Grid item xs={12}>
            {/* <div className={classes.infoTags}> */}

            {console.log(technologyStack)}

            {Object.keys(technologyStack).map((item, i) => (
              <Chip
                icon={<LocalOfferRoundedIcon className={classes.tagIcon} />}
                label={item}
                className={classes.label}
              />
            ))}
          </Grid>

          <Grid item xs={12} className={classes.body}>
            <div className={classes.companyDescription}>
              <Typography variant="body2" align="justify">
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

const mycities = [
  { city: "A" },
  { city: "B" },
  { city: "C" },
  
];

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

export default CompanyInfo;
