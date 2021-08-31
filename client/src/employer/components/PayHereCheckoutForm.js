import {
  Button, Grid, makeStyles, TextField,
  Typography
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from "../../Config";

const packageList = [
  { desc: "standard", value: "1990" },
  { desc: "premium", value: "4990" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    border: `1px solid #5E60CE`,
    borderRadius: 10,
    margin: "30px 10px 30px 10px",
    //background: "linear-gradient(45deg, #64DFDF 30%, #FFFFFF 90%)",
  },
  mainGrid: {
    paddingLeft: 12,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: 12,
      paddingLeft: 20,
      paddingBottom: 12,
    },
  },
  title: {
    color: theme.palette.grey,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  price: {
    color: theme.palette.stateBlue,
    marginBottom: 20,
  },
  textField: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    "& fieldset": {
      borderColor: theme.palette.tuftsBlue,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.pinkyRed + " !important",
    },
  },
  shortTextField: {
    width: "80%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    "& fieldset": {
      borderColor: theme.palette.tuftsBlue,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.pinkyRed + " !important",
    },
  },
  button: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.stateBlueHover,
    },
    float: "center",
  },
}));

const PayHereCheckoutForm = () => {
  const classes = useStyles();
  const payForm = useRef(null);
  const [orderId, setOrderId] = useState("");
  const [subscription, setSubscription] = useState({});
  const [billingDetails, setBillingDetails] = useState({
    merchant_id: "1218131",
    return_url: "http://localhost:3000/employer/success-payment",
    cancel_url: "http://localhost:3000/employer/cancel-payment",
    notify_url: `${BACKEND_URL}/payment`,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Sri Lanka",
    items: "",
    currency: "LKR",
    recurrence: "1 Month",
    duration: "1 Month",
    amount: "",
    paymentDate: new Date(),
    employer: sessionStorage.getItem("loginId"),
  });

  useEffect(() => {
    const selectedPackage = window.location.pathname.split("/")[3];
    setSubscription(
      packageList.find((x) => {
        return x.desc === selectedPackage;
      })
    );
    setBillingDetails({
      ...billingDetails,
      items: selectedPackage,
      amount: selectedPackage === "premium" ? "4990" : "1990",
    });
  }, [window.location.pathname]);

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

  const handleSubmit = async () => {
    axios
      .post(`${BACKEND_URL}/create-order`, billingDetails)
      .then((res) => {
        if (res.data.success) {
          setOrderId(res.data.order);
          payForm.current.submit();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Failed to connect with server. Please try again later!",
          });
          handleAlert();
        }
      });
  };

  return (
    <form
      action="https://sandbox.payhere.lk/pay/checkout"
      method="POST"
      ref={payForm}
    >
      <input
        type="hidden"
        name="merchant_id"
        value={billingDetails.merchant_id}
      />
      <input
        type="hidden"
        name="return_url"
        value={billingDetails.return_url}
      />
      <input
        type="hidden"
        name="cancel_url"
        value={billingDetails.cancel_url}
      />
      <input
        type="hidden"
        name="notify_url"
        value={billingDetails.notify_url}
      />
      <input type="hidden" name="order_id" value={orderId} />
      <input type="hidden" name="items" value={subscription.desc} />
      <input type="hidden" name="currency" value={billingDetails.currency} />
      <input
        type="hidden"
        name="recurrence"
        value={billingDetails.recurrence}
      />
      <input type="hidden" name="duration" value={billingDetails.duration} />
      <input type="hidden" name="amount" value={subscription.value} />
      <Grid
        item
        container
        sm={12}
        spacing={3}
        direction="row"
        justify="space-between"
        className={classes.mainGrid}
        alignItems="flex-start"
      >
        {displayAlert()}
        {console.log(billingDetails)}
        <Grid item xs={12}>
          <Typography variane="h6">Billing Details</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            size="small"
            name="first_name"
            label="First Name"
            value={billingDetails.first_name}
            onChange={(e) =>
              setBillingDetails({
                ...billingDetails,
                first_name: e.target.value,
              })
            }
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            size="small"
            name="last_name"
            label="Last Name"
            value={billingDetails.last_name}
            onChange={(e) =>
              setBillingDetails({
                ...billingDetails,
                last_name: e.target.value,
              })
            }
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            size="small"
            name="email"
            type="email"
            label="Email"
            value={billingDetails.email}
            onChange={(e) =>
              setBillingDetails({
                ...billingDetails,
                email: e.target.value,
              })
            }
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            size="small"
            name="phone"
            label="Phone"
            value={billingDetails.phone}
            onChange={(e) =>
              setBillingDetails({
                ...billingDetails,
                phone: e.target.value,
              })
            }
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            size="small"
            name="address"
            label="Address"
            value={billingDetails.address}
            onChange={(e) =>
              setBillingDetails({
                ...billingDetails,
                address: e.target.value,
              })
            }
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            size="small"
            name="city"
            label="City"
            value={billingDetails.city}
            onChange={(e) =>
              setBillingDetails({
                ...billingDetails,
                city: e.target.value,
              })
            }
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            size="small"
            name="country"
            label="Country"
            value={billingDetails.country}
            onChange={(e) =>
              setBillingDetails({
                ...billingDetails,
                country: e.target.value,
              })
            }
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit} className={classes.button}>
            Pay LKR {subscription.value}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PayHereCheckoutForm;
