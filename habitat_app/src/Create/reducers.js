import {
    ASYNC_START,
    CREATE_PLOT,
    CREATE_PLOT_FAIL
} from '../constants';

const initialState = {
    loading: false,
    data_title: null,
    error: null,
    refresh: 0,
}

export const createPlot = (state=initialState, action={}) => {
    switch(action.type) {
        case ASYNC_START:
            return {...state, refresh: state.refresh +1, data_title: false, error: false, loading: true}
        case CREATE_PLOT:
            return {...state, 
                loading: false,
                data_title: action.payload.title
            }
        case CREATE_PLOT_FAIL:
            return {...state, 
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}