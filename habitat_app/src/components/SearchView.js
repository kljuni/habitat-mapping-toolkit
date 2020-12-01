import React, { useEffect, useState, useCallback, useRef } from 'react'
import axiosInstance from "../AxiosApi";
import SearchMap from "./SearchMap";
import Filter from "./Filter";
import PlotTable from "./PlotTable";
import { habitat_types, regije_list } from './Util';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { setPlotSearch } from '../Search/actions';

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

    const panTo = useCallback(({ lat, lng, zoom }) => {
        console.log('panin')
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
      <div>
            <SearchMap 
            markers={markers}
            loading={loading}
            mapRef={mapRef}
            ></SearchMap>
            <form onSubmit={(e) => handleSubmit(e)} noValidate autoComplete="off">
                <Filter setFilter={setHType} data={habitat_types} title="Filter by habitat type" ></Filter>
                <Filter setFilter={setRegija} data={regije_list} title="Filter by region" ></Filter>
                <TextField onChange={(e) => handleSearchString(e.target.value)} id="standard-basic" label="Standard" />
                <div>
                    <Button className="my-2" type="submit" variant="contained" color="primary">Filter Plots</Button>
                </div>
            </form>
            {
                loading ? <CircularProgress /> : (markers.length === 0 ? null : 
                <PlotTable 
                    markers={markers} 
                    mapRef={mapRef}
                    panTo={panTo}
                />)
            }
      </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);