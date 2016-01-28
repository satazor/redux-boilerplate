import { createStore, combineReducers } from 'redux';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';

const defaultReducer = (state = {}) => state;
const store = createStore(defaultReducer);
let registeredReducers = {};

/**
 * Adds an object of reducers.
 *
 * @param {Object}  reducers     The reducers object, similar to what you would pass to combineReducers
 * @param {Boolean} [apply=true] False to not apply the combined reducer to the store
 */
export function addReducers(reducers, apply) {
    registeredReducers = { ...registeredReducers, ...reducers };
    (apply || apply == null) && applyReducers();
}

/**
 * Removes reducers.
 *
 * @param {Array}   reducers     The reducers names to remove.
 * @param {Boolean} [apply=true] False to not apply the combined reducer to the store
 */
export function removeReducers(reducers, apply) {
    registeredReducers = omit(registeredReducers, reducers);
    (apply || apply == null) && applyReducers();
}

/**
 * Applies the combined reducers to the store.
 */
export function applyReducers() {
    if (isEmpty(registeredReducers)) {
        store.replaceReducer(defaultReducer);
    } else {
        store.replaceReducer(combineReducers(registeredReducers));
    }
}

export default store;
