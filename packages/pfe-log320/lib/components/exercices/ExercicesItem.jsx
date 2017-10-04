/**
 * An item in the exercices list.
 * Wrapped with the "withCurrentUser" container.
 */

import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import Exercices from '../../modules/exercices/collection.js';
import ExercicesEditForm from './ExercicesEditForm.jsx';

const ExerciceItem = ({ exercice, currentUser }) => (
  <div
    style={{
      paddingBottom: '15px',
      marginBottom: '15px',
      borderBottom: '1px solid #ccc',
    }}
  >
    <h4>{exercice.name}</h4>
    <p>Description: {exercice.description}</p>
    <p>Language: {exercice.language}</p>
    <p>Exercice: {exercice.exercice}</p>

    {Exercices.options.mutations.edit.check(currentUser, exercice) ? (
      <Components.ModalTrigger label="Modifier Exercice">
        <ExercicesEditForm
          currentUser={currentUser}
          documentId={exercice._id}
        />
      </Components.ModalTrigger>
    ) : null}
  </div>
);

export default ExerciceItem;
