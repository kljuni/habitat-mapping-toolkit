import React, { useEffect, useState, useCallback } from 'react'
import axiosInstance from "../AxiosApi";
import SearchMap from "./SearchMap";
import Filter from "./Filter";
import PlotList from "./PlotList";
import { habitat_types, regije_list } from './Util';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    const [hType, setHType] = useState(null);
    const [regija, setRegija] = useState(null);
    const [searchString, setSearchString] = useState(null);

    console.log(regija)
    console.log(hType)

    useEffect(() => {
        handlePlotSearch(null, null, null)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePlotSearch(hType, regija, searchString);
    }

    return (
      <div>
            <SearchMap 
            markers={markers}
            loading={loading}
            
            ></SearchMap>
            <form onSubmit={(e) => handleSubmit(e)} noValidate autoComplete="off">
                <Filter setFilter={setHType} data={habitat_types} title="Filter by habitat type" ></Filter>
                <Filter setFilter={setRegija} data={regije_list} title="Filter by region" ></Filter>
                <TextField onChange={(e) => setSearchString(e.target.value)} id="standard-basic" label="Standard" />
                <div><Button className="my-2" type="submit" variant="contained" color="primary">Filter Plots</Button></div>
            </form>
            <PlotList></PlotList>
      </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);