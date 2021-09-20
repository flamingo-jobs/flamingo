import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  makeStyles,
  Typography,
  Grid,
  Chip,
} from "@material-ui/core";
import FloatCard from "../../components/FloatCard";
import GetAppIcon from "@material-ui/icons/GetApp";
import Status from "./status";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import StatusModal from "./statusModal";
import axios from "axios";
import BACKEND_URL, { FILE_URL } from "../../../Config";
import download from 'downloadjs';
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import defaultImage from '../../../employee/images/defaultProfilePic.jpg';
import CardMedia from '@material-ui/core/CardMedia';
import Percentage from "../../../components/Percentage";
import CircularStatic from "../../../admin/components/CicularProgressWithLabel";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
  cardContainer: {
    marginBottom: theme.spacing(2),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  label: {
    alignSelf: "left",
    marginRight: 15,
    backgroundColor: theme.palette.tagYellow,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  headerRight: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
  editButton: {
    "&:hover": {
      backgroundColor: theme.palette.white,
    },
  },
  editIcon: {
    color: theme.palette.tagIcon,
    "&:hover": {
      cursor: "pointer",
    },
  },
  tagIcon: {
    color: theme.palette.tagIcon,
  },
  favorite: {
    display: "block",
    color: theme.palette.pinkyRed,
  },
  body: {
    margin: 10,
    marginTop: 20,
  },
  title: {
    fontWeight: 500,
    marginLeft: 10,
  },
  infoTags: {
    margin: 10,
  },
  tag: {
    marginRight: 10,
    backgroundColor: "white",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    marginTop: 20,
  },
  footerLeft: {
    display: "flex",
    alignItems: "center",
  },
  footerRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    borderRadius: 12,
    width: 70,
    height: 70,
  },
  company: {
    marginLeft: 10,
    fontWeight: 500,
  },
  downloadBtn: {
    paddingLeft: "13px",
    paddingRight: "13px",
    borderRadius: 50,
    border: `2px solid ${theme.palette.vividSkyBlue}`,
    backgroundColor: theme.palette.vividSkyBlue,
    color: theme.palette.white,
    transition: "0.3s",
    "&:hover": {
      border: `2px solid ${theme.palette.vividSkyBlue}`,
      backgroundColor: theme.palette.white,
      color: theme.palette.vividSkyBlue,
      transition: "0.3s",
    },
  },

  profileBtn: {
    paddingLeft: "13px",
    paddingRight: "13px",
    borderRadius: 50,
    border: `2px solid ${theme.palette.vividSkyBlue}`,
    backgroundColor: theme.palette.white,
    color: theme.palette.vividSkyBlue,
    transition: "0.3s",
    "&:hover": {
      backgroundColor: theme.palette.vividSkyBlue,
      color: theme.palette.white,
      transition: "0.3s",
    },
  },
  headerInfo: {
    display: "block",
  },
  tagline: {
    marginLeft: 10,
    marginRight: 10,
  },
}));

