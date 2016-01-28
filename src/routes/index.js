import homeRoute from './home';

export default [
    // Index route makes part of the main app file
    {
        indexRoute: true,
        ...homeRoute,
    },
    // The rest of the routes are lazy loaded
    {
        path: '/todos',
        getComponent(location, callback) {
            require.ensure([], (require) => callback(null, require('./todos').default.component), 'todos');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./todos').default.component), 'todos');
        },
    },
];
