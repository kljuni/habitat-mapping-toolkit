import {
    ASYNC_START,
    SEARCH_FILTER_PLOT,
    SEARCH_FILTER_FAIL
} from '../constants';
import axiosInstance from "../AxiosApi";

export const setPlotSearch = (hType, regija, searchString) => (dispatch) => {
    dispatch({ type: ASYNC_START });
    axiosInstance.get(`/plots/api/search/filter/${String(hType)}/${String(regija)}/${String(searchString)}/`)
    .then(response => {
        dispatch({ type: SEARCH_FILTER_PLOT, payload: response.data })
    })
    .catch(error => {
        dispatch({ type: SEARCH_FILTER_FAIL, payload: error})
    })
}