import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FloatCard from "../../components/FloatCard";
import SnackBarAlert from "../../components/SnackBarAlert";
import Loading from "../../components/Loading";
import Invoice from "./Invoice/Invoice";
import BACKEND_URL from "../../Config";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    margin: "30px 10px 30px 10px",
    flexGrow: 1,
  },
  mainGrid: {
    paddingLeft: 0,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: 12,
      paddingLeft: 12,
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: "20px !important",
    },
    padding: "20px !important",
    margin: "0px",
  },
  text: {
    color: "green",
    fontSize: "20px",
    fontWeight: 500,
    marginLeft: "3.4em",
  },
  innerCard: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  successTitle: {
    marginLeft: "2em",
    color: "green",
  },
  successIcon: {
    position: "absolute",
    width: "1.5em",
    height: "1.5em",
    marginRight: "1em",
  },
}));

const SuccessPayment = (props) => {
  const classes = useStyles();
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

  const orderId = new URLSearchParams(useLocation().search).get("order_id");
  const [order, setOrder] = useState();
  useEffect(() => {
    axios
      .post(`${BACKEND_URL}/get-order-details/${orderId}`)
      .then((res) => {
        if (res.data.success) {
          setOrder(res.data.order);
          updatePackageDetails(res.data.order.items, res.data.order.startDate);
        }
      })
      .catch((err) => {
        if (err) {
          setOrder(undefined);
        }
      });
  }, []);

  const updatePackageDetails = (packageType, startDate) => {
    const loginId = sessionStorage.getItem("loginId");
    const subscriptionData = {
      subscription: {
        type: packageType,
        startDate: startDate,
      },
    };
    axios
      .put(`${BACKEND_URL}/employers/update/${loginId}`, subscriptionData)
      .then((res) => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Payment successful!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Failed to complete process. Please contact our support center",
          });
          handleAlert();
        }
      });
  };

  if (order) {
    var invoiceData = {
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
  }

  return (
    <Grid
      item
      container
      sm={12}
      spacing={3}
      direction="row"
      className={classes.mainGrid}
      alignItems="left"
      justify="left"
      align="left"
    >
      <Grid item xs={12}>
        {displayAlert()}
        <FloatCard>
          {order ? (
            <Grid
              item
              container
              sm={12}
              spacing={3}
              direction="row"
              className={classes.innerCard}
              alignItems="left"
              justify="left"
              align="left"
            >
              <Grid item xs={12}>
                <Box mt={2} />
                <CheckCircleIcon
                  style={{ fill: "green" }}
                  className={classes.successIcon}
                />
                <Typography variant="h4" className={classes.successTitle}>
                  Payment Successful!
                </Typography>
                <Typography className={classes.text}>
                  Download your invoice below
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.cardContent}>
                <Invoice invoice={invoiceData} />{" "}
              </Grid>
            </Grid>
          ) : (
            <Loading />
          )}
        </FloatCard>
      </Grid>
    </Grid>
  );
};

export default SuccessPayment;
