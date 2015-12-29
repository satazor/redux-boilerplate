const routes = {
    indexRoute: true,
    getComponent(location, callback) {
        require.ensure([], (require) => {
            // TODO: replace reducers here
            callback(null, require('./components/Home').default);
        }, 'home');
    },
};

export default routes;
