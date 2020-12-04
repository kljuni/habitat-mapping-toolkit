import {
    ASYNC_START,
    CREATE_PLOT,
    CREATE_PLOT_FAIL
} from '../constants';
import axiosInstance from "../AxiosApi";

export const setCreatePlot = (name, desc, type, url) => (dispatch) => {
    dispatch({ type: ASYNC_START });
    if (localStorage.getItem('geojson') === null) {
        dispatch({ type: CREATE_PLOT_FAIL, payload: 'Please provide new polygon data'})
        return;
    }
    axiosInstance.post(`/api/plots/plots/`, {
        title: name[0].toUpperCase() + name.slice(1),
        info: localStorage.getItem('geojson'),
        description: desc,
        habitat_type: type,
        imageURL: url
    })
    .then(response => {
        console.log(response.data)
        console.log(response.status >= 200 && response.status <= 299)
        localStorage.removeItem('geojson')
        dispatch({ type: CREATE_PLOT, payload: response.data })
    })
    .catch(error => {
        dispatch({ type: CREATE_PLOT_FAIL, payload: error})
    })
}