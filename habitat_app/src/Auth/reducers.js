import {
    ASYNC_START,
    LOGIN,
    LOGIN_FAILED,
    LOGOUT,
    REGISTER,
    REGISTRATION_FAIL,
} from '../constants';

const initialState = {
    loading: false,
    currentUser: null,
    logged_in: localStorage.getItem('refresh_token') ? true : false,
    error: null,
    errorEmail: false,
    errorPassword: false,
}

export const loginUser = (state=initialState, action={}) => {
    switch(action.type) {
        case ASYNC_START:
            return {...state, loading: true}
        case LOGIN:
        case REGISTER:
            return {...state, 
                loading: false, 
                currentUser: action.payload.email,
                logged_in: true,
                errorEmail: false,
                errorPassword: false,
                error: null,
            }
        case LOGIN_FAILED:
            return {...state,
                loading: false,
                error: action.payload
        }
        case REGISTRATION_FAIL:
            return {...state,
                loading: false,
                errorEmail: action.errorEmail,
                errorPassword: action.errorPassword,
        }
        case LOGOUT:
            return {...state,
                currentUser: null,
                logged_in: false,
                error: null
                // refreshToken: action.payload.refresh,
                // accessToken: action.payload.access
            }
        default:
            return state;
    }
}