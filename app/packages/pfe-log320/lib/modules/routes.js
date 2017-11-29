import { addRoute } from 'meteor/vulcan:core';
import ExerciceFilterAndList from '../components/exercices/ExerciceFilterAndList.jsx';
import Ide from '../components/ide/Ide.jsx';
import '../components/layout/MainLayout.jsx';

addRoute({ name: 'exercices', path: '/', component: ExerciceFilterAndList });
addRoute({ name: 'ide', path: '/ide', component: Ide });