// style={{border : "1px solid red"}}
function ApplicantCard(props) {
  const classes = useStyles();
  console.log(props.matches)
  const [savedPic, setSavedPic] = useState(require(`../../../components/images/loadingImage.gif`).default);

  // Status modal
  const [open, setOpen] = useState(false);

  const jobId = window.location.pathname.split("/")[3];
  const [status, setStatus] = useState("");

  useEffect(() => {
    const newStatus = props.jobseeker.applicationDetails.filter((item) => item.jobId === jobId)[0]
      .status;
    setStatus(newStatus);
  }, [props.shortlistEveryone]);

  const [logo, setLogo] = useState(require(`../../components/images/loadingImage.gif`).default);

  useEffect(() => {
    loadLogo();
  }, [])

  const loadLogo = async () => {
    await axios.get(`${FILE_URL}/jobseeker-profile-pictures/${props.jobseeker._id}.png`).then(res => {
      setLogo(`${FILE_URL}/jobseeker-profile-pictures/${props.jobseeker._id}.png`);
    }).catch(error => {
      setLogo({});
    })
  }

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleResumeDownload = async () => {
    const resumeName = props.jobseeker.applicationDetails.filter((item) => item.jobId === jobId)[0]
      .resumeName;
    try {
      const response = await axios.get(`${BACKEND_URL}/resume/${jobId}/${props.jobseeker._id}`, {
        responseType: 'blob'
      });
      const file = new Blob([response.data], {
        type: "application/pdf",
      });

      if (status === "pending") {
        setStatus("reviewing");
        const jobseekerData = {
          status: "reviewing",
          jobId: jobId,
        };
        const jobData = {
          status: "reviewing",
          userId: props.jobseeker._id
        };

        const jobseekerResponse = await axios.patch(
          `${BACKEND_URL}/jobseeker/updateResumeStatus/${props.jobseeker._id}`,
          jobseekerData
        );

        const jobResponse = await axios.patch(
          `${BACKEND_URL}/jobs/updateResumeStatus/${jobId}`,
          jobData
        );
        if (jobseekerResponse.data.success && jobResponse.data.success) {
          props.setAlertData({
            severity: "success",
            msg: "Status Changed successfully!",
          });
          props.handleAlert();
        }
      }
      return download(file, props.jobseeker.name, "application/pdf");

    } catch (err) {
      // console.log(err);
    }
  }

  const displayStatusModal = () => {
    if (status !== "") {
      return (<StatusModal
        status={status}
        setStatus={setStatus}
        open={open}
        handleClose={handleClose}
        userId={props.jobseeker._id}
        jobId={props.jobId}
        job={props.job}
        setAlertData={props.setAlertData}
        handleAlert={props.handleAlert}
      ></StatusModal>);

    }
  }

  return (
    <>
      {displayStatusModal()}

      <FloatCard>
        <div className={classes.root}>
          <div className={classes.header}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <div className={classes.headerLeft}>
                  <Avatar className={classes.logo} src={logo} variant="square" />
                  <div className={classes.headerInfo}>
                    <Typography variant="h5" className={classes.title}>
                      {props.jobseeker.name}
                    </Typography>
                    <Typography className={classes.tagline} >
                      {props.jobseeker.tagline}
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.headerRight}>
                  {status === "pending" && <Status status={status} text={"Pending...."}></Status>}
                  {status === "reviewing" && <Status status={status} text={"Reviewing"}></Status>}
                  {status === "shortlisted" && <Status status={status} text={"Shortlisted"}></Status>}
                  {status === "rejected" && <Status status={status} text={"Rejected"}></Status>}
                  <IconButton aria-label="delete" className={classes.editButton}>
                    <EditIcon className={classes.editIcon} onClick={handleOpen} />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </div>

          <div className={classes.body}>
            <Typography noWrap className={classes.description}>
              {props.jobseeker.intro}
            </Typography>
            <div className={classes.infoTags}>
              {props.jobseeker.education && props.jobseeker.education.length > 0 ? <Chip icon={<SchoolRoundedIcon />} label={props.jobseeker.education[0].institute} className={classes.tag} /> : null}
              {props.jobseeker.work.length > 0 ? <Chip icon={<WorkRoundedIcon />} label={props.jobseeker.work[props.jobseeker.work.length - 1].place} className={classes.tag} /> : null}

            </div>
            {props.matches ?
              <Grid container spacing={2} direction="row"
              justifyContent="center"
              alignItems="stretch" style={{marginTop: 16}}>
                <Grid item xs={12} md={4} style={{alignSelf: 'center', textAlign: 'center'}}>
                  <CircularStatic value={props.matches.score} />
                  <Typography>Overall score</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography style={{ marginBottom: 16 }}></Typography>
                  <Grid container spacing={2} >
                    {props.matches.education ?
                      <Grid item container spacing={2} >
                        <Grid item xs={12} md={3}>
                          <Typography>Education</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} style={{alignSelf: 'center'}}>
                          <Percentage value={props.matches.education} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography>{`${props.matches.education.toFixed(2)}%`}</Typography>
                        </Grid>
                      </Grid> : null}
                    {props.matches?.experience ?
                      <Grid item container spacing={2} >
                        <Grid item xs={12} md={3}>
                          <Typography>Experience</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} style={{alignSelf: 'center'}}>
                          <Percentage value={props.matches.experience} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography>{`${props.matches.experience.toFixed(2)}%`}</Typography>
                        </Grid>
                      </Grid> : null}
                    {props.matches?.techStack ?
                      <Grid item container spacing={2} >
                        <Grid item xs={12} md={3}>
                          <Typography>Technology Stack</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} style={{alignSelf: 'center'}}>
                          <Percentage value={props.matches.techStack} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography>{`${props.matches.techStack.toFixed(2)}%`}</Typography>
                        </Grid>
                      </Grid> : null}
                    {props.matches?.projects ?
                      <Grid item container spacing={2} >
                        <Grid item xs={12} md={3}>
                          <Typography>Projects</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} style={{alignSelf: 'center'}}>
                          <Percentage value={props.matches.projects} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography>{`${props.matches.projects.toFixed(2)}%`}</Typography>
                        </Grid>
                      </Grid> : null}
                    {props.matches?.skills ?
                      <Grid item container spacing={2} >
                        <Grid item xs={12} md={3}>
                          <Typography>Skills</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} style={{alignSelf: 'center'}}>
                          <Percentage value={props.matches.skills} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography>{`${props.matches.skills.toFixed(2)}%`}</Typography>
                        </Grid>
                      </Grid> : null}
                    {props.matches?.certificates ?
                      <Grid item container spacing={2} >
                        <Grid item xs={12} md={3}>
                          <Typography>Certificates</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} style={{alignSelf: 'center'}}>
                          <Percentage value={props.matches.certificates} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography>{`${props.matches.certificates.toFixed(2)}%`}</Typography>
                        </Grid>
                      </Grid> : null}
                    {props.matches?.courses ?
                      <Grid item container spacing={2} >
                        <Grid item xs={12} md={3}>
                          <Typography>Courses</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} style={{alignSelf: 'center'}}>
                          <Percentage value={props.matches.courses} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography>{`${props.matches.courses.toFixed(2)}%`}</Typography>
                        </Grid>
                      </Grid> : null}
                    {props.matches?.extraCurricular ?
                      <Grid item container spacing={2} >
                        <Grid item xs={12} md={3}>
                          <Typography>Extra Curricular</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} style={{alignSelf: 'center'}}>
                          <Percentage value={props.matches.extraCurricular} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography>{`${props.matches.extraCurricular.toFixed(2)}%`}</Typography>
                        </Grid>
                      </Grid> : null}
                    {props.matches?.awards ?
                      <Grid item container spacing={2} >
                        <Grid item xs={12} md={3}>
                          <Typography>Awards</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} style={{alignSelf: 'center'}}>
                          <Percentage value={props.matches.awards} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography>{`${props.matches.awards.toFixed(2)}%`}</Typography>
                        </Grid>
                      </Grid> : null}
                  </Grid>
                </Grid>
              </Grid> : null}
          </div>

          <div className={classes.footer}>
            <div className={classes.footerLeft}></div>
            <div className={classes.footerRight}>
              <Link to={`/jobseeker/profile/${props.jobseeker._id}`}>
                <Button
                  className={classes.profileBtn}
                  startIcon={<PersonIcon />}
                >
                  View Profile
                </Button>
              </Link>
              <Button
                className={classes.downloadBtn}
                startIcon={<GetAppIcon />}
                onClick={handleResumeDownload}
              >
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </FloatCard>
    </>
  );
}

export default ApplicantCard;
