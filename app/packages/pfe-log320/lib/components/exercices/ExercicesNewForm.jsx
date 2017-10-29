/**
 * A component to configure the "new exercice" form.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Components,
  registerComponent,
  withCurrentUser,
  getFragment,
} from 'meteor/vulcan:core';

import Exercices from '../../modules/exercices/collection.js';

const propTypes = {
  currentUser: PropTypes.object,
};

const ExercicesNewForm = ({ currentUser }) => (
  <div>
    {Exercices.options.mutations.new.check(currentUser) ? (
      <div
        style={{
          marginBottom: '20px',
          paddingBottom: '20px',
          borderBottom: '1px solid #ccc',
        }}
      >
        <h4>Ajouter un nouvel exercice</h4>
        <Components.SmartForm
          collection={Exercices}
          mutationFragment={getFragment('ExercicesItemFragment')}
        />
      </div>
    ) : null}
  </div>
);

ExercicesNewForm.propTypes = propTypes;

export default withCurrentUser(ExercicesNewForm);
