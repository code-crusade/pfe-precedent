/**
 * An item in the exercices list.
 * Wrapped with the "withCurrentUser" container.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent } from 'meteor/vulcan:core';
import { Link } from 'react-router';

import Exercices from '../../modules/exercices/collection.js';
import ExercicesEditForm from './ExercicesEditForm.jsx';

const propTypes = {
  exercice: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
};

const defaultProps = {
  currentUser: {},
};

const langValueToIcon = {
  'c#': 'csharp',
  'c++': 'cplusplus',
  'python': 'python',
  'java': 'java',
};

const langValueToLabel = {
  csharp: 'C# Mono 4.8',
  cpp: 'C++ 14',
  python: 'Python 2.7.6',
  java: 'Java 1.8',
};

const diffValueToLabel = {
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile',
  veryHard: 'Très Difficile',
};

const testTypeValueToLabel = {
  practice: 'Pratique',
  validation: 'Validation',
};

const ExerciceItem = ({ exercice, currentUser }) => (
  <div
    style={{
      paddingBottom: '15px',
      marginBottom: '15px',
      borderBottom: '1px solid #ccc',
    }}
  >
    <h2
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {exercice.name}
      <div style={{ display: 'flex' }}>
        <i
          className={`devicon-${langValueToIcon[
            exercice.language
          ]}-plain colored`}
        />
      </div>
    </h2>

    <dl className="row">
      <dt className="col-sm-3">Description:</dt>
      <dd className="col-sm-9">{exercice.description}</dd>

      <dt className="col-sm-3">Language:</dt>
      <dd className="col-sm-9">{langValueToLabel[exercice.language]}</dd>

      <dt className="col-sm-3">Difficulté:</dt>
      <dd className="col-sm-9">{diffValueToLabel[exercice.difficulty]}</dd>

      <dt className="col-sm-3">Type de test:</dt>
      <dd className="col-sm-9">{testTypeValueToLabel[exercice.testType]}</dd>
    </dl>

    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Link
        to={{
          pathname: 'ide',
          state: { exercice },
        }}
      >
        Essayer l'exercice
      </Link>
      {Exercices.options.mutations.edit.check(currentUser, exercice) ? (
        <Components.ModalTrigger component={<Components.Icon name="edit" />}>
          <ExercicesEditForm
            currentUser={currentUser}
            documentId={exercice._id}
          />
        </Components.ModalTrigger>
      ) : null}
    </div>
  </div>
);

ExerciceItem.propTypes = propTypes;
ExerciceItem.defaultProps = defaultProps;

export default ExerciceItem;
