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
import { makeStyles } from '@material-ui/core';

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
        "&.Mui-disabled" : {
            backgroundColor: theme.palette.lightSkyBlue
        }
    },
}));

export default function AddNewCatePopup(props) {

    const classes = useStyles();

    const [name, setName] = useState("");

    const onChange = (e) => {
        setName(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const category = {
            name: name
        }

        axios.post(`${BACKEND_URL}/categories/create`, category)
            .then(res => {
                if (res.data.success) {
                    props.onSuccess();
                } else {
                    props.onError();
                }
            })
        props.onClose();
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.root }}>
                <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
                <DialogContent style={{padding: "16px 24px"}}>
                    <DialogContentText>
                        Please enter category name in the given.
                    </DialogContentText>
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        name="name"
                        variant="outlined"
                        size="small"
                        onChange={onChange}
                    />
                </DialogContent>
                <DialogActions style={{marginTop: 16}}>
                    <Button onClick={props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary" className={classes.desiredButton}>
                        Add New Category
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
