import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import theme from '../../Theme';

const useStyles = makeStyles({
    defaultButton: {
        backgroundColor: theme.palette.tuftsBlue,
        color: theme.palette.white,
        marginLeft: 20,
        borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        "&:hover": {
          backgroundColor: '#0088cc',
          color: 'white',
        }
      },
      editIcon: {
        "&:hover": {
          fontSize: "30px",
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
});

export default function Popup(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }

  return (
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
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '-30px',backgroundColor:'white'}} onClick={handleOpen}>
                <CloseIcon className={classes.closeIcon} style={{color: '#666',}} />
            </Button>
            {props.children}
            </div>
          </Fade>
        </Modal>
  );
}