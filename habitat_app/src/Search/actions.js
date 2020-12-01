import {
    ASYNC_START,
    SEARCH_FILTER_PLOT,
    SEARCH_FILTER_FAIL
} from '../constants';
import axiosInstance from "../AxiosApi";

export const setPlotSearch = (hType, regija, searchString) => (dispatch) => {
    dispatch({ type: ASYNC_START });
    axiosInstance.get(`/plots/api/search/filter/?hType=${hType}&regija=${regija}&searchString=${searchString}`)
    .then(response => {
        dispatch({ type: SEARCH_FILTER_PLOT, payload: response.data })
    })
    .catch(error => {
        console.log(error)
        dispatch({ type: SEARCH_FILTER_FAIL, payload: error})
    })
}