import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BACKEND_URL from '../../Config';
import '../styles/Profile.css';
import Achievements from './Awards';
import CertificatesSection from './CertificatesSection';
import Course from './Course';
import EducationSection from './EducationSection';
import InterestArea from './InterestArea';
import IntroSection from './IntroSection';
import ProjectsSection from './ProjectsSection';
import Skills from './Skills';
import Space from './Space';
import TechnologySection from './TechnologySection';
import Volunteer from './Volunteer';
import WorkExperience from './WorkExperience';


function Profile() {
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
    let month = ("" + (date_ob.getMonth() + 1)).slice(-2);
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
        <Grid item container xs={12} spacing={3} direction="row" justify="space-between" alignItems="flex-start">
            <Grid item xs={12} lg={4}>
                <IntroSection jobseekerID={jobseekerID} />
                <Space />
                <EducationSection jobseekerID={jobseekerID} />
                <Space />    
                <CertificatesSection jobseekerID={jobseekerID} />
                <Space />
                <Course jobseekerID={jobseekerID} />
                <Space />
                <Volunteer jobseekerID={jobseekerID} />
            </Grid>
            <Grid item xs={12} lg={8}>
                <InterestArea jobseekerID={jobseekerID} />
                <Space />
                <WorkExperience jobseekerID={jobseekerID} />
                <Space />
                <ProjectsSection jobseekerID={jobseekerID} />
                <Space />
                <TechnologySection jobseekerID={jobseekerID} />
                <Space />
                <Achievements jobseekerID={jobseekerID} />
                <Space />
                <Skills jobseekerID={jobseekerID} />
            </Grid>                                            
        </Grid>
    )
}

export default Profile
