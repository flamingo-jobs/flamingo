import {
  Avatar,
  Button, Chip, Container, Grid, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from '@material-ui/icons/Description';
import GetAppIcon from "@material-ui/icons/GetApp";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import PeopleIcon from '@material-ui/icons/People';
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FloatCard from "../../../components/FloatCard";
import SnackBarAlert from "../../../components/SnackBarAlert";
import BACKEND_URL, { FILE_URL } from "../../../Config";
import Status from "./status";
import UploadModal from "./uploadModal";

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  floatcardWrapper: {
    marginBottom: theme.spacing(2),
  },
  summaryContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 8,
    marginBottom: 15,
  },
  header: {
    display: "block",
    textAlign: "left",
    margin: 10,
    marginTop: 0,
    marginLeft: 0,
  },
  companyName: {
    textAlign: "left",
    color: theme.palette.black,
    fontWeight: 400,
  },
  jobDetailsContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: "left",
    marginBottom: theme.spacing(4),
  },
  headerMain: {
    display: "flex",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    alignSelf: "left",
    marginRight: 15,
    backgroundColor: theme.palette.tagYellow,
  },
  tagIcon: {
    color: theme.palette.tagIcon,
  },
  body: {
    margin: 10,
    marginTop: 0,
    marginLeft: 0,
  },
  title: {
    fontWeight: 500,
  },
  titleLink:{
    color: "inherit",
    textDecoration: "inherit",
  },
  infoTags: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  },
  tag: {
    marginRight: 10,
    backgroundColor: "white",
  },
  headerInfo: {
    display: "block",
    marginLeft: 10,
  },
  logo: {
    borderRadius: 12,
    width: 60,
    height: 60,
  },
  statusContainer:{
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  shortlisted: {
    fontSize: "30px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    color: theme.palette.black,
  },
  bottomContainer:{
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  appliedContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "left",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  appliedOn: {
    fontSize: "16px",
    fontWeight: 500,
    marginRight: "10px",
  },
  appliedDate: {
    color: theme.palette.black,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  resumeBtnContainer: {
    marginTop: "20px",
    display: "flex",
    // justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  downloadContainer: {
    marginTop: "20px",
    display: "flex",
    // justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "0px",
    },
  },
  downloadBtn: {
    paddingLeft: "13px",
    paddingRight: "13px",
    borderRadius: 12,
    backgroundColor: theme.palette.tuftsBlue,
    border: `2px solid ${theme.palette.tuftsBlue}`,
    color: theme.palette.white,
    transition: "0.3s",
    "&:hover": {
      border: `2px solid ${theme.palette.tuftsBlue}`,
      backgroundColor: theme.palette.white,
      color: theme.palette.tuftsBlue,
      transition: "0.3s",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "26px",
      paddingRight: "26px",
    },
  },
  changeBtn: {
    paddingLeft: "13px",
    paddingRight: "13px",
    borderRadius: 12,
    border: `2px solid ${theme.palette.tuftsBlue}`,
    backgroundColor: theme.palette.white,
    color: theme.palette.tuftsBlue,
    transition: "0.3s",
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlue,
      color: theme.palette.white,
      transition: "0.3s",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "21px",
      paddingRight: "21px",
    },
  },
}));

