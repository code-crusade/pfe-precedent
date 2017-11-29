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
  router: PropTypes.object,
};

const ExercicesNewForm = ({ currentUser, router }) => (
  <div>
    {Exercices.options.mutations.new.check(currentUser) ? (
      <div
        style={{
          margin: '1.5em',
          paddingBottom: '1.5em',
          borderBottom: '1px solid #ccc',
        }}
      >
        <h4>Ajouter un nouvel exercice</h4>
        <Components.SmartForm
          collection={Exercices}
          mutationFragment={getFragment('ExercicesItemFragment')}
          successCallback={() => {
            alert('Exercice ajouté');
            router.push('');
          }}
        />
      </div>
    ) : null}
  </div>
);

ExercicesNewForm.propTypes = propTypes;

export default withCurrentUser(ExercicesNewForm);
