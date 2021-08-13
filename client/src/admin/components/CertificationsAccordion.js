import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import BACKEND_URL from '../../Config';
import axios from 'axios';
import CertificationGrid from './CertificationGrid';
import EditCertificationIssuer from './EditCertificationIssuer';
import { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import SnackBarAlert from '../../components/SnackBarAlert';

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
}));

export default function DetailedAccordion(props) {
  const classes = useStyles();
  const [certificates, setCertificates] = React.useState(props.info.certificates);
  const [editing, setEditing] = React.useState(false);

  const certificationColumns = [{ field: 'name', headerName: 'Certificates', flex: 1, editable: true }];

  const handleCertificates = (certificates) => {
    setCertificates(certificates);
  }

  useEffect(() => {
    displayEditPopup();
  }, [editing])

  const handleEdit = () => {
    setEditing(true);
  }

  const doneEdit = () => {
    setEditing(false);
  }


  const displayAccordionDetails = () => {
    return <CertificationGrid certId={props.info._id} columns={certificationColumns} type={`certifications/${props.info._id}`} />
  }

  const displayEditPopup = () => {
    if (editing) {
      return <EditCertificationIssuer onSuccess={props.onRefresh} open={editing} info={props.info} handleDone={doneEdit} />
    }
  }

  const displayDeleteConfirmation = () => {
    return (<Dialog
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

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{props.info.issuer}</Typography>
          </div>
          <div className={classes.column}>

          </div>
        </AccordionSummary>
        {displayAccordionDetails()}
        <Divider />
        <AccordionActions>
          {displayEditPopup()}
          {displayDeleteConfirmation()}
          <Button size="small" color="secondary" onClick={() => { props.handleDelete(props.info._id) }}>Delete</Button>
          <Button size="small" color="primary" onClick={handleEdit}>Edit</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
