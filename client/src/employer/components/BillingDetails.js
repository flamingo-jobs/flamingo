import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FloatCard from "../../components/FloatCard";
import { DataGrid } from "@material-ui/data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Invoice from "./Invoice/Invoice";
import SnackBarAlert from "../../components/SnackBarAlert";
import { Link } from "react-router-dom";
import BACKEND_URL from "../../Config";
import axios from "axios";
import Loading from "../../components/Loading";
const jwt = require("jsonwebtoken");

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    flexGrow: 1,
  },
  mainGrid: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: 12,
      paddingLeft: 12,
    },
  },
  icon: {
    color: theme.palette.darkGreen,
  },
  cancelIcon: {
    color: theme.palette.lightRed,
  },
  button: {
    marginTop: 10,
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.stateBlueHover,
    },
    float: "center",
  },
  switchButton: {
    marginTop: 10,
    marginRight: 20,
    backgroundColor: theme.palette.ashBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.ashBlueHover,
    },
    float: "center",
  },
  dangerButton: {
    marginTop: 10,
    marginRight: 20,
    backgroundColor: theme.palette.red,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.redHover,
    },
    float: "center",
  },
  dialogbuttons: {
    color: theme.palette.red,
  },
  firstDivider: {
    marginTop: "12%",
  },
  topCard: {
    minWidth: "100%",
    borderRadius: 12,
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
    overflow: "unset",
    margin: "0px 10px 20px 5px",
  },
  topCardContent: {
    padding: 10,
    justifyContent: "center",
    display: "grid",
    justifyItems: "center",
  },
  topCardText: {
    alignSelf: "center",
    padding: "20px !important",
  },
  topCardTitle: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    marginBottom: 20,
  },
  topCardTextBody: {
    color: theme.palette.black,
    marginBottom: 20,
  },
  dialogBox: {
    width: "100%",
  },
}));

