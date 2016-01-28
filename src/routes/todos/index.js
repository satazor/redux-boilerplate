import { addReducers } from 'core/state/store';
import Todos from './containers/Todos';
import reducers from './state/reducers';

addReducers(reducers);

export default {
    component: Todos,
    childRoutes: [],
};
