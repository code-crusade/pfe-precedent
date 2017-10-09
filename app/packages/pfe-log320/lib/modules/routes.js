import { addRoute } from 'meteor/vulcan:core';

import ExercicesList from '../components/exercices/ExercicesList.jsx';

addRoute({ name: 'exercices', path: '/', component: ExercicesList });
