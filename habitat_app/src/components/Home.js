import React, { useEffect, useState } from 'react';
import {check} from './Util';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { isMobile } from "react-device-detect";
import { makeStyles } from '@material-ui/core/styles';
 
const useStyles = makeStyles(() => ({
    paper: {
        textAlign: 'left',
        marginTop: isMobile ? '22vh' : '30vh',
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
                            {check} Download data
                            </Typography>
                            <Typography className={classes.myButtonClass} variant="overline" display="block">
                            {check} Search the database
                            </Typography>                            
                            </Grid>
                        </Grid>            
                    </Grow>
                </div>
            </div>
    )
}

export default Home;