import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FloatCard from "../../components/FloatCard";
import NoAccess from "../../components/NoAccess";
import NoInfo from "../../components/NoInfo";
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from "../../Config";
import ApplicantCard from "./components/applicantCard";
import ShortlistModal from "./components/shortlistModal";
import PeopleFilters from "../../people/components/PeopleFilters";
import PeopleSearchBar from "../../people/components/PeopleSearchBar";
const jwt = require("jsonwebtoken");

let resumeAccess = false;
let singleResumeAccess = false;

if (sessionStorage.getItem("userToken")) {
  var accessTokens = jwt.decode(sessionStorage.getItem("userToken"), {
    complete: true,
  }).payload.accessTokens;
  if (accessTokens.includes("all") || accessTokens.includes("allresume")) {
    resumeAccess = true;
  } else if (accessTokens.includes("singleresume")) {
    singleResumeAccess = true;
  }
}

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  root: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  shortlistBtnContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  shortlistBtn: {
    padding: 16,
    borderRadius: 12,
    color: theme.palette.white,
    backgroundColor: theme.palette.vividSkyBlue,
    "&:hover": {
      backgroundColor: theme.palette.vividSkyBlueHover,
    },
  },
  applicantTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  applicantTitleText: {
    color: theme.palette.vividSkyBlue,
  },
  shorlistTitle: {
    marginBottom: theme.spacing(2),
  },
  shorlistTitleText: {
    color: theme.palette.stateBlue,
  },
  peopleGrid: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'unset',
      flexDirection: 'column',
      alignItems: "stretch",
      order: 3
    },
  },
  mainGrid: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: "stretch"
    },
  },
  filterGrid: {
    [theme.breakpoints.down('sm')]: {
      order: 2
    },
  },
  searchGrid: {
    [theme.breakpoints.down('sm')]: {
      order: 1
    },
  },
  pagination: {
    justifyContent: 'center',
  },
  gridCard: {
    display: "grid",
    marginBottom: 12
  },
  titleCard: {
    marginTop: 24,
    marginBottom: 16
  }

}));

// style={{border: "1px solid red"}}

