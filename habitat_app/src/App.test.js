import React from 'react'
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from './test-utils'
import App from './components/App'
import {BrowserRouter} from 'react-router-dom';

it('Renders the connected app with initialState', () => {
  render(<BrowserRouter><App /></BrowserRouter>)
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
})