// test-utils.js
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { loginUser } from './Auth/reducers';
import { createPlot } from './Create/reducers';
import { searchFilterPlots, downloadPlots } from './Search/reducers';

const rootReducer = combineReducers({ loginUser, createPlot, searchFilterPlots, downloadPlots })

function render(
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }