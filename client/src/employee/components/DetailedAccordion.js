import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import BACKEND_URL from '../../Config';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    '& .MuiChip-root.Mui-disabled': {
      opacity: 0.8,
      '& .MuiChip-deleteIcon': {
        display: 'none'
      }
    },
    '& .MuiPaper-elevation1': {
      boxShadow: 'rgba(83, 144, 230, 0.1) 0px 0px 5px',
    }

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  inputRoot: {
    color: theme.palette.black,
    fontSize: 14,
    backgroundColor: 'transparent',
    border: 'none',
    minWidth: 250,
    transition: 'background-color 200ms cubic-bezier(1, 1, 1, 0.1) 0ms',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:hover:before': {
      border: 'none',
    },
    '&:before': {
      display: 'none'
    },
    '&:after': {
      border: 'none',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    background: 'transparent'
  },
  keywordInput: {
    border: 'none',
    '&hover': {
      border: 'none'
    }
  },
  keywordChip: {
    backgroundColor: theme.palette.lightSkyBlue,
    margin: 3,
    marginRight: 5
  },
}));

export default function DetailedAccordion(props) {
  const classes = useStyles();
  const [technologies, setTechnologies] = useState([]);
  const [technologyStack, setTechnologyStack] = useState([]);
  const [listAll, setListAll] = React.useState(props.info.stack.list);
  const [frontEndAll, setFrontEndAll] = React.useState(props.info.stack.frontEnd);
  const [backEndAll, setBackEndAll] = React.useState(props.info.stack.backEnd);

  const [list, setList] = React.useState([]);
  const [frontEnd, setFrontEnd] = React.useState([]);
  const [backEnd, setBackEnd] = React.useState([]);
  const [editing, setEditing] = React.useState(false);

  let i=0;
  let loginId;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if (header.payload.userRole === "jobseeker") {
      loginId=sessionStorage.getItem("loginId");
  } else {
      loginId=props.jobseekerID;
  }

  useEffect(()=>{
    let technologyStackData;
      axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
      .then(res => {
      if(res.data.success){
          if(res.data.jobseeker.technologyStack.length > 0){
          technologyStackData = res.data.jobseeker.technologyStack;
          if(Object.keys(res.data.jobseeker.technologyStack[0]).length === 0){
              res.data.jobseeker.technologyStack.splice(0,1)
              i++;
          }else if(technologyStackData[0].technologyStack == "" && technologyStackData[0].institute == "" && technologyStackData[0].from == "" && technologyStackData[0].to == ""){
              res.data.jobseeker.technologyStack.splice(0,1)
              i++;
          }
          }
          setTechnologyStack(technologyStackData)
          matchDetails()
      }
    })
  },[])

  const matchDetails = () => {
    technologyStack.forEach(technology => {
      if(props.info.name == technology.type){
        setList(technology.list);
        setFrontEnd(technology.frontEnd);
        setBackEnd(technology.backEnd);
        return;
      }
    });
  }

  const handleList = (list) => {
    setList(list);
  }
  const handleFrontEnd = (list) => {
    setFrontEnd(list);
  }
  const handleBackEnd = (list) => {
    setBackEnd(list);
  }

  const handleEdit = () => {
    setEditing(true);

  }

  const handleSave = () => {
    saveChanges();
    setEditing(false);
  }

  const handleCancel = () => {
    matchDetails();
    setEditing(false);
  }

  const saveChanges = () => {
    // let data = {};
    // if (props.info.list) {
    //   data = {
    //     stack: {
    //       list: list
    //     }
    //   }
    // } else if (props.info.frontEnd) {
    //   data = {
    //     stack: {
    //       frontEnd: frontEnd,
    //       backEnd: backEnd
    //     }
    //   }
    // }
    // axios.put(`${BACKEND_URL}/technologies/update/${props.info._id}`, data).then(res => {
    //   if (res.data.success) {
    //     props.onSuccessUpdate();
    //   } else {
    //     props.onFailedUpdate();
    //   }
    // })

    // setPendingChanges(false);
    // setEditRowsModel({});
    // setUpdatedRows([]);
  }

  const displayAccordionDetails = () => {
    return <AccordionDetails className={classes.details}>
      <Grid container spacing={1}>
        {props.info.stack.frontEnd ?
          <>
            <Grid item xs={12} lg={6}>
              <Typography className={classes.secondaryHeading}>Front-end</Typography>
              <Autocomplete
                multiple
                // id={`tags-filled-1-${props.info._id}`}
                options={frontEndAll}
                value={frontEnd}
                freeSolo
                disabled={!editing}
                disableClearable
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip key={index} label={option} {...getTagProps({ index })} className={classes.keywordChip} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} id={`text-field-1-${props.info._id}`} variant="standard" placeholder={editing ? "+ Add more" : null} classes={{ root: classes.keywordInput }} />
                )}
                onChange={(event, value) => handleFrontEnd(value)}
                classes={{
                  inputRoot: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography className={classes.secondaryHeading}>Back-end</Typography>
              <Autocomplete
                multiple
                // id={`tags-filled-2-${props.info._id}`}
                options={backEndAll}
                value={backEnd}
                freeSolo
                disabled={!editing}
                disableClearable
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} {...getTagProps({ index })} className={classes.keywordChip} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} id={`text-field-2-${props.info._id}`} variant="standard" placeholder={editing ? "+ Add more" : null} classes={{ root: classes.keywordInput }} />
                )}
                onChange={(event, value) => handleBackEnd(value)}
                classes={{
                  inputRoot: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </Grid> </> : <Grid item xs={12}>
            <Typography className={classes.secondaryHeading}>Technologies</Typography>
            <Autocomplete
              multiple
              // id={`tags-filled-1-${props.info._id}`}
              options={listAll}
              value={list}
              disabled={!editing}
              freeSolo
              disableClearable
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} className={classes.keywordChip} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} id={`text-field-1-${props.info._id}`} variant="standard" placeholder={editing ? "+ Add more" : null} classes={{ root: classes.keywordInput }} />
              )}
              onChange={(event, value) => handleList(value)}
              classes={{
                inputRoot: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </Grid>}


      </Grid>
    </AccordionDetails>
  }

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{props.info.name}</Typography>
          </div>
          <div className={classes.column}>

          </div>
        </AccordionSummary>
        {displayAccordionDetails()}
        <Divider />
        <AccordionActions>

          {editing ? <><Button size="small" onClick={handleCancel}>Cancel</Button> <Button size="small" color="primary" onClick={handleSave}>Save</Button> </> : <Button size="small" color="primary" onClick={handleEdit}>Edit</Button>}
        </AccordionActions>
      </Accordion>
    </div>
  );
}
