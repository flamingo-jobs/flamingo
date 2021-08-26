import React from 'react'
import {makeStyles } from '@material-ui/core'
import FloatCard from '../../../components/FloatCard';
import { Grid, Typography, Paper} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';
import BookmarkTwoToneIcon from '@material-ui/icons/BookmarkTwoTone';
import NavigateNextTwoToneIcon from '@material-ui/icons/NavigateNextTwoTone';
import { Link } from 'react-router-dom';
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
        padding: "20px",
        borderRadius: 10,
        width: "100%",
        "&:hover": {
            defaultButton: {
                display: 'block'
            }
          }
      },
      media: {
        height: '100px',
        width: '100px',
        margin: 'auto',
        borderRadius: 20,
      },
      defaultButton: {
        color: theme.palette.white,
        borderRadius: 15,
        "&:hover": {
          backgroundColor: '#0088cc',
          color: 'white',
        }
      },
}));

function SideMenu() {
    const classes = useStyles();

    return (
        <FloatCard>
            <Grid container spacing={3} style={{padding: "20px"}}>
                <Grid item xs={12} style={{alignItems:"center",display: "flex"}}>
                    <Paper elevation={0} className={classes.paperCont}>  
                        <div style={{width:"100%"}}>
                            <Typography variant="body2" component="p" style={{fontSize:"20px",textAlign:"left"}}>
                                <Link to="jobseeker/savedJobs" style={{display: 'flex',alignItems: 'center',color: indigo[600]}}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <BookmarkTwoToneIcon style={{marginTop:"5px"}} />
                                        </Grid>
                                        <Grid item xs={9} style={{marginTop:"4px"}}>
                                            <span>Saved jobs</span>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <NavigateNextTwoToneIcon style={{marginTop:"5px"}} />
                                        </Grid>
                                    </Grid>
                                </Link>
                            </Typography>
                        </div>      
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{alignItems:"center",display: "flex"}}>
                    <Paper elevation={0} className={classes.paperCont}>  
                        <div style={{width:"100%"}}>
                            <Typography variant="body2" component="p" style={{fontSize:"20px",textAlign:"left"}}>
                                <Link to="jobseeker/favoriteOrganizations" style={{display: 'flex',alignItems: 'center',color: indigo[600]}}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <BookmarkTwoToneIcon style={{marginTop:"5px"}} />
                                        </Grid>
                                        <Grid item xs={9} style={{marginTop:"4px"}}>
                                            <span>Favourite Organizations</span>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <NavigateNextTwoToneIcon style={{marginTop:"5px"}} />
                                        </Grid>
                                    </Grid>
                                </Link>
                            </Typography>
                        </div>      
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{alignItems:"center",display: "flex"}}>
                    <Paper elevation={0} className={classes.paperCont}>  
                        <div style={{width:"100%"}}>
                            <Typography variant="body2" component="p" style={{fontSize:"20px",textAlign:"left"}}>
                                <Link style={{display: 'flex',alignItems: 'center',color: indigo[600]}}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <WorkTwoToneIcon style={{marginTop:"5px"}} />
                                        </Grid>
                                        <Grid item xs={9} style={{marginTop:"4px"}}>
                                            <span>Hot jobs near me</span>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <NavigateNextTwoToneIcon style={{marginTop:"5px"}} />
                                        </Grid>
                                    </Grid>
                                </Link>
                            </Typography>
                        </div>      
                    </Paper>
                </Grid>
            </Grid>
        </FloatCard>
    )
}

export default SideMenu
