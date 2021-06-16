import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CssBaseline,
  Container,
  ThemeProvider,
  makeStyles,
  useTheme,
  Typography,
  Button,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import LanguageIcon from "@material-ui/icons/Language";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import BACKEND_URL from "../../Config";
import { useState, useEffect } from "react";
import CompanyInfo from "./CompanyInfo";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    minHeight: "100vh",
  },
  textField: {
    fontSize:14,
  },
  locations: {
    width: 500,
  },
  textFieldColor: {
    color: theme.palette.purple,
  }
}));

const EditDetailsForm = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(2);

  const [employer, setCompanyDetails] = useState([]);

  useEffect(() => {
    getCompanyInfo();
  });

  const getCompanyInfo = () => {
    axios
      .get(`${BACKEND_URL}/employers/` + "60c246913542f942e4c84454")
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.employer);
          setCompanyDetails(res.data.employer);
        } else {
          setCompanyDetails(null);
        }
      });
  };

  return (
    <div>
      <Grid container xs={12} direction="column" spacing={2}>
        <Grid item sm={12}>
          <TextField
            required
            fullWidth
            id="name"
            label="Company Name"
            variant="outlined"
            defaultValue={employer.name}
            InputProps={{
                classes: {
                  input: classes.textField,
                },
            }}
          />
        </Grid>

        <Grid item sm={12}>
          <Autocomplete
            className={classes.locations}
            multiple
            id="locations"
            fullWidth
            options={locations}
            getOptionLabel={(option) => option.city}
            defaultValue={[locations[5]]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Locations"
                // placeholder="Favorites"
              />
            )}
          />
        </Grid>

        <Grid item sm={12}>
          <TextField
            multiline
            fullWidth
            id="description"
            defaultValue={employer.description}
            label="Description"
            rows={5}
            variant="outlined"
            InputProps={{
                classes: {
                  input: classes.textField,
                },
            }}
          />
        </Grid>

        <Grid item container direction="row" sm={12} spacing={1}>
          <Grid item sm={6}>
            <InputLabel htmlFor="input-with-icon-adornment">
              LinkedIn
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <LinkedInIcon />
                </InputAdornment>
              }
            //   defaultValue={employer.links.linkedIn}
            InputProps={{
                classes: {
                  input: classes.textField,
                },
            }}
            />
          </Grid>

          <Grid item sm={6}>
            <InputLabel htmlFor="input-with-icon-adornment">Website</InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <LanguageIcon />
                </InputAdornment>
              }
            //   defaultValue={employer.links.website}
            InputProps={{
                classes: {
                  input: classes.textField,
                },
            }}
            />

          </Grid>
        </Grid>

        <Grid item container direction="row" sm={12} spacing={1}>
          <Grid item sm={6}>
            <InputLabel htmlFor="input-with-icon-adornment">
              Facebook
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <FacebookIcon />
                </InputAdornment>
              }
            //   defaultValue={employer.links.facebook}
            InputProps={{
                classes: {
                  input: classes.textField,
                },
            }}
            />
          </Grid>

          <Grid item sm={6}>
            <InputLabel htmlFor="input-with-icon-adornment">Twitter</InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <TwitterIcon />
                </InputAdornment>
              }
            //   defaultValue={employer.links.twitter}
            InputProps={{
                classes: {
                  input: classes.textField,
                },
            }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

// list of locations

const locations = [
  { city: "Colombo" },
  { city: "Gampaha" },
  { city: "Kandy" },
  { city: "Mumbai" },
  { city: "Delhi" },
  { city: "Bangalore" },
  { city: "Male" },
  { city: "Dhaka" },
];

export default EditDetailsForm;
