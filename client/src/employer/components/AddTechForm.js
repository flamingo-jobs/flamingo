import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "./FloatCard";
import ComputerIcon from "@material-ui/icons/Computer";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  notificationsIcon: {
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 150,
  },
  comboBox: {
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    },
  },
}));

const AddTechForm = () => {
  const [value, setValue] = React.useState(2);

  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      xs={12}
      spacing={1}
      className={classes.root}
    >
      <Grid item container direction="row" xs={6} spacing={3}>
        <FloatCard>
          <Grid item className={classes.comboBox}>
            <Typography variant="h6" className={classes.title}>
              Add Technologies
            </Typography>
            <AddIcon className={classes.notificationsIcon} />
          </Grid>

          <Grid item className={classes.comboBox}>
            <Autocomplete
              id="main-categories"
              options={mainCategories}
              getOptionLabel={(option) => option.category}
              style={{ width: 400 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Main Category"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item className={classes.comboBox}>
            <Autocomplete
              id="sub-categories"
              options={subCategories}
              getOptionLabel={(option) => option.category}
              style={{ width: 400 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Sub Category"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item className={classes.comboBox}>
            <Autocomplete
              id="technologies"
              options={technologies}
              getOptionLabel={(option) => option.category}
              style={{ width: 400 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose technologies"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item className={classes.comboBox}>
            <Button variant="contained" className={classes.button}>
              SAVE
            </Button>
          </Grid>
        </FloatCard>
      </Grid>

      <Grid item container direction="row" xs={6} spacing={3}className={classes.boxTwo}>
        <FloatCard>
          <Grid item className={classes.comboBox}>
            <Typography variant="h6" className={classes.title}>
              Available Technologies
            </Typography>
            <ComputerIcon className={classes.notificationsIcon} />
          </Grid>
        </FloatCard>
      </Grid>
    </Grid>
  );
};

const mainCategories = [
  { category: "The Shawshank Redemption" },
  { category: "The Godfather" },
  { category: "The Godfather: Part II" },
  { category: "The Dark Knight" },
];

const subCategories = [
  { category: "The Shawshank Redemption" },
  { category: "The Godfather" },
  { category: "The Godfather: Part II" },
  { category: "The Dark Knight" },
];

const technologies = [
  { category: "The Shawshank Redemption" },
  { category: "The Godfather" },
  { category: "The Godfather: Part II" },
  { category: "The Dark Knight" },
];

export default AddTechForm;
