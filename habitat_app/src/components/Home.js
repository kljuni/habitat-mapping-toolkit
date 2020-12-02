import React, { useEffect, useState } from 'react';
import Grow from '@material-ui/core/Grow';
import { isMobile } from "react-device-detect";
import { makeStyles } from '@material-ui/core/styles';
 
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        right: 0,
        top: isMobile ? '35vh' : '25vh',
        width: isMobile ? '60vw' : '50vw',
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

const Home = () => {
    const height = window.innerHeight - (isMobile ? 56 : 64);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);
    const classes = useStyles();
    return (
            <div id="full" style={{height:height}}>
                <div className="bg-image fg">
                    <Grow in={loaded} timeout={2000}>
                            <div className={classes.paper}>
                                <h2>Welcome to HabMapp</h2>
                                <p>
                                    HabMapp is an online database for storing and sharing data on protected areas.
                                </p>
                            </div>                                                     
                    </Grow>
                </div>
            </div>
    )
}

export default Home;