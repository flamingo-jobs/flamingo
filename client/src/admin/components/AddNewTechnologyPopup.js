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
export default function AddNewTechnologyPopup(props) {

    const classes = useStyles();

    const [name, setName] = useState("");
    const [stack, setStack] = useState("");
    const [typeSwitch, setTypeSwitch] = useState(false);

    const [list, setList] = React.useState([]);
    const [frontEnd, setFrontEnd] = React.useState([]);
    const [backEnd, setBackEnd] = React.useState([]);

    const handleList = (list) => {
        setList(list);
    }
    const handleFrontEnd = (list) => {
        setFrontEnd(list);
    }
    const handleBackEnd = (list) => {
        setBackEnd(list);
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let data = {};


        if (!typeSwitch) {
            data = {
                name: name,
                stack: {
                    list: list
                }
            }
        } else {
            data = {
                name: name,
                stack: {
                    frontEnd: frontEnd,
                    backEnd: backEnd
                }
            }
        }

        axios.post(`${BACKEND_URL}/technologies/create`, data)
            .then(res => {
                if (res.data.success) {
                    props.onSuccess();
                } else {
                    props.onError();
                }
            })
        props.onClose();
    }

    const handleSwitchChange = () => {
        setTypeSwitch(!typeSwitch);
    }

    const displayTechnologyDetails = () => {
        return (<>
            {typeSwitch ?
                <>
                    <Grid item xs={12} lg={6}>
                        <Typography className={classes.secondaryHeading}>Front-end</Typography>
                        <Autocomplete
                            multiple
                            id={`tags-filled-1`}
                            options={[]}
                            value={frontEnd}
                            freeSolo
                            disableClearable
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip key={index} label={option} {...getTagProps({ index })} className={classes.keywordChip} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField {...params} id={`text-field-1`} size="small" variant="outlined" placeholder="+ Add more" classes={{ root: classes.keywordInput }} />
                            )}
                            onChange={(event, value) => handleFrontEnd(value)}
                            classes={{
                                inputRoot: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography className={classes.secondaryHeading}>Back-end</Typography>
                        <Autocomplete
                            multiple
                            id={`tags-filled-2`}
                            options={[]}
                            value={backEnd}
                            freeSolo
                            disableClearable
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip label={option} {...getTagProps({ index })} className={classes.keywordChip} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField {...params} id={`text-field-2`} size="small" variant="outlined" placeholder="+ Add more" classes={{ root: classes.keywordInput }} />
                            )}
                            onChange={(event, value) => handleBackEnd(value)}
                            classes={{
                                inputRoot: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </Grid> </> : <Grid item xs={12}>
                    <Typography className={classes.secondaryHeading}>Technologies</Typography>
                    <Autocomplete
                        multiple
                        id={`tags-filled-1`}
                        options={[]}
                        value={list}
                        freeSolo
                        disableClearable
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip label={option} {...getTagProps({ index })} className={classes.keywordChip} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField {...params} id={`text-field-1`} size="small" variant="outlined" placeholder="+ Add more" classes={{ root: classes.keywordInput }} />
                        )}
                        onChange={(event, value) => handleList(value)}
                        classes={{
                            inputRoot: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                </Grid>}


        </>)
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose} fullWidth={true}
                maxWidth="sm" aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Techology Group</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                name="name"
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={onNameChange}
                                classes={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={typeSwitch}
                                        onChange={handleSwitchChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Primary"
                            />
                        </Grid>
                        {displayTechnologyDetails()}
                    </Grid>
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
