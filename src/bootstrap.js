import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux';
import { syncReduxAndRouter, routeReducer } from 'react-router-redux';
import config from 'config';
import store, { addReducers } from 'core/state/store';
import Application from './app';
import routes from './routes';

console.info('[bootstrap] App config is', config);

// Setup routing
const history = createHistory();

addReducers({ routing: routeReducer });
syncReduxAndRouter(history, store);

// Build our routes
const appRoutes = {
    path: '/',
    component: Application,
    childRoutes: routes,
};

// Render our app!
ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history } routes={ appRoutes }/>
    </Provider>,
    document.querySelector('#root')
);
