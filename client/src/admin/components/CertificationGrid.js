import React, { useState, useEffect, createRef } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Grid, Button, IconButton, makeStyles } from '@material-ui/core';
import BACKEND_URL from '../../Config';
import axios from 'axios';
import NoRowGridOverlay from './NoRowGridOverlay';
import CustomLoadingOverlay from './CustomLoadingOverlay';
import AddIcon from '@material-ui/icons/Add';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import SnackBarAlert from '../../components/SnackBarAlert';
import AddNewCatePopup from './AddNewCatePopup';
import FloatCard from '../../components/FloatCard';
import AddNewCertificatesPopup from './AddNewCertificatesPopup copy';

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
    },
    delBtn: {
        backgroundColor: 'transparent',
        color: theme.palette.red,
        borderRadius: 6,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        "&:hover": {
            backgroundColor: theme.palette.lightyPink,
        }
    },
    paperRoot: {
        padding: 20,
    },
    confrimDelete: {
        boxShadow: "none",
        color: theme.palette.red,
        backgroundColor: theme.palette.lightyPink,
        borderRadius: 12,
        marginLeft: "16px !important",
        padding: "10px",
        "&:hover": {
            backgroundColor: theme.palette.lightyPinkHover,
            boxShadow: "none",
        },
    },

}))



