import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BACKEND_URL from "../../Config";
import JobCards from "./jobCards";
import OrganizationCards from "./organizationCards";
import UserCards from './userCards';

const useStyles = makeStyles((theme) => ({}));

const TabPanel = (props) => {
  const classes = useStyles();
  const userId = sessionStorage.getItem("loginId");
  
  const {
    value,
    index,
    searchString,
    setJobMatches,
    setOrgMatches,
    setUserMatches,
  } = props;
  
  const [jobs, setJobs] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveJobs();
    retrieveOrganizations();
    retrieveUsers();
  }, [searchString]);

  const retrieveJobs = async () => {
    try {
      if (searchString !== "") {
        const response = await axios.get(
          `${BACKEND_URL}/jobs/search/${searchString}`
        );
        if (response.data.success) {
          setJobs(response.data.jobs);
          setJobMatches(response.data.jobs.length);
        }
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const retrieveOrganizations = async () => {
    try {
      if (searchString !== "") {
        const response = await axios.get(
          `${BACKEND_URL}/employers/search/${searchString}`
        );
        if (response.data.success) {
          setOrganizations(response.data.employers);
          setOrgMatches(response.data.employers.length);
        }
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const retrieveUsers = async () => {
    try {
      if (searchString !== "") {
        const response = await axios.get(
          `${BACKEND_URL}/jobseekers/search/${searchString}`
        );
        if (response.data.success) {
          setUsers(response.data.jobseekers);
          setUserMatches(response.data.jobseekers.length);
        }
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
    >
      <Grid item container justify="center">
        {value === index && index === 0 && (
          <JobCards
            jobs={jobs}
            searchString={searchString}
            savedJobIds={props.savedJobIds} 
            setSavedJobIds={props.setSavedJobIds}
          ></JobCards>
        )}
        {value === index && index === 1 && (
          <OrganizationCards
            organizations={organizations}
            searchString={searchString}
          ></OrganizationCards>
        )}
        {value === index && index === 2 && (
          <UserCards
            users={users}
            searchString={searchString}
          ></UserCards>
        )}
      </Grid>
    </div>
  );
};

export default TabPanel;
