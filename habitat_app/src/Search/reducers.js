import {
    ASYNC_START,
    SEARCH_FILTER_PLOT,
    SEARCH_FILTER_FAIL,
    DWLD_START,
    DOWNLOAD_PLOT,
    DOWNLOAD_PLOT_FAIL
} from '../constants';

const initialState = {
    loading: false,
    markers: [],
    error: null,
}

export const searchFilterPlots = (state=initialState, action={}) => {
    switch(action.type) {
        case ASYNC_START:
            return {...state, loading: true}
        case SEARCH_FILTER_PLOT:
            return {...state, 
                loading: false,
                markers: action.payload
            }
        case SEARCH_FILTER_FAIL:
            return {...state, 
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

const initialStateDL = {
    loading: false,
    data: null,
    error: null,
}

export const downloadPlots = (state=initialStateDL, action={}) => {
    switch(action.type) {
        case DWLD_START:
            return {...state, loading: true, error: null}
        case DOWNLOAD_PLOT:
            return {...state, 
                loading: false,
                data: action.payload
            }
        case DOWNLOAD_PLOT_FAIL:
            return {...state, 
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}