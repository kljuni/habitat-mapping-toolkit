import React from 'react';
import axiosInstance from "../AxiosApi";
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import { startLogoutUser } from '../Auth/actions';
import { useHistory } from "react-router-dom";

const Logout = ({ handleMenuClick }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        // try {
            // const response = await axiosInstance.post('/blacklist/', {
            //     "refresh_token": localStorage.getItem("refresh_token")
            // });
            dispatch(startLogoutUser());
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            history.go(0)
            return null;
        // }
    //     catch (e) {
    //         console.log(e);
    // }
    }

    return (
        <MenuItem onClick={() => {handleLogout()}}>Log out</MenuItem>
        // <span onClick={handleLogout}>Log out</span>
    )
};

export default Logout;