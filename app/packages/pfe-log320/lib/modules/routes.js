import { addRoute } from 'meteor/vulcan:core';

import ExercicesList from '../components/exercices/ExercicesList.jsx';
import Main from '../components/Main.jsx';

addRoute({ name: 'exercices', path: '/', component: ExercicesList });
addRoute({ name: 'ide', path: '/ide', component: Main });
