import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axiosInstance from "../AxiosApi";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import {isMobile} from "react-device-detect";
import Link from "react-router-dom/Link";
import { useHistory } from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { setLoginUser } from '../Auth/actions';
import CircularProgress from '@material-ui/core/CircularProgress';

const mapStateToProps = state => {
    return {
        currentUser: state.loginUser.currentUser,
        error: state.loginUser.error ? "Wrong user credentials" : null,
        loading: state.loginUser.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (email, password) => dispatch(setLoginUser(email, password)),
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
    },
}));

const Login = ({ currentUser, error, loading, handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const classes = useStyles();
    
    useEffect(() => {
        if (Boolean(currentUser)) {
            axiosInstance.defaults.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
            history.push("/");
        }
    }, [currentUser, error])

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleLogin(email, password);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Grid
                container                
                style={{ minHeight: '80vh' }}
            >
                <Grid
                    container item
                    alignItems="center"
                    direction="column"
                    style={isMobile ? { paddingTop: '2rem' } : { paddingTop: '4rem' } }
                >
                    <div/>
                    <ReactCSSTransitionGroup
                                transitionName="example"
                                transitionEnterTimeout={400}
                                transitionLeaveTimeout={300}>
                                {error ? <Alert severity="error">{error}</Alert> : null}
                    </ReactCSSTransitionGroup> 
                    {/* {error ? <Alert severity="warning">{error}</Alert> : null} */}
                    <div style={{ display:'flex', flexDirection:'column', maxWidth: 400, minWidth: 300 }}>
                            <TextField
                                required
                                margin="normal"
                                id="outlined-required"
                                label="Email"
                                variant="outlined"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div style={{ height: 20 }}/>
                            <Button type="submit" variant="contained" color="primary">Log in</Button>
                            <div style={{ height: 10 }}/>
                            <Button component={ Link } to="/register/" color="secondary">Interested in contributing?</Button>                       
                            {loading ? <div className={classes.root}><CircularProgress /></div> : null}
                    </div>
                    <div/>
                </Grid>
            </Grid>
        </form>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);