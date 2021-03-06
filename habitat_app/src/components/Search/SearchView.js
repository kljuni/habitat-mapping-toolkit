import React, { useEffect, useState, useCallback, useRef } from 'react'
import SearchMap from "./SearchMap";
import Filter from "./Filter";
import PlotTable from "./PlotTable";
import { habitat_types, regije_list } from '../Util';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { setPlotSearch } from '../../Search/actions';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    item2: {
        padding: '0 1rem',
    },
    gutterSub: {
        marginTop: '1rem',
        marginBottom: '0.5rem',
        color: '#042e41',
    }
});

const mapStateToProps = state => {
    return {
        markers: state.searchFilterPlots.markers,
        loading: state.searchFilterPlots.loading,
        error: state.searchFilterPlots.error ? "Wrong sth" : null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handlePlotSearch: (hType, regija, searchString) => dispatch(setPlotSearch(hType, regija, searchString)),
    }
}

const SearchView = ({ handlePlotSearch, markers, loading, error }) => {
    const [hType, setHType] = useState(undefined);
    const [regija, setRegija] = useState(undefined);
    const [searchString, setSearchString] = useState(undefined);

    const mapRef = useRef();
    const classes = useStyles();

    const panTo = useCallback(({ lat, lng, zoom }) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(zoom);
    }, [])

    useEffect(() => {
        handlePlotSearch(undefined, undefined, undefined)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        panTo({lat: 45.99745,lng: 15.0523, zoom: 8})
        handlePlotSearch(hType, regija, searchString);
    }

    const handleSearchString = (val) => {
        if (val === '') {val = undefined}
        setSearchString(val);
    }

    return (
        <Grid container>
            <Grid item xs={12} md={8} className={classes.item1}>
                <SearchMap 
                markers={markers}
                loading={loading}
                mapRef={mapRef}
                />
            </Grid>
            <Grid item xs={12} md={4} className={classes.item2}>
                <Typography variant="h6" gutterBottom className={classes.gutterSub}>
                    Filter & Search
                </Typography>
                <form onSubmit={(e) => handleSubmit(e)} noValidate autoComplete="off">
                    <Filter setFilter={setHType} data={habitat_types} title="Filter by habitat type" ></Filter>
                    <Filter setFilter={setRegija} data={regije_list} title="Filter by region" ></Filter>
                    {/* <Typography variant="h6" gutterBottom className={classes.gutterSub}>
                        Search
                    </Typography> */}
                    <TextField 
                        style={{marginTop: '0.5rem'}}
                        fullWidth 
                        onChange={(e) => handleSearchString(e.target.value)} 
                        id="outlined-basic" 
                        variant="outlined" 
                        label="Text Search"
                        helperText='E.g. "travnik"'
                    />
                    <Box my={3}>
                        <Button m={5} type="submit" variant="contained" color="primary">Filter Plots</Button>
                    </Box>
                </form>
                
                {
                    loading ? <CircularProgress /> : (markers.length === 0 ? 
                    <Alert severity="info">No results</Alert>
                    : 
                    <PlotTable 
                        markers={markers} 
                        mapRef={mapRef}
                        panTo={panTo}
                    />)
                }
            </Grid>
        </Grid>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);