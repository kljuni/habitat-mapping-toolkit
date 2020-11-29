import {
    ASYNC_START,
    CREATE_PLOT,
    CREATE_PLOT_FAIL
} from '../constants';

const initialState = {
    loading: false,
    data_title: null,
    error: null,
}

export const createPlot = (state=initialState, action={}) => {
    switch(action.type) {
        case ASYNC_START:
            return {...state, data_title: null, loading: true}
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