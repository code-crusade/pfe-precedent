import { addRoute } from 'meteor/vulcan:core';
import ExercicesList from '../components/exercices/ExercicesList.jsx';
import ExercicesNewForm from '../components/exercices/ExercicesNewForm.jsx';
import Ide from '../components/ide/Ide.jsx';
import '../components/layout/MainLayout.jsx';

addRoute({ name: 'exercices', path: '/', component: ExercicesList });
addRoute({
  name: 'newExercice',
  path: '/newExercice',
  component: ExercicesNewForm,
});
addRoute({ name: 'ide', path: '/ide', component: Ide });
