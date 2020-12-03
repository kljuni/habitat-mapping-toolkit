import React, { useEffect, useState } from 'react';
import {check} from './Util';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { isMobile } from "react-device-detect";
import { makeStyles } from '@material-ui/core/styles';
 
const useStyles = makeStyles((theme) => ({
    paper: {
        // position: 'absolute',
        // right: isMobile ? 0 : '10vw',
        // top: isMobile ? '35vh' : '25vh',
        // width: isMobile ? '60vw' : '25rem',
        // padding: theme.spacing(2),
        textAlign: 'left',
        marginTop: isMobile ? '22vh' : '30vh',
        // marginRight: 50,
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
                        <Grid container className={classes.paper} spacing={0}>
                            <Grid item xs={6}>

                            </Grid>
                            <Grid item xs={6}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Welcome to HabMapp
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                HabMapp is an online database for storing and sharing spatial data on protected areas.
                                Making citizen science straightforward.
                            </Typography>
                            <Box className={classes.myButtonClass} >
                                <Typography variant="overline" display="block">
                                {check} Create new plots
                                </Typography>
                            </Box>
                            <Typography className={classes.myButtonClass} variant="overline" display="block">
                            {check} Contribute data
                            </Typography>
                            <Typography className={classes.myButtonClass} variant="overline" display="block">
                            {check} Search the database
                            </Typography>
                            {/* <p>{check} Create new plots</p>                   
                            <p>{check} Contribute data</p>                   
                            <p>{check} Search the database</p>       */}
                            </Grid>
                        </Grid>
                            
                            {/* <div className={classes.paper}>
                                <h2>Welcome to HabMapp</h2>
                                <p>
                                    HabMapp is an online database for storing and sharing data on protected areas.
                                    Making citizen science straightforward.
                                </p>
                            </div>                                                      */}
                    </Grow>
                </div>
            </div>
    )
}

export default Home;