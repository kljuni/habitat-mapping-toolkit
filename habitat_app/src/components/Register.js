import React, { useState, useEffect } from 'react';
import axiosInstance from "../AxiosApi";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {isMobile} from "react-device-detect";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { startRegistration } from '../Auth/actions';

const mapStateToProps = state => {
    return {
        currentUser: state.loginUser.currentUser,
        errorEmail: state.loginUser.errorEmail,
        errorPassword: state.loginUser.errorPassword,
        loading: state.loginUser.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleRegistration: (email, password) => dispatch(startRegistration(email, password)),
    }
}

const Register = ({ currentUser, error, loading, errorEmail, errorPassword, handleRegistration }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {        
        if (Boolean(currentUser)) {
            axiosInstance.defaults.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
            history.push("");
        }
    }, [currentUser, error])

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleRegistration(email, password);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} >
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
                    <div style={{ display:'flex', flexDirection:'column', maxWidth: 400, minWidth: 300 }}>
                        <Grid container justify="center">
    
                        </Grid>
                        <TextField
                            error={Boolean(errorEmail)}
                            required
                            margin="normal"
                            id="outlined-required"
                            label="Email"
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                            helperText={errorEmail ? 'Email taken' : null}
                        />
                        <TextField
                            error={Boolean(errorPassword)}
                            margin="normal"
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                            helperText='Password must be at least 8 characters long'
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                required
                                color="primary"
                                />
                            }
                            label="I have read and agree to the Terms"
                        />
                        <div style={{ height: 20 }}/>
                        <Button type="submit" variant="contained" color="primary">Register account</Button>
                    </div>
                    <div/>
                </Grid>
            </Grid>
        </form>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
