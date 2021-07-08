import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import "./styles/Custom.css";
import logo from "./images/logo.jpg";
import { Button, Link } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import BusinessRoundedIcon from "@material-ui/icons/BusinessRounded";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import ThumbsUpDownRoundedIcon from "@material-ui/icons/ThumbsUpDownRounded";
import NavMenu from "./NavMenu";
import Backdrop from '@material-ui/core/Backdrop';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

const jwt = require("jsonwebtoken");
const token = sessionStorage.getItem("userToken");
const header = jwt.decode(token, { complete: true });

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 100,
    borderRadius: 12,
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
  },
  content: {
    padding: 10,
    justifyContent: "center",
  },
  grow: {
    flexGrow: 1,
    background: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,

    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: fade(theme.palette.tuftsBlueHover, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.tuftsBlue,
  },
  inputRoot: {
    color: theme.palette.tuftsBlue,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  mobileSideMenuItems: {
    marginTop: 24,
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  logo: {
    height: 40,
    marginRight: 40,
  },
  signIn: {
    backgroundColor: theme.palette.white,
    color: theme.palette.tuftsBlue,
    marginLeft: 20,
    border: "2px solid" + theme.palette.tuftsBlue,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  signInMobile: {
    backgroundColor: theme.palette.white,
    color: theme.palette.tuftsBlue,
    marginLeft: 20,
    marginRight: 20,
    border: "2px solid" + theme.palette.tuftsBlue,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  getHired: {
    backgroundColor: theme.palette.pinkyRed,
    color: theme.palette.white,
    marginLeft: 20,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.mediumTurquoise,
      color: "white",
    },
  },
  startHiring: {
    height: 40,
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    marginLeft: 20,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  menu: { marginTop: 50 },
  mobileMenu: {
    marginTop: 50,

    '& .MuiMenu-paper': {
      minWidth: "70%",
      padding: 16,
      borderRadius: 12,
      boxShadow: 'rgba(83, 144, 217, 0.6) 0px 4px 12px',

    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  logoutIcon: {
    marginRight: 10
  }
}));

export default function Topbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const loadMyAccount = () => {
    window.location = "/account/" + header.payload.userId;
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={loadMyAccount}>My account</MenuItem>
    </Menu>
  );


  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Backdrop className={classes.backdrop} open={isMobileMenuOpen} onClick={handleMobileMenuClose}>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        className={classes.mobileMenu}
      >
        {!token && (
          <div>
            <Button
              onClick={() => {
                window.location = "/startHiring";
              }}
              className={classes.startHiring}
            >
              Start Hiring
            </Button>
            <Button
              onClick={() => {
                window.location = "/signin";
              }}
              className={classes.signInMobile}
            >
              Sign In
            </Button>
          </div>
        )}
        {token && (
          <div className={classes.sectionMobile}>
            {" "}

            <MenuItem>
              <IconButton aria-label="show 11 new notifications" color="inherit">
                <Badge badgeContent={11} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </MenuItem>{" "}
          </div>
        )}
        <div className={classes.mobileSideMenuItems}>
          <NavMenu user={props.user} />
        </div>
        {token && (
          <Button
            onClick={() => {
              localStorage.clear("userToken");
              sessionStorage.clear("userToken");
              window.location = "/signin";
            }}
            className={classes.startHiring}
          >
            <ExitToAppRoundedIcon className={classes.logoutIcon} />Log Out
          </Button>
        )}
      </Menu>
    </Backdrop>
  );
  const preventDefault = (event) => event.preventDefault();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.grow}>
          <AppBar position="sticky">
            <Toolbar>
              <img src={logo} className={classes.logo} />

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                {token && (
                  <div>
                    <IconButton aria-label="show 4 new mails" color="primary">
                      <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      aria-label="show 17 new notifications"
                      color="primary"
                    >
                      <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="primary"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Button
                      onClick={() => {
                        localStorage.clear("userToken");
                        sessionStorage.clear("userToken");
                        window.location = "/signin";
                      }}
                      className={classes.startHiring}
                    >
                      <ExitToAppRoundedIcon className={classes.logoutIcon} />Log Out
                    </Button>
                  </div>
                )}
                {!token && (
                  <div>
                    <Button
                      onClick={() => {
                        window.location = "/startHiring";
                      }}
                      className={classes.startHiring}
                    >
                      Start Hiring
                    </Button>
                    <Button
                      onClick={() => {
                        window.location = "/signin";
                      }}
                      className={classes.signIn}
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MenuRoundedIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
      </CardContent>
    </Card>
  );
}
