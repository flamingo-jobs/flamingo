import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  Modal,
  Button,
} from "@material-ui/core";
import ItPerson from "../lotties/itPerson.json";
import Lottie from "react-lottie";
import PublishIcon from "@material-ui/icons/Publish";
import CloseIcon from "@material-ui/icons/Close";
import DescriptionIcon from "@material-ui/icons/Description";
import BACKEND_URL, {FILE_URL} from "../../../Config";
import axios from "axios";
import uploadFileToBlob, { isStorageConfigured } from '../../../utils/azureFileUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "600px",
    padding: `0px 30px`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    paddingBottom: "30px",
    maxHeight: "98vh",
    overflowY: "auto",
    [theme.breakpoints.down("md")]: {
      width: "500px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "450px",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
  animation: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formInfo: {
    marginBottom: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.black,
    fontWeight: 500,
  },
  input: {
    display: "none",
  },
  uploadBtnWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    width: "250px",
    color: theme.palette.tuftsBlue,
    borderColor: theme.palette.tuftsBlue,
    "&:hover": {
      borderColor: theme.palette.tuftsBlueHover,
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
  submitBtnWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(1),
    postion: "relative",
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
}));

const personOptions = {
  loop: true,
  autoplay: true,
  // animationData: Person,
  animationData: ItPerson,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const UploadModal = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const userId = sessionStorage.getItem("loginId");

  const handleFileChange = (e) => {
    props.setFileData("empty");

    if (e.target.files[0]) {
      let nameSplit = e.target.files[0].name.split(".");
      // console.log("file extention", nameSplit[nameSplit.length - 1]);
      if (nameSplit[nameSplit.length - 1] !== "pdf") {
        props.setAlertData({
          severity: "error",
          msg: "Invalid file type, only PDF file type is allowed",
        });
        props.handleAlert();
      } else {
        props.setFileData(e.target.files[0]);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (props.fileData === "empty") {
      props.setAlertData({
        severity: "error",
        msg: "You should upload your resume first",
      });
      props.handleAlert();
      return;
    }

    if (!loading && props.fileData !== "empty") {
      setLoading(true);
    }

    // Data to rename the pdf
    const data = new FormData();
    data.append("userId", userId);
    data.append("jobId", props.jobId);
    data.append("resume", props.fileData);

    // DB resume details
    const resumeExt =
      "." +
      props.fileData.name.split(".")[props.fileData.name.split(".").length - 1];

    const resumeDetailsJobSeeker = {
      status: "pending",
      appliedDate: new Date(),
      jobId: props.jobId,
      resumeName: props.jobId + "--" + userId + resumeExt,
    };

    const resumeDetailsJob = {
      status: "pending",
      appliedDate: new Date(),
      userId: userId,
      resumeName: props.jobId + "--" + userId + resumeExt,
    };

    try {
      if (props.jobId) {
        // Update resume details in jobseeker collection
        const resumeDetailsResponseJobSeeker = await axios.patch(
          `${BACKEND_URL}/jobseeker/updateResumeDetails/${userId}`,
          resumeDetailsJobSeeker
        );

        if (resumeDetailsResponseJobSeeker.data.success) {
          // Update resume details in jobs collection
          const resumeDetailsResponseJob = await axios.patch(
            `${BACKEND_URL}/jobs/updateResumeDetails/${props.jobId}`,
            resumeDetailsJob
          );

          if (resumeDetailsResponseJob.data.success) {
            var file = props.fileData;
            var blob = file.slice(0, file.size);
            var newFile = new File([blob], `${props.jobId}--${userId}.pdf`);

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
            await axios.get(`${FILE_URL}/resumes/${newFile.name}`).then(res => {
              props.setAlertData({
                severity: "success",
                msg: "Resume updated!",
              });
              props.handleAlert();
            }).catch(error => {
              props.setAlertData({
                severity: "error",
                msg: "Resume could not be updateds!",
              });
              props.handleAlert();
            })
          } else {
            props.setAlertData({
              severity: "error",
              msg: "Something's not quite right! Please try again later",
            });
            props.handleAlert();
          }
        } else {
          // Error occured in job seeker update
          if (resumeDetailsResponseJobSeeker.data.error) {
            props.setAlertData({
              severity: "error",
              msg: "Something's not quite right! Please try again later",
            });
            props.handleAlert();
          }
        }
      }
    } catch (error) {
      props.setAlertData({
        severity: "error",
        msg: "Something went wrong! Please try again later",
      });
      props.handleAlert();
    }
    setLoading(false);
    props.setFileData("empty");
    props.handleClose();
  };

  const displayFileName = () => {
    if (props.fileData === "empty") {
      return null;
    }
    return (
      <div className={classes.fileNameContainer}>
        <DescriptionIcon className={classes.fileIcon}></DescriptionIcon>
        <div className={classes.fileName}>{props.fileData.name}</div>
      </div>
    );
  };

  // style={{border: "1px solid red"}}
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          {/* <div className={classes.closeBtnContainer}>
            <IconButton
              onClick={props.handleClose}
              className={classes.closeButton}
            >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </div> */}

          <div className={classes.animation}>
            <Lottie
              className={classes.lottie}
              options={personOptions}
              height="60%"
              width="60%"
            />
          </div>
          <Typography className={classes.formInfo}>
            Upload your resume using the link given below.
            <br />
            Your previous resume will be removed.
          </Typography>

          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className={classes.uploadBtnWrapper} style={{ color: "#fff" }}>
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
            </div>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default UploadModal;
