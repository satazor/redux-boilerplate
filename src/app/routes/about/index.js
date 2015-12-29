const routes = {
    path: 'about',
    getComponent(location, callback) {
        require.ensure([], (require) => {
            // TODO: replace reducers here
            callback(null, require('./components/About').default);
        }, 'about');
    },
};

export default routes;
