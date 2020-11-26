import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";
import { MobileNav } from './MobileNav';
import { DeskNav } from './DeskNav';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    return{
        logged_in: state.loginUser.logged_in,
    }
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ logged_in, history }) => {
  const classes = useStyles();  
  const [anchorEl, setAnchorEl] = useState(null);
//   const [auth, setAuth] = useState(Boolean(currentUser));
  const open = Boolean(anchorEl);

  

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            HabMAP Toolkit
                <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" className="bi bi-map-fill ml-2 mb-1" fill="#ab6946" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.502.502 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5V.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.498.498 0 0 0-.196 0L5 14.09zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1-.5-.1z"/>
                </svg>
          </Typography>
          {/* Checks if screen is mobile or not and displays appropriately */}
            {isMobile ? <MobileNav 
                        // auth={auth} 
                        classes={classes} 
                        handleMenu={handleMenu} 
                        handleClose={handleClose} 
                        anchorEl={anchorEl}
                        open={open}
                        logged_in={logged_in}
                        handleMenuClick={handleMenuClick}
                /> : <DeskNav
                        // auth={auth} 
                        classes={classes} 
                        handleMenu={handleMenu} 
                        handleClose={handleClose} 
                        anchorEl={anchorEl}
                        open={open}
                        logged_in={logged_in}
                        history={history}   
            />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const navbarWithRouter = withRouter(Navbar);

export default connect(mapStateToProps, null)(navbarWithRouter);