export default function BillingDetails(props) {
  const classes = useStyles();

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      width: 240,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 127,
    },
    {
      field: "payedBy",
      headerName: "Payed By",
      width: 150,
    },
    {
      field: "payDay",
      headerName: "Payed On",
      width: 150,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 149,
    },
    {
      field: "validity",
      headerName: "Valid Period",
      width: 154,
    },
    {
      field: "nextDate",
      headerName: "Expire Date",
      width: 149,
    },
    {
      field: "orderId",
      headerName: "Invoice",
      width: 122,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => showInvoice(params.row.orderId)}
        >
          Open
        </Button>
      ),
    },
  ];

  // Alert stuff
  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });
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
  const handleAlert = () => {
    setAlertShow(true);
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  const [currentOrder, setCurrentOrder] = useState();
  const [previousOrders, setPreviousOrders] = useState();
  const [rows, setRows] = useState();
  const loginId = sessionStorage.getItem("loginId");
  useEffect(() => {
    axios.get(`${BACKEND_URL}/orders/${loginId}`).then((res) => {
      if (res.data.success) {
        setPreviousOrders(res.data.previousOrders);
        let fixedRows = [];
        res.data.previousOrders.forEach((x, index) => {
          fixedRows.push({
            id: index,
            payDay: x.paymentDate ? x.paymentDate.slice(0, 10) : "N/A",
            amount: x.amount ? x.currency + " " + x.amount : "N/A",
            description: x.items
              ? "Monthly charge: " + x.items + " package"
              : "N/A",
            validity: x.duration ? x.duration : "N/A",
            startDate: new Date(x.startDate).toISOString().slice(0, 10),
            nextDate: new Date(x.endDate).toISOString().slice(0, 10),
            payedBy:
              (x.first_name ? x.first_name : "N/A") +
              " " +
              (x.last_name ? x.last_name : "N/A"),
            orderId: x._id,
          });
        });
        setRows(fixedRows);
        getDueDate(fixedRows);
        setLoadingData(false);
      }
    });
  }, []);

  const [expiryDate, setExpiryDate] = useState("");
  const getDueDate = async (fixedRows) => {
    setExpiryDate(
      new Date(
        Math.max.apply(
          null,
          fixedRows.map((x) => {
            return new Date(x.nextDate);
          })
        )
      )
        .toISOString()
        .slice(0, 10)
    );
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const handleClickOpen = (e) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleInvoiceClose = () => {
    setInvoiceOpen(false);
  };

  const [loadingData, setLoadingData] = useState(true);

  const unsubscribePackage = () => {
    const userId = jwt.decode(sessionStorage.getItem("userToken"), {
      complete: true,
    }).payload.userId;
    axios
      .post(`${BACKEND_URL}/api/check-password`, {
        userId: userId,
        password: confirmPassword,
      })
      .then((res) => {
        if (res.data.success) {
          dropToBasic();
          window.location = "/employer/billing";
        } else {
          setAlertData({
            severity: "error",
            msg: "Password you have entered does not match with your account password!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Password you have entered does not match with your account password!",
          });
          handleAlert();
        }
      });
  };

  const dropToBasic = () => {
    const loginId = sessionStorage.getItem("loginId");
    const subscriptionData = {
      subscription: {
        type: "Basic",
        startDate: new Date(),
      },
    };
    axios
      .put(`${BACKEND_URL}/employers/update/${loginId}`, subscriptionData)
      .then((res) => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "You have successfully unsubscribed from this service!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Action Failed!. Please contact our support service",
          });
          handleAlert();
        }
      });
  };

  const showInvoice = (orderId) => {
    let order = previousOrders.find((x) => {
      return x._id === orderId;
    });
    let invoiceData = {
      id: orderId,
      invoice_no: order.paymentDate.slice(0, 10) + orderId.slice(0, 3),
      balance: order.amount,
      company: order.first_name + " " + order.last_name,
      email: order.email,
      phone: order.phone,
      address: order.address + ", " + order.city + ", " + order.country,
      trans_date: order.paymentDate.slice(0, 10),
      due_date: order.paymentDate.slice(0, 10),
      items: [
        {
          sno: 1,
          desc: order.items + " subscription package",
          qty: 1,
          rate: order.amount,
        },
      ],
    };
    setCurrentOrder(invoiceData);
    setInvoiceOpen(true);
  };

  return (
    <FloatCard>
      <Grid
        item
        container
        sm={12}
        spacing={3}
        direction="row"
        className={classes.mainGrid}
      >
        <Grid item xs={12}>
          {displayAlert()}
          <Typography variant="h6">Previous payments</Typography> <Box m={1} />
          {loadingData ? <Loading /> : null}
          {rows ? (
            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={11}
                checkboxSelection
                disableSelectionOnClick
              />
            </div>
          ) : (
            <Typography variant="body1" className={classes.topCardTextBody}>
              <Box fontWeight={500} fontSize={20} m={1}>
                No previous payments
              </Box>
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">
            You are subscribed to {props.info} package
          </Typography>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          {props.info === "premium" ? (
            <Link to="/employer/payment/standard">
              <Button className={classes.switchButton}>
                Switch to Standard Package
              </Button>
            </Link>
          ) : (
            <Link to="/employer/payment/premium">
              <Button className={classes.switchButton}>
                Switch to Premium Package
              </Button>
            </Link>
          )}
          <Button className={classes.dangerButton} onClick={handleClickOpen}>
            Unsubscribe from Service
          </Button>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Next Payment: {expiryDate}</Typography>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <Link to="/employer/payment/premium">
            <Button className={classes.button}>Continue to Payment</Button>
          </Link>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="edit-details-form"
          fullWidth
        >
          <DialogTitle id="edit-details-form">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are going to unsubscribe from {props.info} package. Please
              confirm your password to unsubscribe from this service.
              <Box m={2} />
              <TextField
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                placeholder="Enter your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={unsubscribePackage}
              color="primary"
              className={classes.dialogbuttons}
            >
              Confirm and Unsubscribe
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={invoiceOpen}
          onClose={handleInvoiceClose}
          aria-labelledby="edit-details-form"
          fullWidth
          className={classes.dialogBox}
        >
          <DialogTitle id="edit-details-form">Invoice</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Invoice invoice={currentOrder} />{" "}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInvoiceClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </FloatCard>
  );
}
