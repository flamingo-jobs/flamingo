import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BACKEND_URL from '../../Config';
import axios from 'axios';
import { Grid, makeStyles } from '@material-ui/core';
import { useForm } from "react-hooks-helper";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
    },
    desiredButton: {
        boxShadow: "none",
        color: theme.palette.white,
        backgroundColor: theme.palette.tuftsBlue,
        borderRadius: 12,
        marginLeft: "16px !important",
        padding: "10px",
        "&:hover": {
            backgroundColor: theme.palette.tuftsBlueHover,
            color: "white",
            boxShadow: "none",
        },
        "&.Mui-disabled": {
            backgroundColor: theme.palette.lightSkyBlue
        }
    },
}));

export default function AddNewPackage(props) {

    const classes = useStyles();

    const [name, setName] = useState("");

    const onChange = (e) => {
        setName(e.target.value);
    }

    const [formData, setForm] = useForm({
        type: "",
        maxResumes: 0,
        maxJobs: 0,
        maxUsers: 0,
        shortlisting: false,
        customizedShortlisting: false,
        applicantFiltering: false,
        jobSpecificShortlisting: false,
        price: 0
    });

    const onSubmit = (e) => {
        e.preventDefault();



        axios.post(`${BACKEND_URL}/subscriptions/create`, formData)
            .then(res => {
                if (res.data.success) {
                    props.onSuccess();
                    props.onClose();

                } else {
                    props.onError();
                }
            }).catch(err => {
                props.onError();
            })
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.root }}>
                <DialogTitle id="form-dialog-title">Add New Package</DialogTitle>
                <DialogContent style={{ padding: "16px 24px" }}>
                    <DialogContentText>
                        Please provide the following information.
                    </DialogContentText>
                    <Grid container spacing={3} style={{ marginTop: 16 }}>
                        <Grid item xs={12}>
                            <TextField
                                id="type"
                                label="Name"
                                name="type"
                                variant="outlined"
                                size="small"
                                onChange={setForm}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="maxUsers"
                                label="Maximum no. users"
                                name="maxUsers"
                                variant="outlined"
                                size="small"
                                type="number"
                                onChange={setForm}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="maxJobs"
                                label="Maximum no. jobs per month"
                                name="maxJobs"
                                variant="outlined"
                                size="small"
                                type="number"
                                onChange={setForm}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="maxResumes"
                                label="Maximum no. resumes per month"
                                name="maxResumes"
                                variant="outlined"
                                size="small"
                                type="number"
                                onChange={setForm}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.applicantFiltering}
                                        onChange={setForm}
                                        name="applicantFiltering"
                                        color="primary"
                                    />
                                }
                                label="Applicant Filtering"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.shortlisting}
                                        onChange={setForm}
                                        name="shortlisting"
                                        color="primary"
                                    />
                                }
                                label="Applicant Shortlisting"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.customizedShortlisting}
                                        onChange={setForm}
                                        name="customizedShortlisting"
                                        color="primary"
                                    />
                                }
                                label="Customized Shortlisting"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.jobSpecificShortlisting}
                                        onChange={setForm}
                                        name="jobSpecificShortlisting"
                                        color="primary"
                                    />
                                }
                                label="Job Specific Shortlisting"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="price"
                                label="Price (LKR)"
                                name="price"
                                variant="outlined"
                                size="small"
                                type="number"
                                onChange={setForm}
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ marginTop: 16 }}>
                    <Button onClick={props.onClose} >
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary" className={classes.desiredButton}>
                        Add New Package
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
