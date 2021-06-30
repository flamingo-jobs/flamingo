import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from '../../Theme';
import EditIcon from '@material-ui/icons/Edit';
import BACKEND_URL from '../../Config';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';

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

function WorkExpItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [styleEdit, setStyleEdit] = useState({display: 'none'});
  const [state, setState] = useState({place: props.place, description: props.description, position: props.position, from: props.from, to: props.to, taskAndResponsibility: props.task});

  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }

   //---------------------------- text field onChange events

   function onChangePlace(e){
    setState(prevState => {
      return {...prevState, place: e.target.value}
    })
  }

  function onChangeDescription(e){
    setState(prevState => {
      return {...prevState, description: e.target.value}
    })
  }

  function onChangePosition(e){
    setState(prevState => {
      return {...prevState, position: e.target.value}
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

  function onChangeTask(e){
    setState(prevState => {
      return {...prevState, taskAndResponsibility: e.target.value}
    })
  }

  function onSubmit(e){
    e.preventDefault();
    const work = {
      place: state.place,
      description: state.description,
      position: state.position,
      from: state.from,
      to: state.to,
      taskAndResponsibility: state.taskAndResponsibility,
  }

    axios.put(`${BACKEND_URL}/jobseeker/updateWork/60c5f2e555244d11c8012480`,{index:props.index,work:work})
    .then(res => console.log(work));
    handleClose();
  }

  return (
      <Paper elevation={0} className={classes.paperCont}
      onMouseEnter={e => {
          setStyleEdit({display: 'block'});
      }}
      onMouseLeave={e => {
          setStyleEdit({display: 'none'});
    }}>
        <Grid container spacing={3}>
          <Grid item xs={11} spacing={2} style={{marginTop:"-5px"}}>
            <Typography gutterBottom style={{textAlign:'justify',fontSize:'16px',fontWeight:'bold',color:'#666'}}>
                {state.position}
            </Typography>
            <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'justify',fontSize:'14px',fontWeight:'bold',}}>
                {state.place}
            </Typography>
            <Typography variant="body2" component="p" style={{textAlign:'justify',color:theme.palette.stateBlue}}>
                {state.from} - {state.to}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'justify',paddingTop:'10px'}}>
                {state.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'justify',paddingTop:'10px'}}>
              <b> Tasks & Responsibilities : </b>{state.taskAndResponsibility}
            </Typography>
          </Grid>
          <Grid item xs={1} spacing={2} style={{marginTop:"-5px"}}>
            <Button style={{minWidth:'25px',width:'25px'}}>
                <EditIcon style={styleEdit} className={classes.editIcon} size="small" onClick={handleOpen} />
            </Button>
            {/*-------------- add new volunteer field popup content ------------------- */}
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
                        label="Position"
                        type="text"
                        variant="outlined"
                        size="small"
                        value={state.position}
                        onChange={onChangePosition}
                      />
                      <TextField
                        className={classes.field}
                        id="outlined-basic"
                        label="Place"
                        type="text"
                        variant="outlined"
                        size="small"
                        value={state.place}
                        onChange={onChangePlace}
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
                      </Grid>
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
                      <TextField
                        className={classes.field}
                        id="outlined-multiline-static"
                        label="Tasks & Responsibilities"
                        multiline
                        rows={5}
                        variant="outlined"
                        value={state.taskAndResponsibility}
                        onChange= {onChangeTask}
                      />
                    </div>
                    <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
                  </form>
                  
                </div>
              </Fade>
            </Modal>
          </Grid>
        </Grid>
      </Paper>
  );
}

export default WorkExpItem
