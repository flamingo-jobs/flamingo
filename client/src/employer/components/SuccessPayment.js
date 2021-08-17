import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import FloatCard from "../../components/FloatCard";
import Loading from "../../components/Loading";
import Invoice from "./Invoice/Invoice";
import BACKEND_URL from "../../Config";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "800px",
    padding: `0px 30px`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    paddingBottom: "30px",
    maxHeight: "98vh",
    overflowY: "auto",
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
  closeButton: {
    width: "20px",
    "&:hover": {
      backgroundColor: "#fff",
    },
    padding: "0px",
  },
  closeIcon: {
    color: "#888",
    "&:hover": {
      color: "#555",
    },
  },
  loginContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    color: theme.palette.tuftsBlueHover,
    fontSize: "20px",
    fontWeight: 500,
    textAlign: "center",
  },
  signIn: {
    backgroundColor: theme.palette.white,
    color: theme.palette.tuftsBlue,
    border: "2px solid" + theme.palette.tuftsBlue,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  signInBtnContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
}));

const SuccessPayment = (props) => {
  const classes = useStyles();

  const orderId = new URLSearchParams(useLocation().search).get("order_id");
  const [order, setOrder] = useState();

  useEffect(() => {
    axios
      .post(`${BACKEND_URL}/get-order-details/${orderId}`)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setOrder(res.data.order);
        }
      })
      .catch((err) => {
        if (err) {
          setOrder(undefined);
        }
      });
  }, []);

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
        <FloatCard>{order ? <Invoice order={order} /> : <Loading />}</FloatCard>
      </Grid>
    </Grid>
  );
};

export default SuccessPayment;
