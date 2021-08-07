import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  makeStyles,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddTechForm from "./components/AddTechForm";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
  },

}));

const Technologies = () => {

  const [value, setValue] = React.useState(2);

  const classes = useStyles();

  return (

    <Grid container direction="row" xs={12} spacing={1} className={classes.root}>

      <AddTechForm/>
        
    </Grid>

  );
};

export default Technologies;
