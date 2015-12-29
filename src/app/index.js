import Application from './components/Application';
import homeRoutes from './routes/home';
import aboutRoutes from './routes/about';

const routes = {
    path: '/',
    component: Application,
    childRoutes: [
        homeRoutes,
        aboutRoutes,
    ],
};

export default routes;
