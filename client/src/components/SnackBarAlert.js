import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackBarAlert(props) {
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}>
            <Alert onClose={props.onClose} severity={props.severity}>
                {props.msg}
            </Alert>
        </Snackbar>
    )
}

export default SnackBarAlert
