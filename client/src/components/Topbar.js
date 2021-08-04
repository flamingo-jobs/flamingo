import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import "./styles/Custom.css";
import logo from "./images/logo.jpg";
import { Button, Avatar, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NavMenu from "./NavMenu";
import Backdrop from '@material-ui/core/Backdrop';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import NotificationsPopover from "./NotificationPopover";
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import WorkIcon from '@material-ui/icons/Work';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link, useHistory } from 'react-router-dom';
import BACKEND_URL from "../Config";
import axios from "axios";

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
    alignItems: 'center',
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
    marginTop: 60,

    '& .MuiMenu-paper': {
      minWidth: "70%",
      padding: 16,
      borderRadius: 12,
      boxShadow: 'rgba(83, 144, 217, 0.6) 0px 4px 12px',
      [theme.breakpoints.up("xs")]: {
        minWidth: "unset",
      }

    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  logoutIcon: {
    marginRight: 10
  },
  profilepic: {
    borderRadius: 12
  },
  profileMenu: {
    marginTop: 60,
    '& .MuiMenu-paper': {
      padding: 16,
      borderRadius: 12,
      boxShadow: 'rgba(83, 144, 217, 0.6) 0px 4px 12px',

    }
  },
  notificationMenu: {
    marginTop: 60,
    '& .MuiMenu-paper': {
      minWidth: 300,
      padding: 16,
      borderRadius: 12,
      boxShadow: 'rgba(83, 144, 217, 0.6) 0px 4px 12px',

    }
  },
  logOut: {
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    height: 40,
    marginTop: 16,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  menuItem: {
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: theme.spacing(2),
    borderRadius: 12,
    "&:hover": {
      borderRadius: 12,
      backgroundColor: theme.palette.lightSkyBlueHover + '!important',
    },
  },
  menuIcon: {
    display: 'flex',
    color: theme.palette.stateBlue,
    marginRight: theme.spacing(2),
  },
  menuText: {
    color: theme.palette.black,
    fontWeight: 500
  },
  topBarIcon: {
    color: theme.palette.stateBlue,
    marginLeft: 8,
    marginRight: 8
  }
}));

