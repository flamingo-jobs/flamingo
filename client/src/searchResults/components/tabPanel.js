import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Grid, Box } from "@material-ui/core";
import FloatCard from "../../components/FloatCard";
import JobCards from "./jobCards";
import OrganizationCards from "./organizationCards";
import UserCards from "./userCards";
import axios from "axios";
import BACKEND_URL from "../../Config";

const useStyles = makeStyles((theme) => ({}));

const TabPanel = (props) => {
  const classes = useStyles();
  const userId = sessionStorage.getItem("loginId");
  
  const {
    children,
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
      if (props.searchString !== "") {
        const response = await axios.get(
          `${BACKEND_URL}/jobs/search/${props.searchString}`
        );
        if (response.data.success) {
          setJobs(response.data.jobs);
          props.setJobMatches(response.data.jobs.length);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const retrieveOrganizations = async () => {
    try {
      if (props.searchString !== "") {
        const response = await axios.get(
          `${BACKEND_URL}/employers/search/${props.searchString}`
        );
        if (response.data.success) {
          setOrganizations(response.data.employers);
          props.setOrgMatches(response.data.employers.length);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const retrieveUsers = async () => {
    try {
      if (props.searchString !== "") {
        const response = await axios.get(
          `${BACKEND_URL}/jobseekers/search/${props.searchString}`
        );
        if (response.data.success) {
          setUsers(response.data.jobseekers);
          props.setUserMatches(response.data.jobseekers.length);
        }
      }
    } catch (err) {
      console.log(err);
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
            setJobMatches={setJobMatches}
            userId={userId}
            userRole={props.userRole} 
            savedJobIds={props.savedJobIds} 
            setSavedJobIds={props.setSavedJobIds}
          ></JobCards>
        )}
        {value === index && index === 1 && (
          <OrganizationCards
            organizations={organizations}
            searchString={searchString}
            setOrgMatches={setOrgMatches}
          ></OrganizationCards>
        )}
        {value === index && index === 2 && (
          <UserCards
            users={users}
            searchString={searchString}
            setUserMatches={setUserMatches}
          ></UserCards>
        )}
      </Grid>
    </div>
  );
};

export default TabPanel;
