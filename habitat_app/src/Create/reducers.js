import {
    ASYNC_START_CREATE,
    CREATE_PLOT,
    CREATE_PLOT_FAIL,
    CREATE_DEFAULTS
} from '../constants';

const initialState = {
    loading: false,
    data_title: null,
    data_created: false,
    error: null,
    refresh: 0,
}

export const createPlot = (state=initialState, action={}) => {
    switch(action.type) {
        case ASYNC_START_CREATE:
            return {...state, data_created: false, error: false, loading: true}
        case CREATE_PLOT:
            return {...state, 
                refresh: state.refresh + 1,
                loading: false,
                data_created: true,
                data_title: action.payload.title
            }
        case CREATE_PLOT_FAIL:
            return {...state, 
                refresh: state.refresh + 1,
                data_created: false,
                loading: false,
                error: action.payload
            }
        case CREATE_DEFAULTS:
            return {...state, data_created: false, error: false, loading: false}
        default:
            return state;
    }
}