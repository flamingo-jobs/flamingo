import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core'
import FloatCard from '../../../components/FloatCard';
import { Grid, Typography, Button } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import CardMedia from '@material-ui/core/CardMedia';
import defaultImage from '../../images/defaultProfilePic.jpg';
import theme from '../../../Theme';
import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import LinearProgress from '@material-ui/core/LinearProgress';
import BACKEND_URL, { FILE_URL } from '../../../Config';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';

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
        backgroundColor: indigo[50],
        color: indigo[600],
        padding: "15px 0px 15px 15px",
        borderRadius: 10,
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
    nameSection: {
        fontSize: "16px",
        textAlign: "center",

    },
    profileStatsInfo: {
        fontSize: "16px",
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: "5px",
        color: "#666",
    },
}));

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: theme.palette.stateBlue,
    },
}))(LinearProgress);

function ProfileStatus(props) {
    const classes = useStyles();
    const [savedPic, setSavedPic] = useState(require(`../../../components/images/loadingImage.gif`).default);
    const [name, setName] = useState("User");
    const [state, setState] = useState({ education: 0, certificate: 0, courses: 0, awards: 0, volunteerings: 0, works: 0, projects: 0, skills: 0 });
    const [loadingData, setLoadingData] = useState(true);

    let loginId;
    const jwt = require("jsonwebtoken");
    const token = sessionStorage.getItem("userToken");
    const header = jwt.decode(token, { complete: true });
    if (header.payload.userRole === "jobseeker") {
        loginId = sessionStorage.getItem("loginId");
    } else {
        loginId = props.jobseekerID;
    }

    const loadLogo = async () => {
        await axios.get(`${FILE_URL}/jobseeker-profile-pictures/${loginId}.png`).then(res => {
            setSavedPic(`${FILE_URL}/jobseeker-profile-pictures/${loginId}.png`);
        }).catch(error => {
            setSavedPic(defaultImage);
        })
    }


    useEffect(() => {
        axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
            .then(res => {
                if (res.data.success) {
                    //load profile picture
                    loadLogo()
                    //load name
                    if (res.data.jobseeker.name) {
                        setName(res.data.jobseeker.name);
                    }

                    // ----- data to get profile completeness
                    if (res.data.jobseeker.education?.length > 0) {
                        if (Object.keys(res.data.jobseeker.education[0]).length === 0) {
                            res.data.jobseeker.education.splice(0, 1)
                        } else if (res.data.jobseeker.education[0].institute === "" && res.data.jobseeker.university[0].type === "") {
                            res.data.jobseeker.education.splice(0, 1)
                        }
                        if (res.data.jobseeker.education.length > 0) {
                            setState(prevState => {
                                return { ...prevState, education: 1 }
                            })
                        }
                    }
                    if (res.data.jobseeker.certificate?.length > 0) {
                        if (Object.keys(res.data.jobseeker.certificate[0]).length === 0) {
                            res.data.jobseeker.certificate.splice(0, 1)
                        } else if (res.data.jobseeker.certificate[0].issuer === "" && res.data.jobseeker.certificate[0].title === "") {
                            res.data.jobseeker.certificate.splice(0, 1)
                        }
                        if (res.data.jobseeker.certificate.length > 0) {
                            setState(prevState => {
                                return { ...prevState, certificate: 1 }
                            })
                        }
                    }
                    if (res.data.jobseeker.course.length > 0) {
                        if (Object.keys(res.data.jobseeker.course[0]).length === 0) {
                            res.data.jobseeker.course.splice(0, 1)
                        } else if (res.data.jobseeker.course[0].course === "" && res.data.jobseeker.course[0].institute === "" && res.data.jobseeker.course[0].from === "" && res.data.jobseeker.course[0].to === "") {
                            res.data.jobseeker.course.splice(0, 1)
                        }
                        if (res.data.jobseeker.course.length > 0) {
                            setState(prevState => {
                                return { ...prevState, courses: 1 }
                            })
                        }
                    }
                    if (res.data.jobseeker.award.length > 0) {
                        if (Object.keys(res.data.jobseeker.award[0]).length === 0) {
                            res.data.jobseeker.award.splice(0, 1)
                        } else if (res.data.jobseeker.award[0].title === "" && res.data.jobseeker.award[0].issuedBy === "" && res.data.jobseeker.award[0].date === "" && res.data.jobseeker.award[0].description === "") {
                            res.data.jobseeker.award.splice(0, 1)
                        }
                        if (res.data.jobseeker.award.length > 0) {
                            setState(prevState => {
                                return { ...prevState, awards: 1 }
                            })
                        }
                    }
                    if (res.data.jobseeker.volunteer.length > 0) {
                        if (Object.keys(res.data.jobseeker.volunteer[0]).length === 0) {
                            res.data.jobseeker.volunteer.splice(0, 1)
                        } else if (res.data.jobseeker.volunteer[0].title === "" && res.data.jobseeker.volunteer[0].organization === "" && res.data.jobseeker.volunteer[0].from === "" && res.data.jobseeker.volunteer[0].to === "") {
                            res.data.jobseeker.volunteer.splice(0, 1)
                        }
                        if (res.data.jobseeker.volunteer.length > 0) {
                            setState(prevState => {
                                return { ...prevState, volunteerings: 1 }
                            })
                        }
                    }
                    if (res.data.jobseeker.work.length > 0) {
                        if (Object.keys(res.data.jobseeker.work[0]).length === 0) {
                            res.data.jobseeker.work.splice(0, 1)
                        } else if (res.data.jobseeker.work[0].place === "" && res.data.jobseeker.work[0].description === "" && res.data.jobseeker.work[0].position === "" && res.data.jobseeker.work[0].from === "" && res.data.jobseeker.work[0].to === "" && res.data.jobseeker.work[0].taskAndResponsibility === "") {
                            res.data.jobseeker.work.splice(0, 1)
                        }
                        if (res.data.jobseeker.work.length > 0) {
                            setState(prevState => {
                                return { ...prevState, works: 1 }
                            })
                        }
                    }
                    if (res.data.jobseeker.project.length > 0) {
                        if (Object.keys(res.data.jobseeker.project[0]).length === 0) {
                            res.data.jobseeker.project.splice(0, 1)
                        } else if (res.data.jobseeker.project[0].name === "" && res.data.jobseeker.project[0].link === "" && res.data.jobseeker.project[0].description === "" && res.data.jobseeker.project[0].from === "" && res.data.jobseeker.project[0].to === "") {
                            res.data.jobseeker.project.splice(0, 1)
                        }
                        if (res.data.jobseeker.project.length > 0) {
                            setState(prevState => {
                                return { ...prevState, projects: 1 }
                            })
                        }
                    }
                    if (res.data.jobseeker.skills.length > 0) {
                        if (Object.keys(res.data.jobseeker.skills[0]).length === 0) {
                            res.data.jobseeker.skills.splice(0, 1)
                        } else if (res.data.jobseeker.skills[0] === "") {
                            res.data.jobseeker.skills.splice(0, 1)
                        }
                        if (res.data.jobseeker.skills.length > 0) {
                            setState(prevState => {
                                return { ...prevState, skills: 1 }
                            })
                        }
                    }
                    setLoadingData(false);
                }
            })
    }, [])

    const displayStatus = () => {
        let temp = state.education + state.certificate + state.courses + state.awards + state.volunteerings + state.works + state.projects + state.skills;
        temp = temp / 8 * 100;
        if (temp < 100) {
            return (
                <Grid item sm={12} style={{ alignItems: "center", display: "flex" }}>
                    <div style={{ width: "60%" }}>
                        <Typography variant="body2" component="p" style={{ fontSize: "16px", textAlign: "left", fontWeight: "bold", color: "#1976d2" }}>
                            Next : Add {state.works === 0 ? "Work Experience" : state.education === 0 ? "Education" : state.certificate === 0 ? "Certificates" : state.projects === 0 ? "Projects" : state.courses === 0 ? "Courses" : state.awards === 0 ? "Awards" : state.volunteerings === 0 ? "Volunteering" : state.skills === 0 ? "Skills" : ""}
                        </Typography>
                    </div>
                    <div style={{ width: "40%" }}>
                        <Link to="/jobseeker/profile">
                            <Button className={classes.defaultButton} style={{ padding: "10px 15px 10px 15px", textTransform: 'none', backgroundColor: theme.palette.tuftsBlue }}>Finish Your Profile</Button>
                        </Link>
                    </div>
                </Grid>
            );
        }
    }

    return (
        <FloatCard>
            {loadingData ?
                <Loading /> :
                <Grid container spacing={3} style={{ padding: "20px" }}>
                    <Grid item xs={12}>
                        <Typography component="div">
                            <CardMedia
                                className={classes.media}
                                image={savedPic}
                                alt="profile image"
                                zindex="background"
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{ fontSize: "25px", fontWeight: "bold", color: theme.palette.stateBlue }}>
                            {name}
                        </Typography>
                        <Typography variant="body2" component="p" className={classes.nameSection}>
                            <Link to="/jobseeker/profile" style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', color: theme.palette.tuftsBlue, }}>
                                <span>View Profile</span><ChevronRightTwoToneIcon style={{ marginTop: "-1px" }} />
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ alignItems: "center", display: "flex" }}>
                        <div style={{ width: "100%" }}>
                            <Typography variant="body2" component="p" className={classes.profileStatsInfo}>
                                Your profile is {(state.education + state.certificate + state.courses + state.awards + state.volunteerings + state.works + state.projects + state.skills) / 8 * 100}% complete
                            </Typography>
                            <BorderLinearProgress variant="determinate" value={(state.education + state.certificate + state.courses + state.awards + state.volunteerings + state.works + state.projects + state.skills) / 8 * 100} />
                        </div>
                    </Grid>
                    {displayStatus()}
                </Grid>}
        </FloatCard>
    )
}

export default ProfileStatus
