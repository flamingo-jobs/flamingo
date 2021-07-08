import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    "& .MuiChip-root.Mui-disabled": {
      opacity: 0.8,
      "& .MuiChip-deleteIcon": {
        display: "none",
      },
    },
    "& .MuiPaper-elevation1": {
      boxShadow: "rgba(83, 144, 217, 0.3) 0px 0px 7px",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    marginBottom: 16,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  inputRoot: {
    color: theme.palette.black,
    fontSize: 14,
    backgroundColor: "transparent",
    border: "none",
    minWidth: 250,
    transition: "background-color 200ms cubic-bezier(1, 1, 1, 0.1) 0ms",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:hover:before": {
      border: "none",
    },
    "&:before": {
      display: "none",
    },
    "&:after": {
      border: "none",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    background: "transparent",
  },
  keywordInput: {
    border: "none",
    "&hover": {
      border: "none",
    },
  },
  keywordChip: {
    backgroundColor: theme.palette.lightSkyBlue,
    margin: 3,
    marginRight: 5,
  },
}));

export default function DetailedAccordion(props) {
  const classes = useStyles();
  const [list, setList] = React.useState([]);
  const [frontEnd, setFrontEnd] = React.useState([]);
  const [backEnd, setBackEnd] = React.useState([]);

  const handleList = (list) => {
    setList(list);
    handleSave();
  };
  const handleFrontEnd = (list) => {
    setFrontEnd(list);
    handleSave();
  };
  const handleBackEnd = (list) => {
    setBackEnd(list);
    handleSave();
  };

  const handleSave = () => {
    saveChanges();
  };

  const saveChanges = () => {
    let data = {};
    if (props.info.stack.list) {
      data = {
        name: props.info.name,
        stack: {
          list: list,
        },
      };
    } else if (props.info.stack.frontEnd) {
      data = {
        name: props.info.name,
        stack: {
          frontEnd: frontEnd,
          backEnd: backEnd,
        },
      };
    }

    props.onChange(data);
  };

  const displayAccordionDetails = () => {
    return (
      <AccordionDetails className={classes.details}>
        <Grid container spacing={1}>
          {props.info.stack.frontEnd ? (
            <>
              <Grid item xs={12} lg={6}>
                <Typography className={classes.secondaryHeading}>
                  Front-end
                </Typography>
                <Autocomplete
                  multiple
                  id={`tags-filled-1-${props.info._id}`}
                  options={props.info.stack.frontEnd}
                  value={frontEnd}
                  freeSolo
                  disableClearable
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        label={option}
                        {...getTagProps({ index })}
                        className={classes.keywordChip}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id={`text-field-1-${props.info._id}`}
                      variant="standard"
                      placeholder="+ Add"
                      classes={{ root: classes.keywordInput }}
                    />
                  )}
                  onChange={(event, value) => handleFrontEnd(value)}
                  classes={{
                    inputRoot: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography className={classes.secondaryHeading}>
                  Back-end
                </Typography>
                <Autocomplete
                  multiple
                  id={`tags-filled-2-${props.info._id}`}
                  options={props.info.stack.backEnd}
                  value={backEnd}
                  freeSolo
                  disableClearable
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        className={classes.keywordChip}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id={`text-field-2-${props.info._id}`}
                      variant="standard"
                      placeholder="+ Add more"
                      classes={{ root: classes.keywordInput }}
                    />
                  )}
                  onChange={(event, value) => handleBackEnd(value)}
                  classes={{
                    inputRoot: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </Grid>{" "}
            </>
          ) : (
            <Grid item xs={12}>
              <Typography className={classes.secondaryHeading}>
                Technologies
              </Typography>
              <Autocomplete
                multiple
                id={`tags-filled-1-${props.info._id}`}
                options={props.info.stack.list}
                value={list}
                freeSolo
                disableClearable
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      className={classes.keywordChip}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id={`text-field-1-${props.info._id}`}
                    variant="standard"
                    placeholder="+ Add more"
                    classes={{ root: classes.keywordInput }}
                  />
                )}
                onChange={(event, value) => handleList(value)}
                classes={{
                  inputRoot: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    );
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {props.info.name}
            </Typography>
          </div>
          <div className={classes.column}></div>
        </AccordionSummary>
        {displayAccordionDetails()}
        <Divider />
      </Accordion>
    </div>
  );
}
