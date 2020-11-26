import { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Logout from "./Logout";
import axiosInstance from "../AxiosApi";
import { useDispatch } from 'react-redux';
import { startLogoutUser } from '../Auth/actions';

export const DeskNav = ({ classes, handleMenu, handleClose, anchorEl, open, logged_in, history }) => {
    const [auth, setAuth] = useState(Boolean(logged_in));
    const dispatch = useDispatch();

    useEffect(() => {
        setAuth(Boolean(logged_in));
    }, [logged_in])

    const handleLogout = () => {
        dispatch(startLogoutUser());
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        history.go(0)
        return null;
    }

    return(
        <div>
                { auth ?
                <span>
                    <Button onClick={() => history.push('/search/')} color="inherit">Search habitats</Button>
                    <Button onClick={() => history.push('/create/')} color="inherit">Create new data</Button>
                    <Button onClick={() => history.push('/account/')} color="inherit">My account</Button>
                    <Button onClick={() => handleLogout()} color="inherit">Log out</Button>
                </span>
                :
                <span>
                    <Button onClick={() => history.push('/search/')} color="inherit">Search habitats</Button>
                    <Button onClick={() => history.push('/login/')} color="inherit">Log in</Button>
                    <Button onClick={() => history.push('/register/')} color="inherit">Register</Button>
                </span>
                }
        </div>
    )
}