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
    console.log(state.loginUser.error)
    return {
        currentUser: state.loginUser.currentUser,
        // error: state.loginUser.error ? (state.loginUser.error.email ? "Wrong user email credentials" : (state.loginUser.error.password ? "Pass???" : null)) : null,
        errorEmail: state.loginUser.errorEmail,
        // errorEmail: state.loginUser.error ? (state.loginUser.error.email ? true : false) : null,
        errorPassword: state.loginUser.errorPassword,
        // errorPassword: state.loginUser.error ? (state.loginUser.error.password ? true : false) : null,
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
    // const [errorEmail, setErrorEmail] = useState(false);
    // const [errorPassword, setErrorPassword] = useState(false);
    const history = useHistory();

    useEffect(() => {        
        if (Boolean(currentUser)) {
            axiosInstance.defaults.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
            console.log(localStorage.getItem('access_token'))
            history.push("");
        }
    }, [currentUser, error])

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleRegistration(email, password);
        // try {
        //     const response = await axiosInstance.post('/user/create/', {
        //         email: email,
        //         password: password
        //     });
        //     const data = await axiosInstance.post('/token/obtain/', {
        //         email: email,
        //         password: password
        //     });
        //     axiosInstance.defaults.headers['Authorization'] = "JWT " + data.access;
        //     localStorage.setItem('access_token', data.access);
        //     localStorage.setItem('refresh_token', data.refresh);
        //     history.push("/home");
        //     return response;
        // } catch (error) {
        //     if (error.response.data.email) {
        //         setErrorEmail(error.response.data.email)
        //         setErrorPassword(false)
        //     }
        //     else if (error.response.data.password) {
        //         setErrorPassword(error.response.data.password)
        //         setErrorEmail(false)
        //     }
        // }
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
                                // 'Password must be at least 8 characters long'}
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

    // render() {
    //     return (
    //         <Container>
    //             <Form  onSubmit={this.handleSubmit}>
    //                 <Form.Group controlId="formBasicEmail">
    //                     <Form.Label>Email address</Form.Label>
    //                     <Form.Control name="email" type="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
    //                     <ReactCSSTransitionGroup
    //                             transitionName="example"
    //                             transitionEnterTimeout={400}
    //                             transitionLeaveTimeout={300}>
    //                             {this.state.errors.email ? <p className="alert-danger pb-0 mb-1">{this.state.errors.email}.</p> : null}
    //                     </ReactCSSTransitionGroup>                        
    //                     <Form.Text className="text-muted">
    //                     We'll never share your email with anyone else.
    //                     </Form.Text>
    //                 </Form.Group>
    
    //                 <Form.Group controlId="formBasicPassword">
    //                     <Form.Label>Password</Form.Label>
    //                     <Form.Control name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
    //                     <ReactCSSTransitionGroup
    //                             transitionName="example"
    //                             transitionEnterTimeout={400}
    //                             transitionLeaveTimeout={300}>
    //                             {this.state.errors.password ? <p className="alert-danger pb-0 mb-1">{this.state.errors.password}.</p> : null}
    //                     </ReactCSSTransitionGroup>
    //                     <Form.Text className="text-muted">
    //                     Your password must be at least 8 characters long.
    //                     </Form.Text>
    //                 </Form.Group>
    //                 <Form.Group controlId="formBasicCheckbox">
    //                     <Form.Check type="checkbox" label="I have read and agree to the Terms" required/>
    //                 </Form.Group>
    //                 <Button variant="primary" type="submit">
    //                     Submit
    //                 </Button>
    //             </Form>
                
    //         </Container>
    //     )
    // }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