const Applications = () => {
  const classes = useStyles();
  const userId = sessionStorage.getItem("loginId");
  const isSignedIn = sessionStorage.getItem("userToken") ? true : false;
  const [jobId, setJobId] = useState(window.location.pathname.split("/")[3]);
  const [job, setJob] = useState("empty");
  const [filters, setFilters] = useState({});

  const [applicantIds, setApplicantIds] = useState([]);
  const [applicants, setApplicants] = useState("empty");
  const [scoredApplicants, setScoredApplicants] = useState("empty");

  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });

  const [shortlistCount, setShortlistCount] = useState(0);
  const [shortlistedIds, setShortlistedIds] = useState("empty");

  const [shortlisted, setShortlisted] = useState(false);

  const [customSettings, setCustomSettings] = useState([]);

  const [search, setSearch] = useState({});
  const [queryParams, setQueryParams] = useState({});

  const [page, setPage] = React.useState(1);

  const changePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // retrievePeople();
  }, [queryParams, page])

  useEffect(() => {
    updateQuery();
  }, [filters, search, applicantIds])


  useEffect(() => {
    if (shortlisted) {
      handleShortlistSubmit();
    }
  }, [applicants])

  const updateSearch = (searchData) => {

    setSearch(searchData);
  }

  const updateQuery = () => {

    if (Object.keys(filters).length !== 0 && Object.keys(search).length !== 0) {
      setQueryParams({ $and: [{ '_id': { $in: applicantIds } }, { $and: [filters, search] }] });
    } else if (Object.keys(filters).length === 0) {
      setQueryParams({ $and: [{ '_id': { $in: applicantIds } }, search] });
    } else if (Object.keys(search).length === 0) {
      setQueryParams({ $and: [{ '_id': { $in: applicantIds } }, filters] });
    } else {
      setQueryParams({ '_id': { $in: applicantIds } });
    }
  }


  const handleSliderChange = (e, newCount) => {
    setShortlistCount(newCount);
  };

  const token = sessionStorage.getItem("userToken");
  const [role, setRole] = useState(
    jwt.decode(token, { complete: true })
      ? jwt.decode(token, { complete: true }).payload.userRole
      : null
  );

  const [openShortlistModal, setOpenShortlistModal] = useState(false);

  const handleOpenShortlistModal = () => {
    setOpenShortlistModal(true);
  };
  const handleCloseShortlistModal = () => {
    setOpenShortlistModal(false);
  };

  const handleAlert = () => {
    setAlertShow(true);
  };

  const updateFilters = (filterData) => {
    setFilters(filterData);
  }

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };
  useEffect(() => {
    retrieveJob();
  }, [jobId]);

  useEffect(() => {
    retrieveJobseekers();
  }, [queryParams]);

  const retrieveJob = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/jobs/${jobId}`);
      if (response.data.success) {
        setJob(response.data.job);
        let userIds = [];
        response.data.job.applicationDetails.map((user) => {
          userIds = [...userIds, user.userId];
        });
        setApplicantIds(userIds);
      } else {
        console.log("404 Job not found");
      }
    } catch (err) {
      console.log("Could not retreive job");
      setAlertData({
        severity: "error",
        msg: "Something Went Wrong, Please Try Again Later.",
      });
      handleAlert();
    }
  };

  const retrieveJobseekers = async () => {
    if (applicantIds.length) {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/jobseeker/applicants`, { queryParams: queryParams, options: {} }
        );
        if (response.data.success) {
          // var jobseekers = response.data.jobseekers;

          // jobseekers.map((user) => {
          //   const score = job.applicationDetails.filter(
          //     (obj) => obj.userId == user._id
          //   )[0].score;
          //   user.score = score;
          // });
          console.log(response.data.existingData)
          setApplicants(response.data.existingData);
        }
      } catch (err) {
        setAlertData({
          severity: "error",
          msg: "Something Went Wrong, Please Try Again Later.",
        });
        handleAlert();
      }
    }
  };

  const displayApplicants = () => {
    if (applicants !== "empty") {
      if (isSignedIn && role === "employer" && userId) {
        return (
          <>
            {!shortlisted &&
              applicants.map((user) => (
                <Grid item key={job._id} xs={12} className={classes.gridCard}>
                  <ApplicantCard
                    key={user._id}
                    jobseeker={user}
                    jobId={jobId}
                    setAlertData={setAlertData}
                    handleAlert={handleAlert}
                  ></ApplicantCard>
                </Grid>
              ))}
          </>
        );
      } else {
        return (
          <Grid item key={job._id} xs={12} className={classes.gridCard}>
            <FloatCard>
              <Typography variant="h6">You must log in first</Typography>
            </FloatCard>
          </Grid>
        );
      }
    } else {
      return (
        <Grid item sm={12} style={{ marginBottom: 16 }}>
          <FloatCard>
            <NoInfo message="Sorry, There are no any applications yet." />
          </FloatCard>
        </Grid>
      );
    }
  };

  // useEffect(() => {
  //   console.log(customSettings);
  // }, [customSettings])

  const updateCustomCriterias = (criterias) => {
    setCustomSettings(criterias);
  }

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

  const displayShortlistedApplicants = () => {
    if (scoredApplicants !== "empty" && shortlisted) {
      const shortlistedJobseekers = scoredApplicants.slice(0, shortlistCount);

      const otherJobseekers = scoredApplicants.slice(shortlistCount);

      if (isSignedIn && role === "employer" && userId) {
        return (
          <>

            <Grid item xs={12} className={classes.titleCard} style={{ marginTop: 0 }}>
              <FloatCard>
                <Typography className={classes.shorlistTitleText} variant="h6">
                  Shortlisted Applicants
                </Typography>
              </FloatCard>
            </Grid>

            {shortlistedJobseekers.map((user) => (
              <Grid item key={user._id} xs={12} className={classes.gridCard}>
                <ApplicantCard
                  key={user._id}
                  jobseeker={user}
                  jobId={jobId}
                  setAlertData={setAlertData}
                  handleAlert={handleAlert}
                ></ApplicantCard>
              </Grid>
            ))}

            {otherJobseekers.length !== 0 && (
              <Grid item xs={12} className={classes.titleCard}>
                <FloatCard>
                  <Typography
                    className={classes.shorlistTitleText}
                    variant="h6"
                  >
                    Other Applicants
                  </Typography>
                </FloatCard>
              </Grid>
            )}

            {otherJobseekers.map((user) => (
              <Grid item key={user._id} xs={12} className={classes.gridCard}>
                <ApplicantCard
                  key={user._id}
                  jobseeker={user}
                  jobId={jobId}
                  setAlertData={setAlertData}
                  handleAlert={handleAlert}
                ></ApplicantCard>
              </Grid>
            ))}
          </>
        );
      } else {
        return (
          <Grid item xs={12} className={classes.gridCard}>
            <FloatCard>
              <Typography variant="h6">No applicants</Typography>
            </FloatCard>
          </Grid>
        );
      }
    }
  };

  const displayShortlistModal = () => {
    if (applicants !== "empty") {
      return (
        <ShortlistModal
          openShortlistModal={openShortlistModal}
          handleCloseShortlistModal={handleCloseShortlistModal}
          shortlistCount={shortlistCount}
          handleSliderChange={handleSliderChange}
          max={applicants.length}
          handleShortlistSubmit={handleShortlistSubmit}
          updateCustomCriterias={updateCustomCriterias}
        ></ShortlistModal>
      );
    }
  };


  const handleShortlistSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (shortlistCount === 0) {
      setAlertData({
        severity: "info",
        msg: "Shortlist count should be greater than 0",
      });
      handleAlert();
      return;
    }

    if (customSettings.length !== 3) {
      if (jobId && userId && applicants !== "empty") {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/jobs/shortlistApplicants/${jobId}/${userId}`
          );
          if (response.data.success) {
            handleCloseShortlistModal();
            setShortlisted(true);
            const newApplicants = [...applicants];

            response.data.exsitingData.map((applicant) => {
              newApplicants.map((jobseeker) => {
                if (jobseeker._id === applicant.userId) {
                  jobseeker.score = applicant.score;
                }
              });
            });

            newApplicants.sort((a, b) => {
              return b.score - a.score;
            });

            setScoredApplicants(newApplicants);
          }
        } catch (err) {
          handleCloseShortlistModal();
          setAlertData({
            severity: "error",
            msg: "Something Went Wrong, Please Try Again Later.",
          });
          handleAlert();
        }
      }
    } else {
      if (jobId && shortlistCount > 0) {
        try {
          const response = await axios.post(
            `${BACKEND_URL}/jobs/customShortlisting`, { jobId: jobId, settings: customSettings }
          );
          if (response.data.success) {
            handleCloseShortlistModal();
            setShortlisted(true);
            const newApplicants = [...applicants];

            response.data.applicantIds.map((applicant) => {
              newApplicants.map((jobseeker) => {
                if (jobseeker._id === applicant.userId) {
                  jobseeker.score = applicant.score;
                }
              });
            });

            newApplicants.sort((a, b) => {
              return b.score - a.score;
            });

            setScoredApplicants(newApplicants);
          }
        } catch (err) {
          handleCloseShortlistModal();
          setAlertData({
            severity: "error",
            msg: "Something Went Wrong, Please Try Again Later.",
          });
          handleAlert();
        }
      }
    }
  };

  return (
    <>
      {displayAlert()}
      {displayShortlistModal()}

      <Grid item container xs={12} spacing={3} direction="row"
        justify="space-between"
        alignItems="flex-start" className={classes.mainGrid}>
        <Grid item sm={12} className={classes.searchGrid}>
          {shortlisted && (
            <div className={classes.shortlistBtnContainer}>
              <Button
                className={classes.shortlistBtn}
                startIcon={<PeopleIcon />}
                onClick={handleOpenShortlistModal}
              >
                Shortlist the Applicants
              </Button>
            </div>
          )}

          {!shortlisted && applicantIds.length !== 0 && (
            <div className={classes.shortlistBtnContainer}>
              <Button
                className={classes.shortlistBtn}
                startIcon={<PeopleIcon />}
                onClick={handleOpenShortlistModal}
              >
                Shortlist the Applicants
              </Button>
            </div>
          )}
        </Grid>
        <Grid item sm={12} className={classes.searchGrid}>
          <PeopleSearchBar onChange={updateSearch} />
        </Grid>
        <Grid item container xs={12} md={8} lg={9} spacing={0} direction="row"
          justify="space-between"
          alignItems="flex-start" className={classes.peopleGrid}>

          {resumeAccess || singleResumeAccess ? (
            displayShortlistedApplicants()
          ) : (
            <Grid item sm={12} style={{ marginBottom: 16 }}>
              <NoAccess />
            </Grid>
          )}
          {resumeAccess || singleResumeAccess ? (
            displayApplicants()
          ) : (
            <Grid item sm={12} style={{ marginBottom: 16 }}>
              <NoAccess />
            </Grid>
          )}
          {/* <Grid item sm={12}>
            {jobs !== "empty" ?
              <Pagination count={Math.ceil(count / 10)} color="primary" page={page} onChange={changePage} classes={{ ul: classes.pagination }} />
              : null
            }
          </Grid> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} className={classes.filterGrid}>
          <PeopleFilters onChange={updateFilters} />
        </Grid>
      </Grid>
      {/* <Grid item container sm={12} spacing={3} direction="row" justify="space-between" className={classes.mainGrid} alignItems="flex-start">
        <Grid item xs={12}>
          {resumeAccess || singleResumeAccess ? (
            displayShortlistedApplicants()
          ) : (
            <NoAccess />
          )}
          {resumeAccess || singleResumeAccess ? (
            displayApplicants()
          ) : (
            <NoAccess />
          )}
        </Grid>
      </Grid> */}
    </>
  );
};
// style={{border: "1px solid red"}}
export default Applications;
