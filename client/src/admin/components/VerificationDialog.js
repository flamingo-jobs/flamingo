import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { StateBlueTextField } from '../../jobs/createJob/components/customTextField';
import axios from 'axios';
import SnackBarAlert from '../../components/SnackBarAlert';
import BACKEND_URL from '../../Config';
import { MenuItem } from '@material-ui/core';

export default function VerificationDialog(props) {
    const [open, setOpen] = React.useState(props.open);
    const [status, setStatus] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
        props.close()
    };

    const [alertShow, setAlertShow] = useState(false);
    const [alertData, setAlertData] = useState({ severity: "", msg: "" });
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


    const updateStatus = async () => {

        if (status) {
            const verificationStatus = {
                verificationStatus: status,
            };

            await axios
                .put(`${BACKEND_URL}/employers/update/${props.verifyId}`, verificationStatus)
                .then((res) => {
                    if (res.data.success) {
                        setAlertData({
                            severity: "success",
                            msg: "You have successfully unsubscribed from this service!",
                        });
                        handleAlert();
                    }
                })
                .catch((err) => {
                    if (err) {
                        setAlertData({
                            severity: "error",
                            msg: "Action Failed!. Please contact our support service",
                        });
                        handleAlert();
                    }
                })
        }
        handleClose();
        props.handleRefresh();
    };

    const handleLocationChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Verification Status</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the verification status of the employer after verifying the document.<br /><br />
                    </DialogContentText>
                    <StateBlueTextField
                        id="status"
                        select
                        label="Verification Status"
                        size="small"
                        defaultValue={props.verifyStatus}
                        onChange={handleLocationChange}
                        variant="outlined"
                        fullWidth
                    >
                        <MenuItem key={0} value={"Pending"}>
                            Pending
                        </MenuItem>
                        <MenuItem key={1} value={"Verified"}>
                            Verified
                        </MenuItem>
                        <MenuItem key={2} value={"Rejected"}>
                            Rejected
                        </MenuItem>
                    </StateBlueTextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    {status ? <Button onClick={updateStatus} color="primary">
                        Update
                    </Button> : null}
                </DialogActions>
            </Dialog>
            {displayAlert()}
        </div>
    );
}
