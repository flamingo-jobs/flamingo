import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { Grid, Button, makeStyles, IconButton } from "@material-ui/core";
import BACKEND_URL from "../../Config";
import axios from "axios";
import NoRowGridOverlay from "./NoRowGridOverlay";
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import AddIcon from "@material-ui/icons/Add";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import SnackBarAlert from "../../components/SnackBarAlert";
import AddNewCatePopup from "./AddNewCatePopup";
import FloatCard from "../../components/FloatCard";
import { Link } from "react-router-dom";
import { FILE_URL } from "./../../Config";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import VerificationDialog from "./VerificationDialog";
import AddNewSkillPopup from "./AddNewSkillPopup";
import AddNewPackage from "./AddNewPackage";

const useStyles = makeStyles((theme) => ({
  table: {
    "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus-within":
      {
        outline: "none",
      },
  },
  addBtn: {
    backgroundColor: "transparent",
    color: theme.palette.tuftsBlue,
    borderRadius: 6,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: theme.palette.lightSkyBlue,
    },
  },
  delBtn: {
    backgroundColor: "transparent",
    color: theme.palette.red,
    borderRadius: 6,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: theme.palette.lightyPink,
    },
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
}));

function GridTable(props) {
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

  const [rows, setRows] = useState([]);

  const employerColumns = [
    { field: "name", headerName: "Name", width: 150, editable: false },
    { field: "email", headerName: "Email", width: 150, editable: false },
    {
      field: "dateRegistered",
      headerName: "Registered Date",
      width: 180,
      editable: false,
      valueFormatter: (params) => {
        const valueFormatted = new Date(params.value).toLocaleDateString();
        return `${valueFormatted}`;
      },
    },
    {
      field: "locations",
      headerName: "Locations",
      width: 250,
      editable: false,
    },
    {
      field: "verificationStatus",
      headerName: "Verification Status",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            minWidth: "-webkit-fill-available",
            alignItems: "center",
          }}
        >
          {params.value}
          {params.value !== "None" ? (
            <IconButton
              onClick={() => {
                handleOpenVerification(params.row.id, params.value);
              }}
            >
              <EditRoundedIcon />
            </IconButton>
          ) : null}
        </div>
      ),
    },
    {
      field: "verificationFileName",
      headerName: "Verification Document",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <>
          {params.value ? (
            <Link
              to={{ pathname: `${FILE_URL}/verification/${params.value}` }}
              target="_blank"
              download
            >
              <Button color="primary" size="small" style={{ marginLeft: 16 }}>
                Open
              </Button>
            </Link>
          ) : null}
        </>
      ),
    },
    {
      field: "subscription",
      headerName: "Subscription",
      width: 170,
      editable: false,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      width: 150,
      editable: false,
    },
    {
      field: "categories",
      headerName: "Categories",
      width: 200,
      editable: false,
    },
    {
      field: "isFeatured",
      headerName: "Is Featured",
      width: 170,
      editable: false,
    },
  ];

  let columns;

  if (props.type === "employers") {
    columns = employerColumns;
  } else {
    columns = props.columns;
  }

  const [openVerification, setOpenVerification] = useState(false);
  const [verifyId, setVerifyId] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(false);

  const handleOpenVerification = (id, status) => {
    setVerifyId(id);
    setVerifyStatus(status);
    setOpenVerification(true);
  };

  const handleCloseVerification = () => {
    setVerifyId(false);
    setVerifyStatus(false);
    setOpenVerification(false);
  };

  const handleEditRowModelChange = React.useCallback((id, field, props) => {
    setEditRowsModel(id);
  }, []);

  useEffect(() => {
    if (JSON.stringify(editRowsModel) !== "{}") {
      let newRows = updatedRows;
      let i = updatedRows.findIndex((x) => x.id === editRowsModel.id);
      if (i >= 0) {
        newRows[i] = editRowsModel;
      } else {
        newRows.push(editRowsModel);
      }
      setUpdatedRows(newRows);
      setPendingChanges(true);
    } else if (updatedRows.length === 0) {
      setUpdatedRows([]);
    }
  }, [editRowsModel]);

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
    if (props.type === "jobseekers") {
      axios.get(`${BACKEND_URL}/jobseekers/toTable`).then((res) => {
        if (res.data.success && res.data.existingData !== 0) {
          for (var p in res.data.existingData) {
            res.data.existingData[p].id = res.data.existingData[p]._id;
          }
          setRows(res.data.existingData);
        } else {
          setRows([]);
        }
        setLoading(false);
      });
    } else if (props.type === "employers") {
      axios.get(`${BACKEND_URL}/employers/toTable`).then((res) => {
        if (res.data.success && res.data.existingData !== 0) {
          for (var p in res.data.existingData) {
            res.data.existingData[p].id = res.data.existingData[p]._id;
          }
          setRows(res.data.existingData);
        } else {
          setRows([]);
        }
        setLoading(false);
      });
    } else {
      axios.get(`${BACKEND_URL}/${props.type}`).then((res) => {
        if (res.data.success && res.data.existingData !== 0) {
          for (var p in res.data.existingData) {
            res.data.existingData[p].id = res.data.existingData[p]._id;
          }
          setRows(res.data.existingData);
        } else {
          setRows([]);
        }
        setLoading(false);
      });
    }
  };

  // alert

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
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
    axios
      .post(`${BACKEND_URL}/${props.type}/delete`, {
        _id: { $in: selectionModel },
      })
      .then((res) => {
        if (res.data.success) {
          setDeleteSuccess(true);
        } else {
          setDeleteFailed(true);
        }
      })
      .catch((err) => {
        setDeleteFailed(true);
        handleRefresh();
      });
  };

  const showDeleteButton = () => {
    if (
      selectionModel.length > 0 &&
      !(props.type === "employers" || props.type === "jobseeker")
    ) {
      return (
        <Button className={classes.delBtn} onClick={handleClickOpen}>
          <DeleteRoundedIcon /> Delete
        </Button>
      );
    }
  };

  // updates

  const showSaveChangesButton = () => {
    if (pendingChanges) {
      return (
        <Button className={classes.addBtn} onClick={saveChanges}>
          <SaveRoundedIcon /> Save Changes
        </Button>
      );
    }
  };

  const displayVerificationPopup = () => {
    if (openVerification) {
      return (
        <VerificationDialog
          open={openVerification}
          close={handleCloseVerification}
          verifyId={verifyId}
          verifyStatus={verifyStatus}
          handleRefresh={handleRefresh}
        />
      );
    }
  };

  const saveChanges = () => {
    updatedRows.forEach((item) => {
      let data;

      if (props.type === "categories" || props.type === "skills") {
        data = {
          name: item.props.value,
        };
      } else if (props.type === "subscriptions") {
        switch (item.field) {
          case "type":
            data = { type: item.props.value };
            break;
          case "description":
            data = { maxUsers: item.props.value };
            break;
          case "maxResumes":
            data = { maxResumes: item.props.value };
            break;
          case "maxJobs":
            data = { maxJobs: item.props.value };
            break;
          case "maxUsers":
            data = { maxUsers: item.props.value };
            break;
          case "shortlisting":
            data = { shortlisting: item.props.value };
            break;
          case "customizedShortlisting":
            data = { customizedShortlisting: item.props.value };
            break;
          case "applicantFiltering":
            data = { applicantFiltering: item.props.value };
            break;
          default:
            break;
        }
      }
      axios
        .put(`${BACKEND_URL}/${props.type}/update/${item.id}`, data)
        .then((res) => {
          if (res.data.success) {
            setUpdateSuccess(true);
          } else {
            setUpdateFailed(true);
          }
        })
        .catch((err) => {
          setUpdateFailed(true);
          handleRefresh();
        });
    });
    setPendingChanges(false);
    setEditRowsModel({});
    setUpdatedRows([]);
  };

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

  const handleAddNewPopup = () => {
    setOpenAddNewPopup(true);
  };

  const handleCreateError = () => {
    setCreateFailed(true);
  };

  const handleCreateSuccess = () => {
    setCreateSuccess(true);
  };

  const closeAddNewPopup = () => {
    setOpenAddNewPopup(false);
  };

  const displayAddNewPopup = () => {
    if (props.type === "categories") {
      return (
        <AddNewCatePopup
          open={openAddNewPopup}
          onClose={closeAddNewPopup}
          onSuccess={handleCreateSuccess}
          onError={handleCreateError}
        />
      );
    } else if (props.type === "skills") {
      return (
        <AddNewSkillPopup
          open={openAddNewPopup}
          onClose={closeAddNewPopup}
          onSuccess={handleCreateSuccess}
          onError={handleCreateError}
        />
      );
    } else if (props.type === "subscriptions") {
      return (
        <AddNewPackage
          open={openAddNewPopup}
          onClose={closeAddNewPopup}
          onSuccess={handleCreateSuccess}
          onError={handleCreateError}
        />
      );
    }
  };

  return (
    <Grid
      item
      container
      xs={12}
      spacing={3}
      direction="column"
      justify="space-between"
      alignItems="flex-start"
    >
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
            Are you sure that you want to delete the selected item?{" "}
            <b>This cannot be undone.</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={deleteRow}
            color="primary"
            className={classes.confrimDelete}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12} style={{ minWidth: "100%" }}>
        {displayAddNewPopup()}
        <FloatCard>
          <div style={{ height: 550, width: "100%", textAlign: "right" }}>
            {showDeleteButton()}
            {props.addable !== false ? (
              <Button className={classes.addBtn} onClick={handleAddNewPopup}>
                <AddIcon /> Add New {props.label}
              </Button>
            ) : null}
            <Button className={classes.addBtn} onClick={handleRefresh}>
              <RefreshRoundedIcon /> Refresh
            </Button>

            {showSaveChangesButton()}
            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                className={classes.table}
                columns={columns}
                rows={rows}
                editRowsModel={editRowsModel}
                onEditCellChangeCommitted={handleEditRowModelChange}
                components={{
                  Toolbar: GridToolbar,
                  NoRowsOverlay: NoRowGridOverlay,
                  LoadingOverlay: CustomLoadingOverlay,
                }}
                loading={loading}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(newSelection) => {
                  setSelectionModel(newSelection.selectionModel);
                }}
                selectionModel={selectionModel}
              />
            </div>
          </div>
        </FloatCard>
      </Grid>
      {displayVerificationPopup()}
      {displayAlert()}
    </Grid>
  );
}

export default GridTable;