const Job = (props) => {
  const classes = useStyles();
  const [job, setJob] = useState("empty");
  const [applicationDetails, setApplicationDetails] = useState(
    props.applicationDetails
  );

  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });
  const [logo, setLogo] = useState(require(`../../../components/images/loadingImage.gif`).default);

  const [open, setOpen] = useState(false);
  const [fileData, setFileData] = useState("empty");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  useEffect(() => {
    retrieveJob();
  }, []);

  useEffect(() => {
    if (job !== "empty") {
      loadLogo();
    }
  }, [job]);

  const loadLogo = async () => {
    await axios.get(`${FILE_URL}/employer-profile-pictures/${job.organization.id}.png`).then(res => {
      setLogo(`${FILE_URL}/employer-profile-pictures/${job.organization.id}.png`);
    }).catch(error => {
      setLogo(require(`../../../employer/images/default_company_logo.png`).default);
    })
  }

  const retrieveJob = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/jobs/${props.jobId}`);
      if (response.data.success) {
        setJob(response.data.job);
      } else {
        // console.log("404 Job not found");
      }
    } catch (err) {
      // console.log("Could not retreive job");
      // console.log(err);
    }
  };

  const handleTitleClick = () => { };

  // const handleResumeDownload = async () => {
  //   const resumeName = props.applicationDetails.resumeName;

  //   try {
  //     // const response = await axios.get(
  //     //   `${BACKEND_URL}/resume/${props.jobId}/${props.userId}`,
  //     //   {
  //     //     responseType: "arraybuffer",
  //     //   }
  //     // );
  //     // const file = new Blob([response.data], {
  //     //   type: "application/pdf",
  //     // });

  //     return download(`${FILE_URL}/resumes/${newFile.name}`, "Flamingo_Resume", "application/pdf");
  //   } catch (err) {
  //     // console.log(err);
  //     if (err.status === 400) {
  //       // console.log("Error while downloading file. Try again later");
  //     }
  //   }
  // };

  const displayAlert = () => {
    return (
      <SnackBarAlert
        open={alertShow}
        onClose={handleAlertClose}
        severity={alertData.severity}
        msg={alertData.msg}
      />
    );
  };

  const numOfApplicants = () => {
    if(job.applicationDetails?.length === 1){
      return `${job.applicationDetails.length} applicant`;
    }
    return `${job.applicationDetails.length} applicants`;
  }

  // style={{border: "1px solid red"}}
  const displayJob = () => {
    if (job !== "empty") {
      return (
        <FloatCard>
          <Container>
            {displayAlert()}
            <UploadModal
              open={open}
              jobId={props.jobId}
              handleClose={handleClose}
              fileData={fileData}
              setFileData={setFileData}
              setAlertData={setAlertData}
              handleAlert={handleAlert}
            ></UploadModal>

            <Container className={classes.summaryContainer}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={8}>
                  <div className={classes.header}>
                    <div className={classes.headerMain}>
                      <Avatar
                        className={classes.logo}
                        src={
                          logo
                        }
                        variant="square"
                      />
                      <div className={classes.headerInfo}>

                        <Link to={`/jobDescription/${job._id}`} className={classes.titleLink}>
                          <Typography
                            variant="h5"
                            className={classes.title}
                            onClick={handleTitleClick}
                          >
                            {job.title}
                          </Typography>
                        </Link>

                        <Typography
                          variant="h6"
                          className={classes.companyName}
                        >
                          {job.organization.name}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className={classes.body}>
                    <div className={classes.infoTags}>
                      <Chip
                        icon={<LocationOnRoundedIcon />}
                        label={job.location}
                        className={classes.tag}
                      />
                      <Chip
                        icon={<WorkRoundedIcon />}
                        label={job.type}
                        className={classes.tag}
                      />
                      <Chip
                        icon={<PeopleIcon />}
                        label={numOfApplicants()}
                        className={classes.tag}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className={classes.statusContainer}>
                    {applicationDetails.status === "pending" && (
                      <Status
                        status={applicationDetails.status}
                        text={"Pending...."}
                      ></Status>
                    )}
                    {applicationDetails.status === "reviewing" && (
                      <Status
                        status={applicationDetails.status}
                        text={"Reviewing"}
                      ></Status>
                    )}
                    {applicationDetails.status === "shortlisted" && (
                      <Status
                        status={applicationDetails.status}
                        text={"Shortlisted"}
                      ></Status>
                    )}
                    {applicationDetails.status === "rejected" && (
                      <Status
                        status={applicationDetails.status}
                        text={"Rejected"}
                      ></Status>
                    )}
                  </div>
                </Grid>
                {/* <div>
                  <PlaylistAddCheckIcon className={classes.shortlisted} />
                </div> */}
              </Grid>
            </Container>
            <Container className={classes.jobDetailsContainer}>
              {job.description.length >= 200 && (
                <Typography>{job.description.slice(0, 200)}.....</Typography>
              )}
              {job.description.length < 200 && (
                <Typography>{job.description}</Typography>
              )}
              <div className={classes.bottomContainer}>
                <div className={classes.appliedContainer}>
                  <Typography className={classes.appliedDate}>
                    <span className={classes.appliedOn}>Applied on:</span>{" "}
                    {props.applicationDetails.appliedDate.slice(0, 10)}
                  </Typography>
                </div>

                <div className={classes.btnContainer}>
                  {applicationDetails.status === "pending" && (
                    <div className={classes.resumeBtnContainer}>
                      <Button
                        className={classes.changeBtn}
                        onClick={handleOpen}
                        startIcon={<DescriptionIcon />}
                      >
                        Change the Resume
                      </Button>
                    </div>
                  )}

                  <div className={classes.downloadContainer}>
                    <Link to={{ pathname: `${FILE_URL}/resumes/${props.applicationDetails.resumeName}` }} target="_blank" download>
                      <Button
                        className={classes.downloadBtn}
                        startIcon={<GetAppIcon />}
                      >
                        Download Resume
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </Container>
        </FloatCard>
      );
    } else {
      // return (
      //   <FloatCard>
      //     <Typography>No information to display</Typography>
      //   </FloatCard>
      // );
    }
  };

  return <div className={classes.floatcardWrapper}>{displayJob()}</div>;
};

export default Job;
