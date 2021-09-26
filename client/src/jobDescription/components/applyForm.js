import { Button, Container, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import PublishIcon from "@material-ui/icons/Publish";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import FloatCard from "../../components/FloatCard";
import Loading from "../../components/Loading";
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL, { FILE_URL } from "../../Config";
import ItPerson from "../lotties/itPerson.json";
import uploadFileToBlob, {
  isStorageConfigured,
} from "../../utils/azureFileUpload";
import { useDispatch, useSelector } from "react-redux";
import { setNewNotifications, setApplicationCount } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  applyFormWrapper: {
    marginTop: theme.spacing(3),
  },
  res: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formInfo: {
    marginBottom: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.black,
    fontWeight: 500,
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  uploadButton: {
    width: "250px",
    color: theme.palette.tuftsBlue,
    borderColor: theme.palette.tuftsBlue,
    "&:hover": {
      borderColor: theme.palette.tuftsBlueHover,
    },
  },
  input: {
    display: "none",
  },
  uploadBtnIcon: {
    marginRight: "5px",
  },
  submitButton: {
    width: "250px",
    color: theme.palette.white,
    background: theme.palette.tuftsBlue,
    // background: "#E94B4C",
    transition: "0.3s",
    "&:hover": {
      background: theme.palette.tuftsBlueHover,
      transition: "0.3s",
    },
  },
  fileNameContainer: {
    marginTop: "5px",
    display: "flex",
    justifyContent: "center",
  },
  fileIcon: {
    color: theme.palette.tuftsBlue,
    marginRight: "7px",
  },
  fileName: {
    paddingTop: "2px",
    color: theme.palette.tuftsBlue,
    marginRight: "7px",
  },
  removeBtn: {
    padding: "0px",
    "&:hover": {
      background: theme.palette.white,
    },
  },
  removeIcon: {
    height: "18px",
    color: theme.palette.stateBlue,
  },
  titleWrapper: {
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: 600,
    color: theme.palette.black,
  },
  submitBtnWrapper: {
    marginTop: theme.spacing(2),
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.stateBlue,
    marginLeft: "10px",
    position: "absolute",
    top: "20%",
  },
}));

// Validation schema
// const phoneNumberRegex = /^\d{10}$/;

