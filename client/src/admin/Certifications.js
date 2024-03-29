import React, { useEffect, useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import FloatCard from '../components/FloatCard'
import CertificationsAccordion from './components/CertificationsAccordion'
import BACKEND_URL from '../Config'
import axios from 'axios'
import SnackBarAlert from '../components/SnackBarAlert'
import { makeStyles } from '@material-ui/core'
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import AddIcon from '@material-ui/icons/Add';
import AddNewCertificationPopup from './components/AddNewCertificationPopup'
import NoInfo from '../components/NoInfo'
import Loading from '../components/Loading'

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
}))

function Certifications() {

    const classes = useStyles();

    const [certifications, setCertifications] = useState([]);
    const [refershRequired, setRefreshRequired] = useState(false);

    const [createSuccess, setCreateSuccess] = React.useState(false);
    const [createFailed, setCreateFailed] = React.useState(false);

    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const [updateFailed, setUpdateFailed] = React.useState(false);

    const [confirmDelete, setConfirmDelete] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);
    const [deleteFailed, setDeleteFailed] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState("");

    const [alertShow, setAlertShow] = React.useState(false);
    const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

    const [openAddNewPopup, setOpenAddNewPopup] = React.useState(false);

    useEffect(() => {
        retrieveCertifications();
    }, [])

    useEffect(() => {
        if (refershRequired) {
            retrieveCertifications();
            setRefreshRequired(false);
        }
    }, [refershRequired])

    const handleClickOpen = () => {
        setConfirmDelete(true);
    };

    const handleClose = () => {
        setConfirmDelete(false);
    };

    const handleUpdatesuccess = () => {
        setUpdateSuccess(true);
    }

    const handleUpdateFailed = () => {
        setUpdateFailed(true);
    }

    const handleDelete = (id) => {
        setDeleteId(id);
        setConfirmDelete(true);
    };

    useEffect(() => {
        if (updateSuccess === true) {
            setAlertData({ severity: "success", msg: "Changes saved successfully!" });
            handleAlert();
        }
        setUpdateSuccess(false);
    }, [updateSuccess]);

    useEffect(() => {
        if (updateFailed === true) {
            setAlertData({ severity: "error", msg: "Failed to save changes!" });
            handleAlert();
        }
        setUpdateFailed(false);
    }, [updateFailed]);

    useEffect(() => {
        if (createSuccess === true) {
            setAlertData({ severity: "success", msg: "Item added successfully!" });
            handleAlert();
        }
        setCreateSuccess(false);
    }, [createSuccess]);

    useEffect(() => {
        if (createFailed === true) {
            setAlertData({ severity: "error", msg: "Failed to add item!" });
            handleAlert();
        }
        setCreateFailed(false);
    }, [createFailed]);

    useEffect(() => {
        if (deleteSuccess === true) {
            setAlertData({ severity: "success", msg: "Item deleted successfully!" });
            handleAlert();
        }
        setDeleteSuccess(false);
        handleRefresh();
    }, [deleteSuccess]);

    useEffect(() => {
        if (deleteFailed === true) {
            setAlertData({ severity: "error", msg: "Failed to delete item!" });
            handleAlert();
        }
        setDeleteFailed(false);
        handleRefresh();
    }, [deleteFailed]);

    const handleRefresh = () => {
        setRefreshRequired(true);
        setCertifications([]);
    }

    const retrieveCertifications = () => {
        axios.get(`${BACKEND_URL}/certifications`).then(res => {
            if (res.data.success) {
                setCertifications(res.data.existingData)
            } else {
                setCertifications("empty")
            }
        })
    }

    const displayCertifications = () => {
        if (certifications === "empty") {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <NoInfo message="Sorry, we can't find any technology right now!" />
                    </FloatCard>
                </Grid>)
        } else if (certifications.length === 0) {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <Loading />
                    </FloatCard>
                </Grid>)
        } else {
            return certifications.map(certification => (
                <CertificationsAccordion handleDelete={handleDelete} handleClickOpen={handleClickOpen} confirmDelete={confirmDelete} handleClose={handleClose} deleteRow={deleteRow} key={certification._id} info={certification} onRefresh={handleRefresh} onSuccessUpdate={handleUpdatesuccess} onFailedUpdate={handleUpdateFailed} />
            ))
        } 
    }

    const displayAlert = () => {
        return <SnackBarAlert open={alertShow} onClose={handleAlertClose} severity={alertData.severity} msg={alertData.msg} />
    }

    const handleAlert = () => {
        setAlertShow(true);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertShow(false);
    };

    const handleCreateError = () => {
        setCreateFailed(true);
    }

    const handleCreateSuccess = () => {
        setCreateSuccess(true);
        handleRefresh();
    }

    const handleAddNewPopup = () => {
        setOpenAddNewPopup(true);
    }
    const closeAddNewPopup = () => {
        setOpenAddNewPopup(false);
    }

    const deleteRow = () => {
        if (deleteId !== "") {
            deleteRecord();
            setConfirmDelete(false);
        }
    };

    const deleteRecord = () => {
        axios.delete(`${BACKEND_URL}/certifications/delete/${deleteId}`).then(res => {
            if (res.data.success) {
                setDeleteSuccess(true);
            } else {
                setDeleteFailed(true);
            }
        })
    }

    const displayAddNewPopup = () => {
        return <AddNewCertificationPopup open={openAddNewPopup} onClose={closeAddNewPopup} onSuccess={handleCreateSuccess} onError={handleCreateError} />
    }

    return (
        <Grid item container xs={12} spacing={3} direction="column"
            justify="space-between"
            alignItems="flex-start">
            <Grid item xs={12} style={{ minWidth: '100%' }}>
                {displayAddNewPopup()}
                <FloatCard >
                    <div style={{ padding: 20, width: '100%', textAlign: 'left' }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button className={classes.addBtn} onClick={handleAddNewPopup}>
                                <AddIcon /> Add New Certification
                            </Button>
                            <Button className={classes.addBtn} onClick={handleRefresh}>
                                <RefreshRoundedIcon /> Refresh
                            </Button>
                        </div>
                        {displayCertifications()}
                    </div>
                </FloatCard>
            </Grid>
            {displayAlert()}
        </Grid >
    )
}

export default Certifications
