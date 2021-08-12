import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BACKEND_URL from '../../Config';
import axios from 'axios';
import { Grid, Button, Typography, Chip, makeStyles, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
        "& fieldset": {
            borderColor: theme.palette.tuftsBlue,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.pinkyRed + " !important",
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
}))
export default function EditCertificationIssuer(props) {

    const classes = useStyles();

    const [name, setName] = useState(props.info.issuer);

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();


        let data = {
            issuer: name
        }

        axios.put(`${BACKEND_URL}/certifications/update/${props.info._id}`, data).then(res => {
                if (res.data.success) {
                     props.onSuccess();
                } else {
                    // props.onError();
                }
            })
        props.handleDone();
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose} fullWidth={true}
                maxWidth="sm" aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Certification Issuer</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                name="name"
                                fullWidth
                                value={name}
                                variant="outlined"
                                size="small"
                                onChange={onNameChange}
                                classes={classes.textField}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