function CertificationGrid(props) {

    const classes = useStyles();

    const [openAddNewPopup, setOpenAddNewPopup] = React.useState(false);

    const [confirmCreate, setConfirmCreate] = React.useState(false);
    const [createSuccess, setCreateSuccess] = React.useState(false);
    const [createFailed, setCreateFailed] = React.useState(false);

    const [confirmUpdate, setConfirmUpdate] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [updateFailed, setUpdateFailed] = React.useState(false);

    const [confirmDelete, setConfirmDelete] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);
    const [deleteFailed, setDeleteFailed] = React.useState(false);

    const [alertShow, setAlertShow] = React.useState(false);
    const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

    const [loading, setLoading] = React.useState(true);
    const [selectionModel, setSelectionModel] = React.useState([]);

    const [pendingChanges, setPendingChanges] = React.useState(false);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [updatedRows, setUpdatedRows] = React.useState([]);

    const [height, setHeight] = React.useState(0);

    const [rows, setRows] = useState([]);
    const columns = props.columns;

    const handleEditRowModelChange = React.useCallback((id, field, props) => {
        setEditRowsModel(id);
    }, []);

    useEffect(() => {
        if (JSON.stringify(editRowsModel) !== "{}") {
            if (updatedRows.length === 0) {
                var newRows = [...rows];
            } else {
                var newRows = [...updatedRows];
            }
            let i = updatedRows.findIndex(x => x.id === editRowsModel.id);
            let j = rows.findIndex(x => x.id === editRowsModel.id);
            
            if(editRowsModel.field === "score"){
                console.log(i);
                if (i >= 0) {
                    newRows[i] = { id: `${i}`, name: updatedRows[i].name, score: editRowsModel.props.value };
                } else {
                    newRows.push({ id: editRowsModel.id, name: rows[j].name, score: editRowsModel.props.value });
                }
            }
            if(editRowsModel.field === "name"){
                console.log(i);
                if (i >= 0) {
                    newRows[i] = { id: `${i}`, name: editRowsModel.props.value, score: updatedRows[i].score };
                } else {
                    newRows.push({ id: editRowsModel.id, name: editRowsModel.props.value, score: rows[j].score });
                }
            }
            console.log(newRows);
            setUpdatedRows(newRows);
            setPendingChanges(true);
        } else if (updatedRows.length === 0) {
            setUpdatedRows([]);
        }
    }, [editRowsModel])

    const handleRefresh = () => {
        setLoading(true);
        retrieveCategories();
        setUpdatedRows([]);
    };

    useEffect(() => {
        if (deleteSuccess === true) {
            setAlertData({ severity: "success", msg: "Item deleted successfully!" });
            handleAlert();
        }
        setLoading(true);
        retrieveCategories();
        setDeleteSuccess(false);
    }, [deleteSuccess]);

    useEffect(() => {
        if (updateSuccess === true) {
            setAlertData({ severity: "success", msg: "Changes saved successfully!" });
            handleAlert();
        }
        setLoading(true);
        retrieveCategories();
        setUpdateSuccess(false);
    }, [updateSuccess]);

    useEffect(() => {
        if (createSuccess === true) {
            setAlertData({ severity: "success", msg: "Item added successfully!" });
            handleAlert();
        }
        setLoading(true);
        retrieveCategories();
        setCreateSuccess(false);
    }, [createSuccess]);

    useEffect(() => {
        if (createFailed === true) {
            setAlertData({ severity: "error", msg: "Failed to add item!" });
            handleAlert();
        }
        setLoading(true);
        retrieveCategories();
        setCreateFailed(false);
    }, [createFailed]);


    useEffect(() => {
        if (updateFailed === true) {
            setAlertData({ severity: "error", msg: "Failed to save changes!" });
            handleAlert();
        }
        setUpdateFailed(false);
    }, [updateFailed]);

    useEffect(() => {
        if (selectionModel.length > 0) {
            showDeleteButton();
        }
    }, [selectionModel]);

    useEffect(() => {
        showSaveChangesButton();
    }, [pendingChanges]);

    const retrieveCategories = () => {
        axios.get(`${BACKEND_URL}/${props.type}`).then(res => {
            if (res.data.success && res.data.existingData !== 0) {
                if (typeof (res.data.existingData) === "object") {
                    let array = [];
                    for (var p in res.data.existingData.certificates) {
                        let certificate = { id: p, name: res.data.existingData.certificates[p].name, score: res.data.existingData.certificates[p].score };
                        array[p] = certificate;
                    }
                    res.data.existingData = array;
                }
                if (res.data.existingData.length < 7) {
                    setHeight(200 + (res.data.existingData.length * 300) / 7);
                } else {
                    setHeight(500);
                }
                setRows(res.data.existingData)
                setUpdatedRows(res.data.existingData)
            } else {
                setRows([])
                setUpdatedRows([])
            }
            setLoading(false);
        })
    }

    // alert

    const handleAlert = () => {
        setAlertShow(true);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertShow(false);
    };

    // deletion

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

        let newRows = [...rows];

        selectionModel.forEach((id) => {
            let i = newRows.findIndex(x => x.id === id);
            if (i >= 0) {
                newRows.splice(i, 1);
            }
        });

        let array = [];
        newRows.forEach((item) => {
            array.push({ name: item.name, score: item.score });
        })

        let data = {
            certificates: array
        }

        axios.put(`${BACKEND_URL}/certifications/update/${props.certId}`, data).then(res => {
            if (res.data.success) {
                setDeleteSuccess(true);
            } else {
                setDeleteFailed(true);
            }
        })
    }

    const showDeleteButton = () => {
        if (selectionModel.length > 0) {
            return <Button className={classes.delBtn} onClick={handleClickOpen}>
                <DeleteRoundedIcon /> Delete
            </Button>
        }
    }

    // updates

    const showSaveChangesButton = () => {
        if (pendingChanges) {
            return <Button className={classes.addBtn} onClick={saveChanges}>
                <SaveRoundedIcon /> Save Changes
            </Button>
        }
    }

    const saveChanges = () => {
        let array = [];
        updatedRows.forEach((item) => {
            array.push({ name: item.name, score: item.score });
        })

        console.log(updatedRows);

        let data = {
            certificates: array
        }
        axios.put(`${BACKEND_URL}/certifications/update/${props.certId}`, data).then(res => {
            if (res.data.success) {
                setUpdateSuccess(true);
            } else {
                setUpdateFailed(true);
            }
        })

        setPendingChanges(false);
        setEditRowsModel({});
        setUpdatedRows([]);
    }

    const displayAlert = () => {
        return <SnackBarAlert open={alertShow} onClose={handleAlertClose} severity={alertData.severity} msg={alertData.msg} />
    }

    const handleAddNewPopup = () => {
        setOpenAddNewPopup(true);
    }

    const handleCreateError = () => {
        setCreateFailed(true);
    }

    const handleCreateSuccess = () => {
        setCreateSuccess(true);
    }

    const closeAddNewPopup = () => {
        setOpenAddNewPopup(false);
    }

    const displayAddNewPopup = () => {
        return <AddNewCertificatesPopup certId={props.certId} open={openAddNewPopup} onClose={closeAddNewPopup} onSuccess={handleCreateSuccess} onError={handleCreateError} />
    }

    return (
        <Grid item container xs={12} spacing={0} direction="column"
            justify="space-around"
            alignItems="center">
            <Dialog
                open={confirmDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{ paper: classes.paperRoot }}
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you want to delete the selected item? <b>This cannot be undone.</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={deleteRow} color="primary" className={classes.confrimDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid item xs={12} style={{ minWidth: '95%' }}>
                {displayAddNewPopup()}
                <div style={{ height: height + 60, width: '100%', textAlign: 'right' }}>
                    {showDeleteButton()}
                    {props.addable !== false ? <Button className={classes.addBtn} onClick={handleAddNewPopup}>
                        <AddIcon /> Add New Certificate{props.label}
                    </Button> : null}
                    <Button className={classes.addBtn} onClick={handleRefresh}>
                        <RefreshRoundedIcon /> Refresh
                    </Button>

                    {showSaveChangesButton()}
                    <div style={{ height: height, width: '100%' }}>
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
            </Grid>
            {displayAlert()}
        </Grid >
    )
}

export default CertificationGrid