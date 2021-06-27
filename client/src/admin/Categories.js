import React, { useState, useEffect, createRef } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Grid, Button, IconButton, makeStyles } from '@material-ui/core';
import FloatCard from '../components/FloatCard';
import BACKEND_URL from '../Config';
import axios from 'axios';
import NoRowGridOverlay from './components/NoRowGridOverlay';
import CustomLoadingOverlay from './components/CustomLoadingOverlay';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
const useStyles = makeStyles((theme) => ({
    table: {
        '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus-within': {
            outline: 'none'
        },
    },
    addBtn: {
        backgroundColor: 'transparent',
        color: theme.palette.tuftsBlue,
        borderRadius: 6,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        "&:hover": {
            backgroundColor: theme.palette.lightSkyBlue,
        }
    }
}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Categories() {

    const classes = useStyles();
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);
    const [deleteFailed, setDeleteFailed] = React.useState(false);
    const [alertShow, setAlertShow] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [pendingChanges, setPendingChanges] = React.useState(false);
    const columns = [{ field: 'name', headerName: 'Category Name', flex: 1, editable: true }];

    const [rows, setRows] = useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [updatedRows, setUpdatedRows] = React.useState([]);

    const handleEditRowModelChange = React.useCallback((id, field, props) => {
        setEditRowsModel(id);
    }, []);

    useEffect(() => {

        if (JSON.stringify(editRowsModel) != "{}") {
            let newRows = updatedRows;
            let i = updatedRows.findIndex(x => x.id == editRowsModel.id);
            if (i >= 0) {
                newRows[i] = editRowsModel;
            } else {
                newRows.push(editRowsModel);
            }
            setUpdatedRows(newRows);
        } else if (updatedRows.length == 0 ){
            setUpdatedRows([]);
        }
        showSaveChangesButton();
        console.log(JSON.stringify(updatedRows));
    }, [editRowsModel])

    const handleAlert = () => {
        setAlertShow(true);

    };

    const handleRefresh = () => {
        setLoading(true);
        retrieveCategories();
        setUpdatedRows([]);
    };

    useEffect(() => {
        if (deleteSuccess == true) {
            handleAlert();
        }
        setLoading(true);
        retrieveCategories();
        setDeleteSuccess(false);
    }, [deleteSuccess]);


    useEffect(() => {
        if (selectionModel.length > 0) {
            showDeleteButton();
        }
    }, [selectionModel]);

    const retrieveCategories = () => {
        axios.get(`${BACKEND_URL}/categories`).then(res => {
            if (res.data.success && res.data.existingCategories != 0) {
                for (var p in res.data.existingCategories) {
                    res.data.existingCategories[p].id = res.data.existingCategories[p]._id;
                }
                setRows(res.data.existingCategories)
            } else {
                setRows([])
            }
            setLoading(false);
        })
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertShow(false);
    };



    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const handleClickOpen = () => {
        setConfirmDelete(true);
    };


    const handleClose = () => {
        setConfirmDelete(false);
    };

    const deleteRow = () => {
        deleteRecord();
        setConfirmDelete(false);
        setSelectionModel([]);
    };

    const deleteRecord = () => {
        axios.post(`${BACKEND_URL}/categories/delete`, { _id: { $in: selectionModel } }).then(res => {
            if (res.data.success) {
                console.log("deleted");
                setDeleteSuccess(true);
            } else {
                console.log("error");
                setDeleteFailed(true);
            }
        })
    }

    const showDeleteButton = () => {
        if (selectionModel.length > 0) {
            return <Button className={classes.addBtn} onClick={handleClickOpen}>
                <DeleteRoundedIcon /> Delete
            </Button>
        }
    }

    const showSaveChangesButton = () => {
        if (updatedRows.length > 0) {
            return <Button className={classes.addBtn} onClick={saveChanges}>
                <SaveRoundedIcon /> Save Changes
            </Button>
        }
    }

    const saveChanges = () => {
        updatedRows.forEach((item) => {
            let data = {
                name: item.props.value
            }
            axios.put(`${BACKEND_URL}/categories/update/${item.id}`, data).then(res => {
                if (res.data.success) {
                    console.log("updated");
                    setDeleteSuccess(true);
                } else {
                    console.log(res.data);
                    setDeleteFailed(true);
                }
            })
        })

        setEditRowsModel({});
        setUpdatedRows([]);

    }

    return (
        <Grid item container xs={12} spacing={3} direction="column"
            justify="space-between"
            alignItems="flex-start">
            <Dialog
                open={confirmDelete}
                onClose={handleClose}
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
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={deleteRow} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid item xs={12} style={{ minWidth: '100%' }}>
                <FloatCard >
                    <div style={{ height: 570, width: '100%', textAlign: 'left' }}>
                        <Button className={classes.addBtn}>
                            <AddIcon /> Add New Category
                        </Button>
                        <Button className={classes.addBtn} onClick={handleRefresh}>
                            <RefreshRoundedIcon /> Refresh
                        </Button>
                        {showDeleteButton()}
                        {showSaveChangesButton()}
                        <div style={{ height: 520, width: '100%' }}>
                            <DataGrid className={classes.table} columns={columns} rows={rows} editRowsModel={editRowsModel}
                                onEditCellChangeCommitted={handleEditRowModelChange} components={{
                                    Toolbar: GridToolbar,
                                    NoRowsOverlay: NoRowGridOverlay,
                                    LoadingOverlay: CustomLoadingOverlay,
                                }} loading={loading} checkboxSelection disableSelectionOnClick onSelectionModelChange={(newSelection) => {
                                    setSelectionModel(newSelection.selectionModel);
                                }}
                                selectionModel={selectionModel} />
                        </div>
                    </div>
                </FloatCard>
            </Grid>
            <Snackbar open={alertShow} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}>
                <Alert onClose={handleAlertClose} severity="success">
                    Item deleted successfull!
                </Alert>
            </Snackbar>
        </Grid >
    )
}

export default Categories
