/**
 * An item in the exercices list.
 * Wrapped with the "withCurrentUser" container.
 */

import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import Exercices from '../../modules/exercices/collection.js';
import ExercicesEditForm from './ExercicesEditForm.jsx';

const langValueToLabel = {
  'c#': 'C# Mono 4.8',
  'c++': 'C++ 14',
  'python': 'Python 2.7.6',
  'java': 'Java 1.8'
};

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
    <p>Language: {langValueToLabel[exercice.language]}</p>
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
