import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { loginUser } from './Auth/reducers';
import { createPlot } from './Create/reducers';
import { searchFilterPlots, downloadPlots } from './Search/reducers';
import { localStorageMiddleware } from './middleware';

const logger = createLogger();

const rootReducer = combineReducers({ loginUser, createPlot, searchFilterPlots, downloadPlots })

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger, localStorageMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// module.hot.accept();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
