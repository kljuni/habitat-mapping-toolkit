import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

export const MobileNav = ({ classes, handleMenu, handleClose, anchorEl, open, logged_in, handleMenuClick, handleLogout }) => {
    const [auth, setAuth] = useState(Boolean(logged_in));
    const history = useHistory();

    useEffect(() => {
        setAuth(Boolean(logged_in));
        if (!logged_in) {
            history.push("/");
        }
    }, [logged_in])

    return(
        <div>
            <div>
                <IconButton 
                    edge="start"
                    className={classes.menuButton} 
                    color="inherit" 
                    aria-label="menu"
                    onClick={handleMenu}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                {/* Display different menu based if user is authenticated or not */}
                { auth ?
                <div>
                    <MenuItem onClick={() => handleMenuClick('/search')}>Search habitats</MenuItem>
                    <MenuItem onClick={() => handleMenuClick('/create')}>Create new data</MenuItem>
                    <MenuItem onClick={() => {handleMenuClick('/logout');handleLogout()}}>Log out</MenuItem>
                </div>
                :
                <div>
                    <MenuItem onClick={() => handleMenuClick('/search')}>Search habitats</MenuItem>
                    <MenuItem onClick={() => handleMenuClick('/login')}>Log in</MenuItem>
                    <MenuItem onClick={() => handleMenuClick('/register')}>Register</MenuItem>
                </div>
                }
                </Menu>
            </div>
        </div>
    )
}
