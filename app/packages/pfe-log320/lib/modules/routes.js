import { addRoute } from 'meteor/vulcan:core';

import ExercicesList from '../components/exercices/ExercicesList.jsx';
import App from '../components/App';

addRoute({ name: 'exercices', path: '/', component: ExercicesList });
addRoute({ name: 'ide', path: '/ide', component: App });
