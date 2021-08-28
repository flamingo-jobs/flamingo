import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from '../../Theme';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BACKEND_URL from '../../Config';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SnackBarAlert from "../../components/SnackBarAlert";

const useStyles = makeStyles((theme) => ({
  paperCont: {
    backgroundColor: 'MintCream',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
    borderRadius: 10,
    "&:hover": {
        defaultButton: {
            display: 'block'
        }
      }
  },
  defaultButton: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: '#0088cc',
      color: 'white',
    }
  },
  editIcon: {
    padding:'0px',
    margin:'-15px',
    color: theme.palette.tuftsBlue,
    "&:hover": {
      backgroundColor: theme.palette.lightSkyBlue,
      borderRadius: "100%"
    }
  },
  closeIcon: {
    "&:hover": {
      fontSize: "25px",
      color: "#b30000 !important"
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: '600px',
    borderRadius: 10,
    paddingBottom: "30px"
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  field: {
    margin: "25px 0px 20px 0px",
    display: "flex",
    fontSize: "16px",
    "& label": {
      color: "#777",
      fontSize: '16px',
    }
  },
  select: {
    minWidth: "200px",
    fontSize: "16px",
    display: "flex",
    "& .MuiSelect-outlined": {
      padding: "10px 10px 10px 10px"
    }
  },
  selectYear: {
    margin: "20px 10px 0px 0px",
    minWidth: "90px",
    fontSize: "16px",
    display: "flex",
    "& .MuiSelect-outlined": {
      padding: "10px 10px 10px 10px"
    }
  },
  selectMonth: {
    margin: "20px 10px 0px 0px",
    minWidth: "80px",
    fontSize: "16px",
    display: "flex",
    "& .MuiSelect-outlined": {
      padding: "10px 10px 10px 10px"
    }
  },
  placeholder: {
    color: "#777",
    fontSize: '16px',
    marginTop:"-8px",
  },
  placeholderDate: {
    color: "#777",
    fontSize: '14px',
    marginTop:"12px",
  },
  item: {
    color: "#666",
    padding: "10px 20px"
  }
}));

function CertificateItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [styleEdit, setStyleEdit] = useState({display: 'none'});
  let certificateDate=[0,0];
  if(props.date !== 'null/null' && props.date !== '0/0'){
    certificateDate = props.date.split("/");
  }
  const [state, setState] = useState({issuer: props.issuer, title: props.title, score: props.score, year: certificateDate[1], month: certificateDate[0]});
  const [allCertificates, setAllCertificates] = useState(props.allCertificates);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const index = props.index;
  let loginId;
  let login = false;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if(token === null){
    loginId=props.jobseekerID;
  }else if (header.payload.userRole === "jobseeker") {
    login = true;
    loginId=sessionStorage.getItem("loginId");
  } else {
    loginId=props.jobseekerID;
  }

    //generate year list
    function getYearsFrom(){
      let maxOffset = 25;
      let thisYear = (new Date()).getFullYear();
      let allYears = [];
      for(let x = 0; x <= maxOffset; x++) {
          allYears.push(thisYear - x)
      }
  
      return allYears.map((x) => (<option value={x}>{x}</option>));
    }

    //generate year list
    function getYearsTo(){
      let maxOffset = 30;
      let thisYear = (new Date()).getFullYear();
      let allYears = [];
      for(let x = -7; x <= maxOffset; x++) {
          allYears.push(thisYear - x)
      }

      return allYears.map((x) => (<option value={x}>{x}</option>));
    }
  
    //generate month list
    function getMonthsFrom(){
      let maxOffset = 12;
      let allMonths = [];
      for(let x = 1; x <= maxOffset; x++) {
        if(x<10){
          allMonths.push("0"+x);
        }else{
          allMonths.push(x);
        }        
      }
  
      return allMonths.map((x) => (<option value={x}>{x}</option>));
    }

    //generate issuer list
  function getIssuers(){
    return allCertificates?.map((x) => (<option value={x.issuer}>{x.issuer}</option>));
  }

  //generate title list
  function getTitles(e){
      for (let index = 0; index < allCertificates?.length; index++) {
          if(allCertificates[index].issuer === state.issuer){
             let titles = allCertificates[index].certificates;
            return titles.map((title) => (<option value={JSON.stringify(title)}>{title.name}</option>));
          }        
      }
  }
  
  useEffect(() => {
    if (deleteSuccess === true) {
        setAlertData({severity: "success", msg: "Item deleted successfully!"});
        handleAlert();
    }
    setLoading(true);
    setDeleteSuccess(false);
  }, [deleteSuccess]);

  const handleDelete = () => {
    props.parentFunction(index)
  }

  const handleClickOpen = () => {
    setConfirmDelete(true);
    handleMenuClose();
  };

  const handleClickClose = () => {
    setConfirmDelete(false);
  };

  function handleOpen(){
    setOpen(true);
    handleMenuClose();
  }

  function handleClose(){
    setOpen(false);
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

    // Alert stuff
    const displayAlert = () => {
      return (
        <SnackBarAlert
          open={alertShow}
          onClose={handleAlertClose}
          severity={alertData.severity}
          msg={alertData.msg}
        />
      );
    };
  
    const handleAlert = () => {
      setAlertShow(true);
    };
  
    const handleAlertClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setAlertShow(false);
    };
  

  //---------------------------- text field onChange events
  function onChangeIssuer(e){
    setState(prevState => {
      return {...prevState, issuer: e.target.value}
    })
    getTitles();
  }

  function onChangeTitle(e){
    let obj = JSON.parse(e.target.value);
    setState(prevState => {
      return {...prevState, title: obj.name}
    })
    setState(prevState => {
      return {...prevState, score: obj.score}
    })
  }

  function onChangeMonth(e){
    setState(prevState => {
      return {...prevState, month: e.target.value}
    })
  }

  function onChangeYear(e){
    setState(prevState => {
      return {...prevState, year: e.target.value}
    })
  }


  function onSubmit(e){
    e.preventDefault();
    const certificate = {
        issuer: state.issuer,
        title: state.title,
        score: state.score,
        date: state.month+"/"+state.year,
    }

    axios.put(`${BACKEND_URL}/jobseeker/updateCertificate/${loginId}`,{index:props.index,certificate:certificate})
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Certificate updated successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "Certificate could not be updated!",
        });
        handleAlert();
      }
    });
    handleClose();
  }
  

  return (
    <>
    {displayAlert()}
      <Paper elevation={0} className={classes.paperCont}
      onMouseEnter={e => {
          setStyleEdit({display: 'block'});
      }}
      onMouseLeave={e => {
          setStyleEdit({display: 'none'});
    }}>
       <Grid container spacing={3}>
        <Grid item xs={1}>
        <ImportContactsIcon style={{color: "#cc99ff",}} />
        </Grid>
        <Grid item xs={10}>
            <Typography gutterBottom style={{textAlign:'left',fontSize:'16px',fontWeight:'bold',color:'#666'}}>
                {state.title}
            </Typography>
            <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'14px',fontWeight:'bold',}}>
                {state.issuer}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'left',paddingTop:'5px'}}>
                {state.year === 0 && state.month === 0 ? "" : "Issued date : " + state.month+"/"+state.year}
            </Typography>
        </Grid>
        <Grid item xs={1} style={{padding:"15px 0px 0px 0px"}}>
          { login ? <>
            <Button style={{minWidth:'25px',width:'25px'}}>
              <MoreVertIcon className={classes.editIcon} size="small" style={{color:"#999"}} onClick={handleMenuClick} />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem className={classes.item} onClick={handleOpen}><EditIcon style={{marginRight:"7px"}} />Change</MenuItem>
            <MenuItem className={classes.item} onClick={handleClickOpen}><DeleteIcon style={{marginRight:"7px"}} />Remove</MenuItem>
          </Menu>
          </> : null }
          <Dialog
              open={confirmDelete}
              onClose={handleClickClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      Are you sure that you want to delete the selected item? This cannot be undone.
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClickClose} color="primary">
                      No
                  </Button>
                  <Button onClick={handleDelete}
                    color="primary" autoFocus>
                      Yes
                  </Button>
              </DialogActions>
          </Dialog>
            {/*-------------- update certificate field popup content ------------------- */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" style={{color:theme.palette.stateBlue}}>
              Edit Professional Certificate
              </DialogTitle>
              <Divider variant="middle" />
              <DialogContent>
                <form className={classes.form}>
                <div>
                <FormControl variant="outlined" className={classes.field}>
                    <InputLabel className={classes.placeholder} htmlFor="outlined-age-native-simple">Select Issuer</InputLabel>
                    <Select
                      native
                      value={props.issuer}
                      className={classes.select}
                      required
                      disabled
                    >
                      <option>{props.issuer}</option>
                      {/* {getIssuers()} */}
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" className={classes.field}>
                    <InputLabel className={classes.placeholder} htmlFor="outlined-age-native-simple">Select Certification</InputLabel>
                    <Select
                      native
                      value={props.title}
                      className={classes.select}
                      required
                      disabled
                    >
                      <option>{props.title}</option>
                      {/* {getTitles()} */}
                    </Select>
                  </FormControl>
                  <Grid container direction="row">
                    <Grid item container sm={12} md={6} style={{paddingRight: "15px"}}>
                      <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{color: "#777",fontSize: '16px',marginBottom:"-10px"}}>Issued Date</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                          <Select
                            native
                            value={state.year}
                            onChange={onChangeYear}
                            className={classes.selectYear}
                          >
                            <option aria-label="None" value="" />
                            {getYearsFrom()}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">MM</InputLabel>
                          <Select
                            native
                            value={state.month}
                            onChange={onChangeMonth}
                            className={classes.selectMonth}
                          >
                            <option aria-label="None" value="" />
                            {getMonthsFrom()}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  </div>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} style={{color:"#999"}}>
                  Cancel
                </Button>
                <Button onClick={onSubmit} color="primary" autoFocus>
                  Apply Changes
                </Button>
              </DialogActions>
            </Dialog>
        </Grid>      
       </Grid>
      </Paper>
      </>
  );
}

export default CertificateItem
