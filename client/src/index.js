import 'materialize-css/dist/css/materialize.min.css'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers'

const store = createStore(
  reducers, // all the reducer that we have in our application
  {}, // initial state of our application
  applyMiddleware(reduxThunk) //all the middlewares that we have for redux
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
