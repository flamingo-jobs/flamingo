import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  makeStyles,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../FloatCard";
import Box from "@material-ui/core/Box";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ApplicantImage from "../images/1.jpg";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginRight: -10,
  },
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  peopleIcon:{
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 20,
  },
  applicantContainer:{
    marginTop: 10,
    padding: 5,
    marginBottom: -10,
  },
  applicantName:{
    float:"left",
    marginTop: -5,
  },
  avatar:{
    marginLeft: 5,
  },
  applicantBody:{
    marginTop: -10,
    marginLeft: -12,
  },
  button:{
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    margin: 17,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    },
  }
}));

const NewApplicants = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FloatCard>
        <Typography variant="h6" className={classes.title}>
          New Applicants
        </Typography>
        <PeopleAltIcon className={classes.peopleIcon}/>

            <Grid container direction="row" xs={12} className={classes.applicantContainer}>
                <Grid item xs={3} alignContent="right">
                    <Avatar alt="Remy Sharp" src={ApplicantImage} className={classes.avatar} />
                </Grid>
                <Grid item direction="column" container xs={9} >
                    <Grid item>
                        <Typography variant="body2" className={classes.applicantName}>
                            <Box
                                fontWeight={500}
                                fontSize={15}
                                m={1}
                            >
                               Anne Shirley
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body2" className={classes.applicantBody}>
                            <Box
                                fontWeight={400}
                                fontSize={12}
                                m={1}
                            >
                               Applied for Software Engineer
                            </Box>
                           
                        </Typography>
                    </Grid>
                    
                </Grid>
            </Grid>  
            <Grid container direction="row" xs={12} className={classes.applicantContainer}>
                <Grid item xs={3} alignContent="right">
                    <Avatar alt="Remy Sharp" src={ApplicantImage} className={classes.avatar} />
                </Grid>
                <Grid item direction="column" container xs={9} >
                    <Grid item>
                        <Typography variant="body2" className={classes.applicantName}>
                            <Box
                                fontWeight={500}
                                fontSize={15}
                                m={1}
                            >
                               Harvey Specter
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body2" className={classes.applicantBody}>
                            <Box
                                fontWeight={400}
                                fontSize={12}
                                m={1}
                            >
                               Applied for UI/UX Engineer
                            </Box>
                           
                        </Typography>
                    </Grid>
                    
                </Grid>
            </Grid>  
            <Grid container direction="row" xs={12} className={classes.applicantContainer}>
                <Grid item xs={3} alignContent="right">
                    <Avatar alt="Remy Sharp" src={ApplicantImage} className={classes.avatar} />
                </Grid>
                <Grid item direction="column" container xs={9} >
                    <Grid item>
                        <Typography variant="body2" className={classes.applicantName}>
                            <Box
                                fontWeight={500}
                                fontSize={15}
                                m={1}
                            >
                               Timothy Chalamet
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body2" className={classes.applicantBody}>
                            <Box
                                fontWeight={400}
                                fontSize={12}
                                m={1}
                            >
                               Applied for Business Analyst
                            </Box>
                           
                        </Typography>
                    </Grid>
                    
                </Grid>
            </Grid>  

            <Link to="#">
            <Button
              className={classes.button}
            >
              View All
            </Button>
            </Link>
            

      </FloatCard>
    </div>
  );
};

export default NewApplicants;
