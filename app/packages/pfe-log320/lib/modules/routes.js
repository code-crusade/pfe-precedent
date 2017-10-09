import { addRoute } from 'meteor/vulcan:core';

import App from '../components/App';

addRoute({ name: 'exercices', path: '/', component: App });
