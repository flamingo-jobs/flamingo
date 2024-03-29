import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import FloatCard from "../components/FloatCard";
import Loading from "../components/Loading";
import BACKEND_URL from "../Config";
import AdditionalSkills from "./components/additionalSkills";
import ApplyForm from "./components/applyForm";
import CompanySummary from "./components/companySummary";
// Custom components
import JobSummary from "./components/jobSummary";
import MoreFromJobs from "./components/MoreFromJobs";
import RelatedJobs from "./components/RelatedJobs";
import Requirements from "./components/requirements";
import Responsibilities from "./components/responsibilities";
import TechStack from "./components/techStack";

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  root: {
    // marginLeft: "12px",
  },
  title: {
    fontWeight: 600,
    color: theme.palette.black,
  },
  emptyContentText: {
    color: theme.palette.black,
  },
  outterWrapper: {
    // paddingLeft: theme.spacing(1.5),
    // paddingRight: theme.spacing(1.5),
  },
  container: {
    marginBottom: theme.spacing(1),
  },
  loadingContainer: {
    maxWidth: 'unset'
  },
}));

// style={{border: "1px solid red"}}

function JobDescription(props) {
  const classes = useStyles();

  const [job, setJob] = useState("empty");
  const [moreFromJobs, setMoreFromJobs] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [appliedJobCount, setAppliedJobCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  let isSignedIn = false;
  if (sessionStorage.getItem("loginId") !== null) {
    isSignedIn = true;
  }

  const userId = sessionStorage.getItem("loginId");

  let { id } = useParams();
  const [jobId, setJobId] = useState(window.location.pathname.split("/")[2]);

  useEffect(() => {
    setJobId(window.location.pathname.split("/")[2]);
  }, [window.location.pathname]);

  const checkApplied = () => {
    if (job !== "empty" && job.hasOwnProperty("applicationDetails")) {
      job.applicationDetails.forEach(application => {
        if (userId === application.userId) {
          setIsApplied(true);
        }
      });
    }
  }

  const handleApply = () => {
    setIsApplied(true);
  }

  useEffect(() => {
    setJob("empty");
    retrieveJob();
    retrieveJobseeker();
    checkApplied();
    displayMoreFromJobs();
    displayRelatedJobs();
  }, [jobId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsApplied(false);
    setIsSaved(false);
    checkApplied();
  }, [job]);

  const retrieveJob = () => {
    axios.get(`${BACKEND_URL}/jobs/${jobId}`).then((res) => {
      if (res.data.success) {
        setJob(res.data.job);
      } else {
        setJob(null);
      }
    });
  };

  const retrieveJobseeker = async () => {
    try {
      if (userId) {
        const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
        if (response.data.success) {
          setSavedJobIds(response.data.jobseeker.savedJobs);
          setAppliedJobCount(response.data.jobseeker.applicationDetails.length);

          if (response.data.jobseeker.savedJobs.includes(jobId)) {
            setIsSaved(true);
          }
        }
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const displaySummary = () => {
    if (job === "empty") {
      return (
        <Grid item xs={12}>
          <Loading />
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12} className={classes.container}>
          <JobSummary
            userId={userId}
            job={job}
            isSignedIn={isSignedIn}
            userRole={props.userRole}
            isSaved={isSaved}
            setIsSaved={setIsSaved}
            savedJobIds={savedJobIds}
            setSavedJobIds={setSavedJobIds}
            isApplied={isApplied}
          ></JobSummary>
        </Grid>
      );
    }
  };

  const displayResponsibilities = () => {
    if (job !== "empty") {

      return (
        <Grid item xs={12} lg={12} className={classes.container}>
          <Responsibilities
            responsibilities={job.tasksAndResponsibilities}
          ></Responsibilities>
        </Grid>
      );
    }
  };

  // **** add margin bottom to the last component when signed in ***
  const displayRequirements = () => {
    if (job !== "empty") {

      return (
        <Grid
          item
          xs={12}
          lg={12}
          className={isSignedIn === false ? "" : classes.container}
        >
          <Requirements requirements={job.qualifications}></Requirements>
        </Grid>
      );
    }
  };

  const displayTechStack = () => {
    if (job !== "empty") {

      return (
        <Grid
          item
          xs={12}
          lg={12}
          className={isSignedIn === false ? "" : classes.container}
        >
          <TechStack techStack={job.technologyStack}></TechStack>
        </Grid>
      );
    }
  };

  const displayAdditionalSkills = () => {
    if (job !== "empty" && job.additionalSkills.length > 0) {
      return (
        <Grid
          item
          xs={12}
          lg={12}
          className={isSignedIn === false ? "" : classes.container}
        >
          <AdditionalSkills skills={job.additionalSkills}></AdditionalSkills>
        </Grid>
      );
    }
  };

  const displayApplyForm = () => {
    if (props.userRole !== "employer" && props.userRole !== "admin") {
      if (isSignedIn === true && userId !== "empty" && !isApplied) {
        if (job === "empty") {
          return (
            <Grid item xs={12} className={classes.container} style={{ marginTop: 16 }}>
              <FloatCard >
                <Loading />
              </FloatCard>
            </Grid>
          );
        } else {
          const today = new Date();
          const dueDate = new Date(job.dueDate);
          if(today < dueDate){
            return (
              <Grid item xs={12}>
                <ApplyForm
                  userId={userId}
                  name={job.title}
                  org={job.organization.name}
                  orgId={job.organization.id}
                  jobId={jobId}
                  handleApply={handleApply}
                  appliedJobCount={appliedJobCount}
                ></ApplyForm>
              </Grid>
            );
          }
        }
      }
    }

  };

  const displayCompanySummary = () => {
    if (job === "empty") {
      return (
        <Grid item container spacing={3} xs={12} className={classes.loadingContainer}>
          <Grid item xs={12}>
            <FloatCard>
              <Loading />
            </FloatCard>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <CompanySummary 
          job={job}
          userId={userId}
        />
      );
    }
  };

  const displayMoreFromJobs = () => {
    if (job === "empty") {
      return (
        <Grid item container spacing={3} xs={12} className={classes.loadingContainer}>
          <Grid item xs={12}>
            <FloatCard>
              <Loading />
            </FloatCard>
          </Grid>
        </Grid>
      );
    } else {
      return <MoreFromJobs job={job} />;
    }
  };

  const displayRelatedJobs = () => {
    if (job === "empty") {
      return (
        <Grid item container spacing={3} xs={12} className={classes.loadingContainer}>
          <Grid item xs={12}>
            <FloatCard>
              <Loading />
            </FloatCard>
          </Grid>
        </Grid>
      );
    } else {
      return <RelatedJobs job={job} />;
    }
  };

  return (
    <>
      <Grid
        item
        container
        className={classes.outterWrapper}
        xs={12}
        spacing={3}
      >
        <Grid item xs={12} lg={7}>
          <Grid item container xs={12}>
            <FloatCard>
              <Grid item xs={12}>
                {displaySummary()}
              </Grid>
              <Grid item xs={12}>
                {displayResponsibilities()}
              </Grid>
              <Grid item xs={12}>
                {displayRequirements()}
              </Grid>
              <Grid item xs={12}>
                {displayTechStack()}
              </Grid>
              <Grid item xs={12}>
                {displayAdditionalSkills()}
              </Grid>
            </FloatCard>
            <Grid item xs={12}>
              {displayApplyForm()}
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={12} lg={5}>
          {displayCompanySummary()}
          {displayMoreFromJobs()}
          {displayRelatedJobs()}
        </Grid>
      </Grid>
    </>
  );
}

export default JobDescription;