export default function Topbar(props) {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);

  const [favourites, setFavourites] = React.useState(null);
  const [savedJobs, setSavedJobs] = React.useState(null);
  const [appliedJobs, setAppliedJobs] = React.useState(null);
  const [notifications, setNotifications] = React.useState(null);

  const [searchString, setSearchString] = React.useState("");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

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

  const loadBadgeData = () => {
    axios.get(`${BACKEND_URL}/jobseeker/${sessionStorage.getItem("loginId")}`).then(res => {
      if (res.data.success) {
        if (res.data.jobseeker.hasOwnProperty("notifications")) {
          setNotifications(res.data.jobseeker.notifications.length);
        }
        if (res.data.jobseeker.hasOwnProperty("favorites")) {
          setFavourites(res.data.jobseeker.favorites.length);
        }
        if (res.data.jobseeker.hasOwnProperty("savedJobs")) {
          setSavedJobs(res.data.jobseeker.savedJobs.length);
        }
        if (res.data.jobseeker.hasOwnProperty("applicationDetails")) {
          setAppliedJobs(res.data.jobseeker.applicationDetails.length);
        }
      }
    });
  }

  useEffect(() => {
    loadBadgeData();
  }, []);

  const loadProfilePic = () => {
    try {
      if (header.payload.userRole == "employer") {
        return require(`../employer/images/${header.payload.userId}`).default
      } else if (header.payload.userRole == "jobseeker") {
        return require(`../employee/images/${header.payload.userId}`).default
      } else if (header.payload.userRole == "admin") {
        return require(`../admin/images/profilepic.jpg`).default
      }
    } catch (err) {
      return require(`../employee/images/profilePic.jpg`).default
    }
  }

  const profileLink = () => {

  }

  const notificationId = "primary-notification-menu";
  const renderNotification = (
    <Backdrop className={classes.backdrop} open={isNotificationMenuOpen} onClick={handleNotificationClose}>
      <Menu
        anchorEl={notificationAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={notificationId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isNotificationMenuOpen}
        onClose={handleNotificationClose}
        className={classes.notificationMenu}

      >
        <NotificationsPopover loginId={token ? header.payload.loginId : null} userRole={token ? header.payload.userRole : null} />
      </Menu>
    </Backdrop>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Backdrop className={classes.backdrop} open={isMenuOpen} onClick={handleMenuClose}>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        className={classes.profileMenu}

      >
        <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
          <div className={classes.menuIcon}>
            <PersonRoundedIcon />
          </div>
          <Typography className={classes.menuText} >Profile</Typography>
        </MenuItem>

        <MenuItem className={classes.menuItem} >
          <div className={classes.menuIcon}>
            <SettingsRoundedIcon />
          </div>
          <Typography className={classes.menuText} >Settings</Typography>
        </MenuItem>
        <Button
          onClick={() => {
            localStorage.clear("userToken");
            sessionStorage.clear("userToken");
            window.location = "/signin";
          }}
          className={classes.logOut}
        >
          <ExitToAppRoundedIcon className={classes.logoutIcon} />Log Out
        </Button>
      </Menu>
    </Backdrop>
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
            <Link to="/startHiring">
              <Button
                className={classes.startHiring}
              >
                Start Hiring
              </Button>
            </Link>
            <Link to="/signin">
              <Button
                className={classes.signInMobile}
              >
                Sign In
              </Button>
            </Link>
          </div>
        )}
        {token && (
          <div className={classes.sectionMobile}>
            {props.user === "jobseeker" &&
              <>
                <Link to="/jobseeker/savedJobs">
                  <IconButton aria-label="" className={classes.topBarIcon}>
                    <Badge badgeContent={savedJobs} color="secondary">
                      <BookmarksIcon />
                    </Badge>
                  </IconButton>
                </Link>
                <Link to="/jobseeker/favoriteOrganizations">
                  <IconButton aria-label="" className={classes.topBarIcon}>
                    <Badge badgeContent={favourites} color="secondary">
                      <FavoriteIcon />
                    </Badge>
                  </IconButton>
                </Link>

                <Link to="/jobseeker/appliedJobs">
                  <IconButton aria-label="" className={classes.topBarIcon}>
                    <Badge badgeContent={appliedJobs} color="secondary">
                      <WorkRoundedIcon />
                    </Badge>
                  </IconButton>
                </Link>
              </>
            }
            <IconButton aria-label="show 11 new notifications" className={classes.topBarIcon}>
              <Badge badgeContent={notifications} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >

              <Avatar className={classes.profilepic} src={loadProfilePic()} variant="square" />

            </IconButton>
          </div>
        )}
        <div className={classes.mobileSideMenuItems}>
          <NavMenu user={props.user} />
        </div>
      </Menu>
    </Backdrop>
  );
  const preventDefault = (event) => event.preventDefault();

  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchString.length !== 0) {
      // console.log("enter pressed", searchString);
      history.push({
        pathname: '/searchResults',
        searchString: searchString,
      });
    }
  }

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
                  onChange={handleSearchChange}
                  onKeyPress={(e) => handleSearchSubmit(e)}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                {token && (
                  <div>

                    {props.user === "jobseeker" &&
                      <>
                        <Link to="/jobseeker/savedJobs">
                          <IconButton aria-label="" className={classes.topBarIcon}>
                            <Badge badgeContent={savedJobs} color="secondary">
                              <BookmarksIcon />
                            </Badge>
                          </IconButton>
                        </Link>
                        <Link to="/jobseeker/favoriteOrganizations">
                          <IconButton aria-label="" className={classes.topBarIcon}>
                            <Badge badgeContent={favourites} color="secondary">
                              <FavoriteIcon />
                            </Badge>
                          </IconButton>
                        </Link>

                        <Link to="/jobseeker/appliedJobs">
                          <IconButton aria-label="" className={classes.topBarIcon}>
                            <Badge badgeContent={appliedJobs} color="secondary">
                              <WorkRoundedIcon />
                            </Badge>
                          </IconButton>
                        </Link>
                      </>
                    }

                    <IconButton
                      className={classes.topBarIcon}
                      onClick={handleNotificationOpen}
                    >
                      <Badge badgeContent={notifications} color="secondary" >
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
                      <Avatar className={classes.profilepic} src={loadProfilePic()} variant="square" />
                    </IconButton>

                  </div>
                )}
                {!token && (
                  <div>
                    <Link to="/startHiring">
                      <Button
                        className={classes.startHiring}
                      >
                        Start Hiring
                      </Button>
                    </Link>
                    <Link to="/signin">
                      <Button
                        className={classes.signIn}
                      >
                        Sign In
                      </Button>
                    </Link>
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
          {renderNotification}
        </div>
      </CardContent>
    </Card>
  );
}
