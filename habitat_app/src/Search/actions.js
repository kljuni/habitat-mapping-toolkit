import {
    ASYNC_START,
    SEARCH_FILTER_PLOT,
    SEARCH_FILTER_FAIL,
    DWLD_START,
    DOWNLOAD_PLOT,
    DOWNLOAD_PLOT_FAIL
} from '../constants';
import axios from 'axios'
import axiosInstance from "../AxiosApi";

export const setPlotSearch = (hType, regija, searchString) => (dispatch) => {
    dispatch({ type: ASYNC_START });
    axiosInstance.get(`/api/plots/search/filter/`, {params: {
        hType: hType ? hType : 'undefined',
        regija: regija ? regija : 'undefined',
        searchString: searchString ? searchString : 'undefined'
    }})
    .then(response => {
        dispatch({ type: SEARCH_FILTER_PLOT, payload: response.data })
    })
    .catch(error => {
        dispatch({ type: SEARCH_FILTER_FAIL, payload: error})
    })
}

export const setDownloadPlot = (id, title) => (dispatch) => {
    dispatch({ type: DWLD_START });
    console.log(id)
    axiosInstance.get(`/api/plots/${id}/`)
    .then(response => {
        const json = response.data.info        
        const json_forUpload = json.replace(/'/g, '"');
        console.log(json_forUpload)
        console.log('----------------------------------------------------')
        const outputName = `${response.data.title}.zip`
        let config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            responseType: 'arraybuffer',
        }
        const bodyFormData = new FormData();
        bodyFormData.append('json', json_forUpload);
        bodyFormData.append('outputName', outputName);
        axios.post(`https://ogre.adc4gis.com/convertJson`, bodyFormData, config)
        // axios.post(`http://ogre.adc4gis.com/convertJson`, {
        //     json: json_forUpload,
        //     outputName: outputName
        // }, config)
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     url: `http://ogre.adc4gis.com/convertJson`, 
        //     data: {
        //         json: json_forUpload,
        //         outputName: outputName
        // }})
        // axios({
        //     method: 'post',
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     url: `http://ogre.adc4gis.com/convertJson`, 
        //     data: {
        //         json: json_forUpload,
        //         outputName: outputName
        // }})
        .then(res => {
            let blob = new Blob([res.data], { type: 'application/zip' })
            const downloadUrl = URL.createObjectURL(blob)
            let a = document.createElement("a"); 
            a.href = downloadUrl;
            a.download = title;
            document.body.appendChild(a);
            a.click();
            dispatch({ type: DOWNLOAD_PLOT, payload: res.data })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(error => {
        dispatch({ type: DOWNLOAD_PLOT_FAIL, payload: 'Data available only to registered users'})
    })
}