import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

export const DeskNav = ({ logged_in, history, handleLogout }) => {
    const [auth, setAuth] = useState(Boolean(logged_in));

    useEffect(() => {
        setAuth(Boolean(logged_in));
        if (!logged_in) {
            history.push("/");
        }
    }, [logged_in])

    return(
        <div>
                { auth ?
                <span>
                    <Button onClick={() => history.push('/search/')} color="inherit">Search habitats</Button>
                    <Button onClick={() => history.push('/create/')} color="inherit">Create new data</Button>
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