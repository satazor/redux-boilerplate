import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { createHistory } from 'history';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import routes from './app/index';
import config from 'config';

console.info('[bootstrap] App config is', config);

// Create our store
const store = createStore(combineReducers({
    routing: routeReducer,
}));

// Create HTML5 history to be used bellow in the router
const history = createHistory();

// Also make it sync with redux!
syncReduxAndRouter(history, store);

// Render our app!
ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.querySelector('#root')
);
