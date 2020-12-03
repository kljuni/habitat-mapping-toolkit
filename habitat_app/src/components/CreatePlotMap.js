import { useCallback, useEffect, useRef, useState } from 'react';
import ReactGeoJSON from './ReactGeoJSON';
import Container from '@material-ui/core/Container';
import CreatePlotForm from './CreatePlotForm';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { makeStyles } from "@material-ui/core/styles";
import { isMobileOnly, isMobile } from 'react-device-detect';

const useStyles = makeStyles({
    item1: {
        height: isMobileOnly ? '80vh' : window.innerWidth < 1280 ? '60vh' :
        (window.innerHeight - 64),
        // padding: '1rem',
        // paddingBottom: isMobile ? 0 : '1rem',
    },
    item2: {
        padding: '0 1rem',
    },
    gutterSub: {
        marginTop: '1rem',
        marginBottom: '0.5rem',
    }
});

const CreatePlotMap = () => {
    
    // When components unmounts set google api to null, so other maps can load afterwards
    useEffect(() => {
        return () => { window.google = null }
    }, [])
    
    const [refresh, doRefresh] = useState(0);
    const classes = useStyles();
    // const mapRef = useRef();
    // const onMapLoad = useCallback((map) => {
    //     mapRef.current = map;
    // }, [])

    const onPlotSave = useCallback(() => {
        doRefresh(refresh => refresh + 1);
    }, [])
    console.log(refresh)

    return (
        <Grid container>
            <Grid item xs={12} lg={8} className={classes.item1}>
                <ReactGeoJSON
                apiKey='AIzaSyChsbUBL7fU-k_fdIJPJUJmt0zvJpIy6U4'
                // onMapInitiated={onMapLoad}
                onPolygonsDrawn={(polygons) => console.log('Available polygons', polygons)}
                scriptLibraries="geometry"
                existingArea={JSON.parse(localStorage.getItem('geojson'))}
                onSave={(data) => localStorage.setItem('geojson', JSON.stringify(data))}
                mapOptions={{
                    tilt: 0, 
                    mapTypeControl:true,
                    mapTypeControlOptions:{
                        mapTypeIds:['roadmap', 'hybrid'],
                    }
                }}
                zoom={8}
                center={{ lat: 46.129282, lng: 14.923680 }}
                />
            </Grid>
            <Grid item xs={12} lg={4} className={classes.item2}>
                <CreatePlotForm onPlotSave={onPlotSave} />
            </Grid>
        </Grid>
    )
};

export default React.memo(CreatePlotMap);
