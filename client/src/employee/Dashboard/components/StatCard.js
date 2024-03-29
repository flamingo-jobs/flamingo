import React, {useState, useEffect} from 'react'
import { makeStyles, withStyles } from '@material-ui/core'
import FloatCard from '../../../components/FloatCard';
import { Grid, Typography, Paper } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import CardMedia from '@material-ui/core/CardMedia';
import statImage1 from '../images/statImage1.jpg';
import statImage2 from '../images/statImage2.jpg';
import { Link } from 'react-router-dom';
import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import theme from '../../../Theme';
import BACKEND_URL from "../../../Config";
import axios from "axios";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundSize: 'cover',
        minHeight: '100vh'
    },
    card: {
        boxShadow: indigo[75],
        textAlign: 'center',
        padding: theme.spacing(5, 0),
        color: "#3f51b5",
        backgroundColor: "white"
    },
    iconWrapper: {
        margin: 'auto',
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        width: theme.spacing(4),
        height: theme.spacing(3),
        justifyContent: 'center',
        marginBottom: theme.spacing(3),
        color: "#7986cb",
    },
    paperCont: {
        backgroundColor: "#e3f2fd",
        color: indigo[600],
        padding: "5px 10px 5px 5px",
        borderRadius: 10,
        "&:hover": {
            defaultButton: {
                display: 'block'
            }
          }
      },
}));

function StatCard(props) {
    const classes = useStyles();
    const [appliedJobs,setAppliedJobs] = useState(0);
    let loginId;
    let login = false;
    const jwt = require("jsonwebtoken");
    const token = sessionStorage.getItem("userToken");
    const header = jwt.decode(token, { complete: true });
    if(token === null){
        loginId=props.jobseekerID;
    }else if (header.payload.userRole === "jobseeker") {
        login = true;
        loginId=sessionStorage.getItem("loginId");
    } else {
        loginId=props.jobseekerID;
    }

    useEffect(() => {
        fetchData();
      }, []);

    function fetchData(){
        axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
        .then(res => {
          if(res.data.success){
            if(res.data.jobseeker.hasOwnProperty("applicationDetails")){
              setAppliedJobs(res.data.jobseeker.applicationDetails.length);
            }       
          }
        })
      }

    return (
        <FloatCard>
            <Grid container spacing={3} style={{padding: "25px"}}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="left" width="100%" style={{fontWeight:"bold",color: "#b31aff"}}>Welcome home !</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={0} className={classes.paperCont}>  
                        <Grid container spacing={2}>
                            <Grid item sm={12} md={6}>
                                <CardMedia
                                image={statImage2}
                                title="Contemplative Reptile"
                                style={{height:"200px",width:"200px",borderRadius: 10}}
                                zindex="background"
                                /> 
                            </Grid>
                            <Grid item sm={12} md={6} style={{alignItems:"center",display: "flex"}}>
                                <div style={{width:"100%"}}>
                                    <Typography sx={{ opacity: 0.72 }} style={{fontSize:"25px"}}>
                                        Careers for Me
                                    </Typography>
                                    <Typography variant="h3" style={{paddingBottom:"40px"}}>15</Typography>
                                    <Typography variant="body2" component="p" sx={{ opacity: 0.72 }} style={{fontSize:"16px",textAlign:"left",}}>
                                        <Link to="/jobseeker/appliedJobs" style={{display: 'flex',flexWrap: 'wrap',color: theme.palette.tuftsBlue,marginBottom:"-20px",float:"right"}}>
                                            <span>More Details</span><ChevronRightTwoToneIcon style={{marginTop:"-1px"}} />
                                        </Link>
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>        
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={0} className={classes.paperCont}>  
                        <Grid container>
                            <Grid item sm={12} md={6}>
                                <CardMedia
                                image={statImage1}
                                title="Contemplative Reptile"
                                style={{height:"200px",width:"200px",borderRadius: 10}}
                                zindex="background"
                                /> 
                            </Grid>
                            <Grid item sm={12} md={6} style={{alignItems:"center",display: "flex"}}>
                                <div style={{width:"100%"}}>
                                    <Typography sx={{ opacity: 0.72 }} style={{fontSize:"25px"}}>
                                        Applied Jobs
                                    </Typography>
                                    <Typography variant="h3" style={{paddingBottom:"40px"}}>{appliedJobs}</Typography>
                                    <Typography variant="body2" component="p" sx={{ opacity: 0.72 }} style={{fontSize:"16px",textAlign:"left",}}>
                                        <Link to="/jobseeker/appliedJobs" style={{display: 'flex',flexWrap: 'wrap',color: theme.palette.tuftsBlue,marginBottom:"-20px",float:"right"}}>
                                            <span>More Details</span><ChevronRightTwoToneIcon style={{marginTop:"-1px"}} />
                                        </Link>
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>        
                    </Paper>
                </Grid>
            </Grid>
        </FloatCard>
    )
}

export default StatCard
