import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import theme from '../../Theme';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BACKEND_URL from '../../Config';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SnackBarAlert from "../../components/SnackBarAlert";

const useStyles = makeStyles((theme) => ({
    paperCont: {
        backgroundColor: '#E6E6FA',
        padding: '20px 0px 20px 20px',
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
        padding: '5% 15% 5% 15%'
      },
      field: {
        margin: "20px 0px 20px 0px",
        display: "flex",
        fontSize: "16px",
        "& label": {
          color: "#777",
          fontSize: '16px',
        }
      }
}));

function ProjectItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [styleEdit, setStyleEdit] = useState({display: 'none'});
  const [state, setState] = useState({name: props.name, link: props.link, description: props.description, from: props.from, to: props.to, usedTech: props.usedTech});

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [alertData, setAlertData] = useState({severity: "", msg: ""});
  const [loading, setLoading] = useState(true);
  const [alertShow, setAlertShow] = React.useState(false);
  const index = props.index;
  
  useEffect(() => {
    if (deleteSuccess == true) {
        setAlertData({severity: "success", msg: "Item deleted successfully!"});
        handleAlert();
    }
    setLoading(true);
   // retrieveCategories();
    setDeleteSuccess(false);
}, [deleteSuccess]);

const handleDelete = () => {
  props.parentFunction(index)
}

  const handleClickOpen = () => {
    setConfirmDelete(true);
  };

  const handleClickClose = () => {
    setConfirmDelete(false);
  };
 
  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }
  
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
   function onChangeName(e){
    setState(prevState => {
      return {...prevState, name: e.target.value}
    })
  }

  function onChangeLink(e){
    setState(prevState => {
      return {...prevState, link: e.target.value}
    })
  }

  function onChangeDescription(e){
    setState(prevState => {
      return {...prevState, description: e.target.value}
    })
  }

  function onChangeFrom(e){
    setState(prevState => {
      return {...prevState, from: e.target.value}
    })
  }

  function onChangeTo(e){
    setState(prevState => {
      return {...prevState, to: e.target.value}
    })
  }

  function onChangeUsedTech(e){
    setState(prevState => {
      return {...prevState, usedTech: e.target.value}
    })
  }

  function onSubmit(e){
    e.preventDefault();
    const project = {
        name: state.name,
        link: state.link,
        description: state.description,
        from: state.from,
        to: state.to,
        usedTech: state.usedTech
  }

    axios.delete(`${BACKEND_URL}/jobseeker/updateProject/60c5f2e555244d11c8012480`,{index:props.index,project:project})
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Project updated successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "Project could not be updated!",
        });
        handleAlert();
      }
    });
    handleClose();
  }

  return (  
    <>
    {displayAlert()} 
    <TimelineItem>
        <TimelineOppositeContent style={{flex:'0.2'}}>
            <Typography variant="body2" color="textSecondary">
                {props.from} - {props.to}
            </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
            <TimelineDot style={{backgroundColor: "Plum"}}>
                <LaptopMacIcon />
            </TimelineDot>
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
        <Paper elevation={0} className={classes.paperCont}
            onMouseEnter={e => {
                setStyleEdit({display: 'block'});
            }}
            onMouseLeave={e => {
                setStyleEdit({display: 'none'});
        }}>
            <Grid container spacing={3}>
              <Grid item xs={10} spacing={2} style={{marginTop:"-5px",padding:"20px 0px 0px 20px"}}>
                <Typography gutterBottom style={{textAlign:'justify',fontSize:'16px',fontWeight:'bold',color:'#666'}}>
                    {state.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{textAlign:'left',marginRight:"-60px"}}>
                    {state.description}
                </Typography>
                <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'justify',fontSize:'14px',fontWeight:'bold',paddingTop:'5px'}}>
                    {state.usedTech}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{textAlign:'left',paddingTop:'10px'}}>
                    {state.link == null ? "" : "Link : "+state.link}
                </Typography>
              </Grid>
              <Grid item xs={2} spacing={2} style={{marginTop:"-5px",padding:"20px 0px 0px 0px"}}>
                    <Button style={{minWidth:'25px',width:'25px',marginRight:"10px"}}>
                        <EditIcon style={styleEdit} className={classes.editIcon} size="small" onClick={handleOpen} />
                    </Button>
                    <Button style={{minWidth:'25px',width:'25px'}}>
                        <DeleteIcon style={styleEdit} className={classes.editIcon} size="small"  onClick={handleClickOpen} />
                    </Button>
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
                    {/*-------------- add new project field popup content ------------------- */}
                    <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    >
                    <Fade in={open}>
                        <div className={classes.paper}>
                        <div style={{paddingTop:'40px'}}>
                            <Grid container xs={12} direction="row">
                            <Grid item xs={10}>
                                <Typography gutterBottom variant="h5" style={{textAlign:'center',paddingLeft:'50px',color:theme.palette.stateBlue}}>
                                Edit Work Experience
                                </Typography>
                                <Divider variant="middle" style={{marginLeft:'100px'}} />
                            </Grid>
                            <Grid item xs={2}>
                                <Button className={classes.defaultButton} style={{ float: 'right',marginRight:'10px',marginTop:'-20px',backgroundColor:'white'}} onClick={handleClose}>
                                <CloseIcon className={classes.closeIcon} style={{color: '#666',}} />
                                </Button>
                            </Grid>
                            </Grid>
                        </div>
                        <form className={classes.form}  onSubmit={onSubmit}>
                            <div>
                            <TextField
                                className={classes.field}
                                id="outlined-basic"
                                label="Name"
                                type="text"
                                variant="outlined"
                                size="small"
                                value={state.name}
                                onChange={onChangeName}
                            />
                            <TextField
                                className={classes.field}
                                id="outlined-basic"
                                label="Link"
                                type="text"
                                variant="outlined"
                                size="small"
                                value={state.link}
                                onChange={onChangeLink}
                            />
                            <TextField
                                className={classes.field}
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={5}
                                variant="outlined"
                                value={state.description}
                                onChange= {onChangeDescription}
                            />
                            <Grid container direction="row" style={{marginTop:'-18px'}}>
                                <TextField
                                className={classes.field}
                                id="outlined-basic"
                                label="From"
                                type="number"
                                variant="outlined"
                                size="small"
                                value={state.from}
                                onChange={onChangeFrom}
                                style={{width:'30%',marginRight:'10%'}}
                                />
                                <TextField
                                className={classes.field}
                                id="outlined-basic"
                                label="To"
                                type="number"
                                variant="outlined"
                                size="small"
                                value={state.to}
                                onChange={onChangeTo}
                                style={{width:'30%'}}
                                />
                                <TextField
                                className={classes.field}
                                id="outlined-basic"
                                label="Tech. Stack"
                                type="text"
                                variant="outlined"
                                size="small"
                                value={state.usedTech}
                                onChange={onChangeUsedTech}
                                />
                              </Grid>
                            </div>
                            <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
                        </form>        
                      </div>
                    </Fade>
                  </Modal>
                </Grid>
            </Grid>
          </Paper>
        </TimelineContent>
    </TimelineItem>
    </>
  );
}

export default ProjectItem
