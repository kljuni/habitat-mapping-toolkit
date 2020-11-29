import {
    ASYNC_START,
    SEARCH_FILTER_PLOT,
    SEARCH_FILTER_FAIL
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