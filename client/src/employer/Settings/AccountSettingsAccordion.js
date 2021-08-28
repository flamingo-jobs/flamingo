import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import AccountSettings from "./AccountSettings";

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
}));

export default function AccountSettingsAccordion(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Typography className={classes.heading}>Account Settings</Typography>
          <Typography className={classes.secondaryHeading}>
            Control your account settings
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <AccountSettings />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
