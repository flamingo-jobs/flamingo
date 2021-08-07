import React from "react";
import {
  makeStyles,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddTechForm from "./components/AddTechForm";
import AvailableTechnologies from "./components/AvailableTechnologies";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginLeft:20,
    marginTop:2,
    marginBottom: 5,
  },
  addTechForm:{
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  availableTech:{
    marginLeft: -20,
    marginRight: 20,
  }

}));

const Technologies = () => {

  const [value, setValue] = React.useState(2);

  const classes = useStyles();

  return (

    <Grid container direction="row" xs={12} spacing={3} className={classes.root}>

      <Grid item xs={6} >
        <AddTechForm/>
      </Grid>

      <Grid item xs={6} >
        <AvailableTechnologies/>
      </Grid>

      
        
    </Grid>

  );
};

export default Technologies;
