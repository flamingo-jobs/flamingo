import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FloatCard from "../../components/FloatCard";
import { DataGrid } from "@material-ui/data-grid";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";
import BACKEND_URL from "../../Config";
import axios from "axios";
const jwt = require("jsonwebtoken");

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    width: 231,
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
    headerName: "Payed At",
    width: 150,
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
];

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    border: `1px solid #5E60CE`,
    borderRadius: 10,
    margin: "30px 10px 30px 10px",
    // background: "linear-gradient(45deg, #64DFDF 30%, #FFFFFF 90%)",
  },
  title: {
    color: theme.palette.grey,
    marginBottom: 10,
  },
  price: {
    color: theme.palette.stateBlue,
    marginBottom: 20,
  },
  features: {
    backgroundColor: theme.palette.white,
    float: "left",
    marginLeft: "18%",
  },
  icon: {
    color: theme.palette.darkGreen,
  },
  cancelIcon: {
    color: theme.palette.lightRed,
  },
  featuresContainer: {
    //marginBottom: "70%",
  },
  annual: {
    color: theme.palette.stateBlue,
    marginTop: -15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.stateBlueHover,
    },
    float: "center",
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
  lottie: {
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
}));

export default function BillingDetails(props) {
  const classes = useStyles();
  const [previousOrders, setPreviousOrders] = useState();
  const loginId = sessionStorage.getItem("loginId");
  useEffect(() => {
    axios.get(`${BACKEND_URL}/orders/${loginId}`).then((res) => {
      if (res.data.success) {
        let row = [];
        res.data.previousOrders.map((x, index) => {
          let dueDate = x.paymentDate
            ? new Date(
                new Date(x.paymentDate).getTime() + 30 * 24 * 60 * 60 * 1000
              )
            : undefined;
          row.push({
            id: index,
            payDay: x.paymentDate ? x.paymentDate.slice(0, 10) : "a",
            amount: x.amount ? x.currency + " " + x.amount : "a",
            description: x.items
              ? "Monthly payment: " + x.items + " package"
              : "a",
            validity: x.duration ? x.duration : "a",
            nextDate: dueDate ? dueDate.toISOString().slice(0, 10) : "a",
            payedBy:
              (x.first_name ? x.first_name : "a") +
              " " +
              (x.last_name ? x.last_name : "a"),
            orderId: x._id,
          });
        });
        setPreviousOrders(row);
      }
    });
  }, []);
  return (
    <Grid
      container
      direction="row"
      spacing={3}
      justify="space-between"
      alignItems="center"
      style={{ maxWidth: "100%" }}
    >
      <FloatCard>
        <Grid item xs={12} className={classes.topCardText}>
          <Typography variant="h4">Previous payments</Typography>{" "}
          {previousOrders ? (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={previousOrders}
                columns={columns}
                pageSize={10}
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
        <Grid item xs={12} lg={6} className={classes.topCardText}>
          <Typography variant="body1" className={classes.topCardTextBody}>
            <Box fontWeight={500} fontSize={20} m={1}>
              {props.info}
              Flamingo goes few steps further from a typical job portal and
              brings a novel recruitment experience for the Sri Lankan IT
              industry by making use of cutting edge technology. Upgrade your
              account today to experience advanced features!
            </Box>
          </Typography>
        </Grid>
      </FloatCard>
    </Grid>
  );
}
