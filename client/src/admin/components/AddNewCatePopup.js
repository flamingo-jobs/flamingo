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

export default function AddNewCatePopup(props) {

    const [name, setName] = useState("");

    const onChange = (e) => {
        setName(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(name);
        const category = {
          name: name
        }

        axios.post(`${BACKEND_URL}/categories/create`,category)
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
            <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
                <DialogContent>
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
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary">
                        Add New Category
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
