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
}));

export default function BillingDetails(props) {
  const classes = useStyles();
  const [expiryDate, setExpiryDate] = useState("");
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
              ? "Monthly charge: " + x.items + " package"
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
        getDueDate(row);
      }
    });
  }, []);
  const getDueDate = async (row) => {
    let currentDate = new Date();
    await row.map((x) => {
      if (new Date(x.nextDate) > currentDate) {
        currentDate = x.nextDate;
      }
    });
    setExpiryDate(currentDate.toString());
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
          <Typography variant="h6">Previous payments</Typography> <Box m={1} />
          {previousOrders ? (
            <div style={{ height: 300, width: "100%" }}>
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
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">
            You have subscribed to: {props.info} package
          </Typography>
          <Divider />
          <Link to="/employer/payment/standard">
            <Button className={classes.switchButton}>Change Package</Button>
          </Link>
          <Link to="/employer/payment/premium">
            <Button className={classes.dangerButton}>
              Unsubscribe from Service
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Next Payment: {expiryDate}</Typography>
          <Divider />
          <Link to="/employer/payment/premium">
            <Button className={classes.button}>Continue to Payment</Button>
          </Link>
        </Grid>
      </Grid>
    </FloatCard>
  );
}
