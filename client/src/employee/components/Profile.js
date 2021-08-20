import React, {useState, useEffect} from 'react'
import {  makeStyles } from '@material-ui/core'
import '../styles/Profile.css'
import Grid from '@material-ui/core/Grid';
import IntroSection from './IntroSection'
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectsSection';
import Achievements from './Awards';
import Space from './Space';
import WorkExperience from './WorkExperience';
import Volunteer from './Volunteer';
import Course from './Course';
import TechnologySection from './TechnologySection';
import Skills from './Skills';
import CertificatesSection from './CertificatesSection';
import axios from 'axios';
import BACKEND_URL from '../../Config';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundSize: 'cover',
        minHeight: '100vh'
    },
    container: {
        paddingTop: 20,
        [theme.breakpoints.down('sm')]: {
            paddingTop: 0,
        },
    },
    sideDrawerGrid: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    }
}));

function Profile() {
    const classes = useStyles();
    const [jobseekerID, setJobseekerID] = useState(window.location.pathname.split("/")[3]);

    let loginId;
    let login = false;
    const jwt = require("jsonwebtoken");
    const token = sessionStorage.getItem("userToken");
    const header = jwt.decode(token, { complete: true });
    if(token === null){
        loginId=jobseekerID;
    }else if (header.payload.userRole === "jobseeker") {
        login = true;
        loginId=sessionStorage.getItem("loginId");
    } else {
        loginId=jobseekerID;
    }

  useEffect(() => {
    setJobseekerID(window.location.pathname.split("/")[3]);
  }, [window.location.pathname]);

  useEffect(()=>{
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = (date_ob.getMonth() + 1);
    let year = date_ob.getFullYear();

    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const newReach = {
        date: date+"/"+month+"/"+year,
        time: hours+":"+minutes+":"+seconds,
    }

    axios.put(`${BACKEND_URL}/jobseeker/addReach/${loginId}`,newReach)
    .then(res => {
        console.log("reach added")
    });
  },[])

    return (
        <Grid item container sm={12} spacing={3} direction="row" justify="space-between" alignItems="flex-start">
            <Grid item md={12} lg={4} spacing={3}>
                <IntroSection jobseekerID={jobseekerID} />
                <Space />
                <EducationSection jobseekerID={jobseekerID} />
                <Space />
                <CertificatesSection jobseekerID={jobseekerID} />
                <Space />
                <Course jobseekerID={jobseekerID} />
                <Space />
                <Achievements jobseekerID={jobseekerID} />
                <Space />
                <Volunteer jobseekerID={jobseekerID} />
            </Grid>
            <Grid item md={12} lg={8} spacing={3}>
                <WorkExperience jobseekerID={jobseekerID} />
                <Space />
                <ProjectsSection jobseekerID={jobseekerID} />
                <Space />
                <TechnologySection jobseekerID={jobseekerID} />
                <Space />
                <Skills jobseekerID={jobseekerID} />
            </Grid>                                            
        </Grid>
    )
}

export default Profile
