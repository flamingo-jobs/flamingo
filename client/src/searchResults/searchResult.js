import { Grid, makeStyles, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import BusinessIcon from "@material-ui/icons/Business";
import PeopleIcon from "@material-ui/icons/People";
import WorkIcon from "@material-ui/icons/Work";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BACKEND_URL from "../Config";
import TabPanel from "./components/tabPanel";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  appBar: {
    borderRadius: 12,
    marginBottom: theme.spacing(2),
  },
  cardWrapper: {
    marginBottom: theme.spacing(2),
  },
  tabIcon:{
    color: theme.palette.stateBlue,
  },
}));

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '90%',
      backgroundColor: theme.palette.stateBlue,
    },
   
  },
}))((props) => <Tabs {...props} textColor="primary" TabIndicatorProps={{ children: <span /> }} />);

// style={{border: "1px solid red"}}
const SearchResult = (props) => {
  const location = useLocation();
  const classes = useStyles();

  const [searchString, setSearchString] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [savedJobIds, setSavedJobIds] = useState("empty");

  // Search results
  const [jobMatches, setJobMatches] = useState(0);
  const [orgMatches, setOrgMatches] = useState(0);
  const [userMatches, setUserMatches] = useState(0);

  const jwt = require("jsonwebtoken");
  const isSignedIn = sessionStorage.getItem("userToken") ? true : false;
  const userId = sessionStorage.getItem("loginId");
  const token = sessionStorage.getItem("userToken");
  const [role, setRole] = useState(
    jwt.decode(token, { complete: true })
    ? jwt.decode(token, { complete: true }).payload.userRole
    : null
  );

  useEffect(() => {
    setSearchString(location.searchString);
  }, [location.searchString]);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  useEffect(() => {
    retrieveJobseeker();
  }, []);
  
  const retrieveJobseeker = async () => {
    if(isSignedIn && role === "jobseeker" && userId){
      try {
        const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
        if (response.data.success) {
          setSavedJobIds(response.data.jobseeker.savedJobs);
        }
      } catch (err) {
        // console.log(err);
      }
    }
  };

  const SearchResultBadge = (tab) => {
    if (tab === "jobs") {
      return (
        <Badge badgeContent={jobMatches} color="primary">
          <WorkIcon className={classes.tabIcon}/>
        </Badge>
      );
    }
    else if (tab === "orgs") {
      return (
        <Badge badgeContent={orgMatches} color="primary">
          <BusinessIcon className={classes.tabIcon}/>
        </Badge>
      );
    }
    else if (tab === "users") {
      return (
        <Badge badgeContent={userMatches} color="primary">
          <PeopleIcon className={classes.tabIcon}/>
        </Badge>
      );
    }
  };

  // style={{border: "1px solid red"}}
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <AppBar position="static" className={classes.appBar}>
            <StyledTabs
              value={tabIndex}
              onChange={handleTabChange}
              variant="fullWidth"
              scrollButtons="off"
              aria-label="search result"
            >
              <Tab icon={SearchResultBadge("jobs")} aria-label="jobs" />
              <Tab
                icon={SearchResultBadge("orgs")}
                aria-label="organizations"
              />
              {/* <Tab icon={SearchResultBadge("users")} aria-label="users" /> */}
            </StyledTabs>
          </AppBar>
        </Grid>

        <Grid item xs={12}>
          <TabPanel
            value={tabIndex}
            index={0}
            searchString={searchString}
            setJobMatches={setJobMatches}
            setOrgMatches={setOrgMatches}
            setuserMatches={setUserMatches}
            savedJobIds={savedJobIds} 
            setSavedJobIds={setSavedJobIds}
          ></TabPanel>

          <TabPanel
            value={tabIndex}
            index={1}
            searchString={searchString}
            setJobMatches={setJobMatches}
            setOrgMatches={setOrgMatches}
            setuserMatches={setUserMatches}
          ></TabPanel>
          {/* <TabPanel
            value={tabIndex}
            index={2}
            searchString={searchString}
            setJobMatches={setJobMatches}
            setOrgMatches={setOrgMatches}
            setUserMatches={setUserMatches}
          ></TabPanel> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchResult;
