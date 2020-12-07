import {
    ASYNC_START_USER,
    LOGIN,
    LOGIN_FAILED,
    LOGOUT,
    LOGOUT_FAILED,
    REGISTER,
    REGISTRATION_FAIL,
} from '../constants';
import axiosInstance from "../AxiosApi";

export const setLoginUser = (email, password) => (dispatch) => {
    dispatch({ type: ASYNC_START_USER });
    axiosInstance.post('/api/token/obtain/', {
        email: email,
        password: password
    })
    .then(response => {
        dispatch({ type: LOGIN, payload: response.data })
    })
    .catch(error => {
        dispatch({ type: LOGIN_FAILED, payload: error})
    })
}

export const startRegistration = (email, password) => (dispatch) => {
    dispatch({ type: ASYNC_START_USER });
    axiosInstance.post('/api/user/create/', {
        email: email,
        password: password
    })
    .then(response => {
        axiosInstance.post('/api/token/obtain/', {
            email: email,
            password: password
        })
        .then(res => {
            dispatch({ type: REGISTER, payload: res.data })
        })
        .catch(error => {
            dispatch({ type: LOGIN_FAIL, payload: error})
        })
    })
    .catch(error => {
        dispatch({ 
            type: REGISTRATION_FAIL, 
            errorEmail: Object.keys(error.response.data)[0] === 'email' ? true : false, 
            errorPassword: Object.keys(error.response.data)[0] === 'password' ? true : false,
        })
    })
}

export const startLogoutUser = () => (dispatch) => {
    dispatch({ type: ASYNC_START_USER });
    axiosInstance.post('/api/blacklist/', {
        "refresh_token": localStorage.getItem("refresh_token")
    })
    .then(response => {
        dispatch({ type: LOGOUT, payload: response.data })
    })
    .catch(error => {
        dispatch({ type: LOGOUT_FAILED, payload: "Logout failed" })
    })
}