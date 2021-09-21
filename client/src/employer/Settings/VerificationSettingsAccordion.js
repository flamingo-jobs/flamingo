import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VerificationSettings from "./VerificationSettings";
import NoAccess from "../../components/NoAccess";
import Verified from "../../components/Verified";
import axios from "axios";
import BACKEND_URL from "../../Config";
const jwt = require("jsonwebtoken");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 10,
    "& .MuiPaper-root": {
      borderRadius: 12,
    },
    "& .MuiChip-root.Mui-disabled": {
      opacity: 0.8,
      "& .MuiChip-deleteIcon": {
        display: "none",
      },
    },
    "& .MuiPaper-elevation1": {
      boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  noAccess: {
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
  },
}));

let haveAccess = false;
if (sessionStorage.getItem("userToken")) {
  var accessTokens = jwt.decode(sessionStorage.getItem("userToken"), {
    complete: true,
  }).payload.accessTokens;
  if (accessTokens.includes("all") || accessTokens.includes("company")) {
    haveAccess = true;
  }
}

export default function VerificationSettingsAccordion(props) {
  const classes = useStyles();

  const loginId = sessionStorage.getItem("loginId");
  const [verificationStatus, setVerificationStatus] = useState();
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/employer/verificationStatus/${loginId}`)
      .then((res) => {
        if (res.data.success) {
          setVerificationStatus(res.data.verificationStatus);
        }
      })
      .catch((err) => {
        if (err) {
          setVerificationStatus("None");
        }
      });
  }, []);

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Typography className={classes.heading}>
            Verification Settings
          </Typography>
          <Typography className={classes.secondaryHeading}>
            Verify your company
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {!haveAccess ? (
            <NoAccess message="for this content" />
          ) : verificationStatus === "None" ||
            verificationStatus === "Rejected" ? (
            <VerificationSettings message={verificationStatus} />
          ) : (
            <Verified message={verificationStatus} />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
