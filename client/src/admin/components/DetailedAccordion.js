import React from 'react';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
      boxShadow: 'rgba(83, 144, 217, 0.3) 0px 0px 7px',
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
  paperRoot: {
    padding: 20,
  },
  confrimDelete: {
    boxShadow: "none",
    color: theme.palette.red,
    backgroundColor: theme.palette.lightyPink,
    borderRadius: 12,
    marginLeft: "16px !important",
    padding: "10px",
    "&:hover": {
      backgroundColor: theme.palette.lightyPinkHover,
      boxShadow: "none",
    },
  },
}));

export default function DetailedAccordion(props) {
  const classes = useStyles();
  const [list, setList] = React.useState(props.info.stack.list);
  const [frontEnd, setFrontEnd] = React.useState(props.info.stack.frontEnd);
  const [backEnd, setBackEnd] = React.useState(props.info.stack.backEnd);
  const [inputList, setInputList] = React.useState(props.info.stack.list);
  const [inputFrontEnd, setInputFrontEnd] = React.useState(props.info.stack.frontEnd);
  const [inputBackEnd, setInputBackEnd] = React.useState(props.info.stack.backEnd);
  const [editing, setEditing] = React.useState(false);

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
    setList(props.info.stack.list);
    setFrontEnd(props.info.stack.frontEnd);
    setBackEnd(props.info.stack.backEnd);
    setEditing(false);
  }

  const saveChanges = () => {
    let data = {};
    if (props.info.stack.list) {
      data = {
        stack: {
          list: list
        }
      }
    } else if (props.info.stack.frontEnd) {
      data = {
        stack: {
          frontEnd: frontEnd,
          backEnd: backEnd
        }
      }
    }
    axios.put(`${BACKEND_URL}/technologies/update/${props.info._id}`, data).then(res => {
      if (res.data.success) {
        props.onSuccessUpdate();
      } else {
        props.onFailedUpdate();
      }
    })

    // setPendingChanges(false);
    // setEditRowsModel({});
    // setUpdatedRows([]);
  }

  const displayDeleteConfirmation = () => {
    return (
      <Dialog
        open={props.confirmDelete}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paperRoot }}
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete the selected item? <b>This cannot be undone.</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            No
          </Button>
          <Button onClick={props.deleteRow} color="primary" className={classes.confrimDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>)
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
                id={`tags-filled-1-${props.info._id}`}
                options={[]}
                value={frontEnd}
                inputValue={inputFrontEnd}
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
                onInputChange={(event, newInputValue) => {
                  const options = newInputValue.split(",");

                  if (options.length > 1) {
                    setFrontEnd(
                      frontEnd
                        .concat(options)
                        .map(x => x.trim())
                        .filter(x => x)
                    );
                  } else {
                    setInputFrontEnd(newInputValue);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography className={classes.secondaryHeading}>Back-end</Typography>
              <Autocomplete
                multiple
                id={`tags-filled-2-${props.info._id}`}
                options={[]}
                value={backEnd}
                inputValue={inputBackEnd}
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
                onInputChange={(event, newInputValue) => {
                  const options = newInputValue.split(",");

                  if (options.length > 1) {
                    setBackEnd(
                      backEnd
                        .concat(options)
                        .map(x => x.trim())
                        .filter(x => x)
                    );
                  } else {
                    setInputBackEnd(newInputValue);
                  }
                }}
              />
            </Grid> </> : <Grid item xs={12}>
            <Typography className={classes.secondaryHeading}>Technologies</Typography>
            <Autocomplete
              multiple
              id={`tags-filled-1-${props.info._id}`}
              options={[]}
              value={list}
              inputValue={inputList}
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
              onInputChange={(event, newInputValue) => {
                const options = newInputValue.split(",");

                if (options.length > 1) {
                  setList(
                    list
                      .concat(options)
                      .map(x => x.trim())
                      .filter(x => x)
                  );
                } else {
                  setInputList(newInputValue);
                }
              }}
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
        {displayDeleteConfirmation()}
        <Divider />
        <AccordionActions>

          {editing ? <><Button size="small" onClick={handleCancel}>Cancel</Button> <Button size="small" color="primary" onClick={handleSave}>Save</Button> </> : <><Button size="small" color="secondary" onClick={() => { props.handleDelete(props.info._id) }}>Delete</Button><Button size="small" color="primary" onClick={handleEdit}>Edit</Button></>}
        </AccordionActions>
      </Accordion>
    </div>
  );
}