const ApplyForm = (props) => {
  const classes = useStyles();

  const [userId, setUserId] = useState(props.userId);
  const [jobId, setJobId] = useState(props.jobId);

  const [fileData, setFileData] = useState("empty");

  const [uploading, setUploading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [subscriptionStatus, setSubscriptionStatus] = useState();

  const notificationCount = useSelector((state) => state.newNotifications);
  const dispatch = useDispatch();
  const timer = useRef();
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const retrieveSubscriptionStatus = async () => {
    const empId = props.orgId;
    try {
      const response = await axios.get(
        `${BACKEND_URL}/employer/subscription-status/${empId}`
      );
      if (response.data.success) {
        setSubscriptionStatus(response.data.existingData);
      }
    } catch (err) {
      setAlertData({
        severity: "error",
        msg: "There was an error with server. Please try again!",
      });
      handleAlert();
    }
  };
  useEffect(() => {
    retrieveSubscriptionStatus();
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 5000);
    }
  };

  const handleFileChange = (e) => {
    setFileData("empty");

    if (e.target.files[0]) {
      let nameSplit = e.target.files[0].name.split(".");
      // console.log("file extention", nameSplit[nameSplit.length - 1]);
      if (nameSplit[nameSplit.length - 1] !== "pdf") {
        setAlertData({
          severity: "error",
          msg: "Invalid file type, only PDF file type is allowed",
        });
        handleAlert();
      } else {
        setFileData(e.target.files[0]);
      }
    }
  };

  // const handleFileRemove = () => {
  //   setFileData("empty");
  // };

  // Error related stuff
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

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  const displayFileName = () => {
    if (fileData === "empty") {
      return null;
    }
    return (
      <div className={classes.fileNameContainer}>
        <DescriptionIcon className={classes.fileIcon}></DescriptionIcon>
        <div className={classes.fileName}>{fileData.name}</div>
        {/* <IconButton className={classes.removeBtn} onClick={handleFileRemove}>
          <CloseIcon className={classes.removeIcon}/>
        </IconButton> */}
      </div>
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (fileData === "empty") {
      setAlertData({
        severity: "error",
        msg: "You should upload your resume first",
      });
      handleAlert();
      return;
    }

    if (!loading && fileData !== "empty") {
      setSuccess(false);
      setLoading(true);
    }

    // Data to rename the pdf
    const data = new FormData();
    data.append("userId", userId);
    data.append("jobId", jobId);
    data.append("resume", fileData);

    // DB resume details
    const resumeExt =
      "." + fileData.name.split(".")[fileData.name.split(".").length - 1];

    const resumeDetailsJobSeeker = {
      status: "pending",
      appliedDate: new Date(),
      jobId: jobId,
      resumeName: jobId + "--" + userId + resumeExt,
    };

    const resumeDetailsJob = {
      status: "pending",
      appliedDate: new Date(),
      userId: userId,
      resumeName: jobId + "--" + userId + resumeExt,
    };

    try {
      // Update resume details in jobseeker collection
      const resumeDetailsResponseJobSeeker = await axios.patch(
        `${BACKEND_URL}/jobseeker/updateResumeDetails/${userId}`,
        resumeDetailsJobSeeker
      );

      if (resumeDetailsResponseJobSeeker.data.success) {
        // Update resume details in jobs collection
        const resumeDetailsResponseJob = await axios.patch(
          `${BACKEND_URL}/jobs/updateResumeDetails/${jobId}`,
          resumeDetailsJob
        );

        if (resumeDetailsResponseJob.data.success) {
          var file = fileData;
          var blob = file.slice(0, file.size);
          var newFile = new File([blob], `${jobId}--${userId}.pdf`);

          await uploadFileToBlob(newFile, "resumes");

          // Add resume to the server
          // const resumeResponse = await axios.post(
          //   `${BACKEND_URL}/resume`,
          //   data,
          //   {
          //     headers: {
          //       "Content-Type": "multipart/form-data",
          //     },
          //   }
          // );

          setUploading(true);

          await delay(5000);

          await axios
            .get(`${FILE_URL}/resumes/${newFile.name}`)
            .then((res) => {
              setAlertData({
                severity: "success",
                msg: "Application sent!",
              });
              handleAlert();
              setSuccess(true);
              setLoading(false);
              dispatch(setApplicationCount(props.appliedJobCount + 1));
            })
            .catch((error) => {
              setAlertData({
                severity: "error",
                msg: "Application could not be sent!",
              });
              handleAlert();
            });
          await delay(2000);
          window.scrollTo(0, 0);
          props.handleApply();

          axios.put(`${BACKEND_URL}/jobSeeker/addNotifications/${userId}`, {
            title: "Your application is submitted",
            description: `for ${props.name} at ${props.org}`,
            link: `/jobseeker/appliedJobs`,
            type: "job_applied",
            createdAt: new Date(),
            isUnRead: true,
          });

          dispatch(setNewNotifications(notificationCount + 1));

          axios.put(`${BACKEND_URL}/employer/addNotifications/${props.orgId}`, {
            title: "New job application",
            description: `for ${props.name}`,
            link: `/employer/resumes/${props.jobId}`,
            type: "job_applied",
            createdAt: new Date(),
            isUnRead: true,
          });
        } else {
          setAlertData({
            severity: "error",
            msg: "Something's not quite right! Please try again later",
          });
          handleAlert();
        }
      } else {
        // Error occurred in job seeker update
        if (resumeDetailsResponseJobSeeker.data.error) {
          setAlertData({
            severity: "error",
            msg: "Something's not quite right! Please try again later",
          });
          handleAlert();
        }
      }
    } catch (error) {
      setAlertData({
        severity: "error",
        msg: "Something went wrong! Please try again later",
      });
      handleAlert();
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ItPerson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={classes.applyFormWrapper} id="applyJob">
      {displayAlert()}
      <div className={classes.titleWrapper}>
        <FloatCard>
          <Typography variant="h5" className={classes.title}>
            Apply for this job
          </Typography>
        </FloatCard>
      </div>
      <FloatCard>
        {subscriptionStatus ? (
          subscriptionStatus.subscriptionType.toLowerCase() === "premium" ||
          subscriptionStatus.packageDetails[0].maxResumes -
            props.appliedJobCount >
            0 ? (
            <Container className={classes.res}>
              {!success ? (
                <Typography className={classes.formInfo} id="applyForm">
                  Upload your resume using the link given below.
                  <br />
                  You can view the status of the application shortlisting
                  process
                  <br />
                  in the Applied Jobs page.
                </Typography>
              ) : null}
              <div className={classes.animation}>
                <Lottie
                  className={classes.lottie}
                  options={defaultOptions}
                  height="300px"
                  width="300px"
                />
              </div>
              {!success ? (
                <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                  <div style={{ color: "#fff" }}>
                    <input
                      className={classes.input}
                      id="resume"
                      name="resume"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="resume">
                      <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                        startIcon={<PublishIcon />}
                        className={classes.uploadButton}
                        disabled={loading}
                      >
                        Upload resume
                      </Button>
                    </label>
                  </div>
                  {displayFileName()}
                  <div className={classes.submitBtnWrapper}>
                    <Button
                      color="primary"
                      className={classes.submitButton}
                      type="submit"
                      disabled={loading}
                    >
                      Submit Application
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </form>
              ) : (
                <Typography className={classes.formInfo}>
                  Your application has been sent successfully. Good Luck!
                  <br />
                  You can view the status of the application shortlisting
                  process
                  <br />
                  in the Applied Jobs page.
                </Typography>
              )}
            </Container>
          ) : (
            <Container className={classes.res}>
              <Typography className={classes.formInfo}>
                Sorry! This job has received the maximum number of resumes
                already
              </Typography>
            </Container>
          )
        ) : (
          <Loading />
        )}
      </FloatCard>
    </div>
  );
};

export default ApplyForm;
