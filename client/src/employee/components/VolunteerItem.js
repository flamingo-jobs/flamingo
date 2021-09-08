import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from '../../Config';
import theme from '../../Theme';


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
          backgroundColor:  theme.palette.stateBlueHover,
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
        margin: "20px 0px 20px 0px",
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

function VolunteerItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [styleEdit, setStyleEdit] = useState({display: 'none'});
  let volunteerStartDate=[0,0];
  let volunteerEndDate=[0,0];
  if(props.from !== 'null/null' && props.from !== '0/0'){
    volunteerStartDate = props.from.split("/");
  }
  if(props.to !== 'null/null' && props.to !== '0/0'){
    volunteerEndDate = props.to.split("/");
  }
  const [state, setState] = useState({title: props.title, organization: props.organization, startYear: volunteerStartDate[1], startMonth: volunteerStartDate[0], endYear: volunteerEndDate[1], endMonth: volunteerEndDate[0], description: props.description});

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
   function onChangeTitle(e){
    setState(prevState => {
      return {...prevState, title: e.target.value}
    })
  }

  function onChangeOrganization(e){
    setState(prevState => {
      return {...prevState, organization: e.target.value}
    })
  }

  function onChangestartYear(e){
    setState(prevState => {
      return {...prevState, startYear: e.target.value}
    })
  }

  function onChangestartMonth(e){
    setState(prevState => {
      return {...prevState, startMonth: e.target.value}
    })
  }

  function onChangeEndYear(e){
    setState(prevState => {
      return {...prevState, endYear: e.target.value}
    })
  }

  function onChangeEndMonth(e){
    setState(prevState => {
      return {...prevState, endMonth: e.target.value}
    })
  }

  function onChangeDescription(e){
    setState(prevState => {
      return {...prevState, description: e.target.value}
    })
  }

  function onSubmit(e){
    e.preventDefault();
    const volunteer = {
      title: state.title,
      organization: state.organization,
      from: state.startMonth+"/"+state.startYear,
      to: state.endMonth+"/"+state.endYear,
      description: state.description,
    }

    axios.put(`${BACKEND_URL}/jobseeker/updateVolunteer/${loginId}`,{index:props.index,volunteer:volunteer})
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Volunteering project updated successfully!",
        });
        handleAlert();
        axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
      } else {
        setAlertData({
          severity: "error",
          msg: "Volunteering project could not be updated!",
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
        <Grid item xs={3}>
          <Typography variant="body2" color="textSecondary" component="p">
              {state.endMonth === 0 ? "" : (state.endMonth+"/"+state.endYear)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {state.endMonth === 0 ? "" : "|" }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {state.startMonth === 0 ? "" : (state.startMonth+"/"+state.startYear)}
          </Typography>
        </Grid>

        <Grid item xs={8} style={{marginTop:"-5px"}}>
            <Typography gutterBottom style={{textAlign:'left',fontSize:'16px',fontWeight:'bold',color:'#666',marginTop:"5px"}}>
                {state.title}
            </Typography>
            <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'14px',fontWeight:'bold',paddingTop:'5px',marginRight:"-50px"}}>
                {state.organization ? state.organization : ""}
            </Typography>
            <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'15px'}}>
                {state.description ? state.description : ""}
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
            {/*-------------- edit volunteer field popup content ------------------- */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" style={{color:theme.palette.stateBlue}}>
              Edit Volunteer Project
              </DialogTitle>
              <Divider variant="middle" />
              <DialogContent>
                <form className={classes.form}>
                <div>
                <TextField
                  className={classes.field}
                    id="outlined-basic"
                    label="Title"
                    type="text"
                    variant="outlined"
                    size="small"
                    value={state.title}
                    onChange={onChangeTitle}
                    required
                  />
                  <TextField
                  className={classes.field}
                    id="outlined-basic"
                    label="Organization"
                    type="text"
                    variant="outlined"
                    size="small"
                    value={state.organization}
                    onChange={onChangeOrganization}
                  />
                  <Grid container direction="row">
                    <Grid item container sm={12} md={6} style={{paddingRight: "15px"}}>
                      <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{color: "#777",fontSize: '16px',marginBottom:"-10px"}}>Start Date</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                          <Select
                            native
                            onChange={onChangestartYear}
                            label="Start Date"
                            value={state.startYear}
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
                            onChange={onChangestartMonth}
                            label="Start Date"
                            value={state.startMonth}
                            className={classes.selectMonth}
                          >
                            <option aria-label="None" value="" />
                            {getMonthsFrom()}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item container sm={12} md={6} style={{paddingRight: "15px"}}>
                      <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{color: "#777",fontSize: '16px',marginBottom:"-10px"}}>End Date</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                          <Select
                            native
                            onChange={onChangeEndYear}
                            label="End Date"
                            value={state.endYear}
                            className={classes.selectYear}
                          >
                            <option aria-label="None" value="" />
                            {getYearsTo()}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">MM</InputLabel>
                          <Select
                            native
                            onChange={onChangeEndMonth}
                            label="Start Date"
                            value={state.endMonth}
                            className={classes.selectMonth}
                          >
                            <option aria-label="None" value="" />
                            {getMonthsFrom()}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <TextField
                    className={classes.field}
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={5}
                    variant="outlined"
                    onChange= {onChangeDescription}
                    value={state.description}
                  />
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

export default VolunteerItem
