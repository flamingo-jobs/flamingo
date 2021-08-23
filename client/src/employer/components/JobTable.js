import React, { useState, useEffect, createRef } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Grid, Button, makeStyles, Chip, Avatar } from '@material-ui/core';
import BACKEND_URL from '../../Config';
import axios from 'axios';
import NoRowGridOverlay from '../../admin/components/NoRowGridOverlay';
import CustomLoadingOverlay from '../../admin/components/CustomLoadingOverlay';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import SnackBarAlert from '../../components/SnackBarAlert';
import FloatCard from '../../components/FloatCard';
const jwt = require("jsonwebtoken");

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



function JobTable(props) {

    const classes = useStyles();

    const [loading, setLoading] = React.useState(true);
    const [selectionModel, setSelectionModel] = React.useState([]);

    const loginId = sessionStorage.getItem("loginId");
    const userId = jwt.decode(sessionStorage.getItem("userToken"), {
        complete: true,
    }).payload.userId;

    const [rows, setRows] = useState([]);


    const generateQuery = () => {
        return props.singleJobAccess
            ? { 'organization.id': loginId, "createdBy": userId }
            : { 'organization.id': loginId }
    };


    useEffect(() => {
        console.log(props.refreshRequired)
        if (props.refreshRequired) {
            setLoading(true);
            retrieveCategories();
        }
        props.unsetRefresh();
    }, [props.refreshRequired]);

    useEffect(() => {
        retrieveCategories();
    }, []);

    const retrieveCategories = () => {
        axios.post(`${BACKEND_URL}/jobs`, { queryParams: generateQuery() }).then(res => {
            if (res.data.success) {
                if (res.data.existingData.length !== 0) {
                    for (var p in res.data.existingData) {
                        res.data.existingData[p].id = res.data.existingData[p]._id;

                        let [pending, reviewing, shortlisted, rejected] = [0, 0, 0, 0];

                        if (res.data.existingData[p].applicationDetails.length) {
                            res.data.existingData[p].applicationDetails.forEach((item) => {
                                if (item.status === "pending") {
                                    pending += 1;
                                } else if (item.status === "reviewing") {
                                    reviewing += 1;
                                } else if (item.status === "shortlisted") {
                                    shortlisted += 1;
                                } else if (item.status === "rejected") {
                                    rejected += 1;
                                }
                            })
                        }

                        res.data.existingData[p].pending = pending;
                        res.data.existingData[p].reviewing = reviewing;
                        res.data.existingData[p].shortlisted = shortlisted;
                        res.data.existingData[p].rejected = rejected;

                    }
                    setRows(res.data.existingData)
                } else {
                    setRows([])
                }
                setLoading(false);

            } else {
                setRows([]);
                
            }
        })
    }

    const columns = [{ field: 'title', headerName: 'Title', editable: false, width: 250, },
    { field: 'category', headerName: 'Category', width: 150, editable: false },
    { field: 'type', headerName: 'Type', width: 120, editable: false },
    { field: 'location', headerName: 'Location', width: 130, editable: false },
    { field: 'dueDate', headerName: 'Due Date', width: 150, editable: false, type: 'dateTime' },

    {
        field: 'applicationDetails', headerName: 'Total Applications', width: 150, editable: false,
        valueFormatter: (params) => {
            const valueFormatted = params.value.length;
            return `${valueFormatted}`;
        },
    },
    { field: 'pending', headerName: 'Pending', width: 150, editable: false },
    { field: 'reviewing', headerName: 'Reviewing', width: 150, editable: false },
    { field: 'shortlisted', headerName: 'Shortlisted', width: 150, editable: false },
    { field: 'rejected', headerName: 'Rejected', width: 150, editable: false },
    { field: 'isPublished', headerName: 'Published', width: 150, editable: false, type: 'boolean' },
    { field: 'isFeatured', headerName: 'Featured', width: 150, editable: false, type: 'boolean' },
    ];

    return (
        <Grid item container xs={12} spacing={3} direction="column"
            justify="space-between"
            alignItems="flex-start">
            <Grid item xs={12} style={{ minWidth: '100%' }}>
                <FloatCard >
                    <div style={{ height: 524, width: '100%', textAlign: 'right' }}>
                        <div style={{ height: 524, width: '100%' }}>
                            <DataGrid className={classes.table} columns={columns} rows={rows}
                                components={{
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
        </Grid >
    )
}

export default JobTable