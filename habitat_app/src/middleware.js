import {
    LOGIN,
    LOGOUT,
    REGISTER
} from './constants';

export const localStorageMiddleware = store => next => action => {
    if (action.type === REGISTER || action.type === LOGIN) {
    // if (action.type === LOGIN) {
      if (!action.error) {
        localStorage.setItem('refresh_token', action.payload.refresh);
        localStorage.setItem('access_token', action.payload.access)
        // window.localStorage.setItem('jwt', action.payload.user.token);
      }
    } else if (action.type === LOGOUT) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // window.localStorage.setItem('jwt', '');
    }  
    next(action);
};