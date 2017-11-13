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
import Collapse from '../layout/Collapse';

const propTypes = {
  exercice: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
};

const defaultProps = {
  currentUser: {},
};

const langValueToIcon = {
  csharp: 'csharp',
  cpp: 'cplusplus',
  python: 'python',
  java: 'java',
};

const langValueToLabel = {
  csharp: 'C# Mono 4.8',
  cpp: 'C++ 14',
  python: 'Python 2.7.6',
  java: 'Java 1.8',
};

const diffValueToLabel = {
  veryEasy: 'Très Facile',
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile',
  veryHard: 'Très Difficile',
};

const diffValueToStars = {
  veryEasy: 0,
  easy: 1,
  medium: 2,
  hard: 3,
  veryHard: 4,
};

const fullStar = '\u2605';
const emptyStar = '\u2606';

const testTypeValueToLabel = {
  practice: 'Pratique',
  validation: 'Validation',
};

const renderStars = difficulty => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i <= diffValueToStars[difficulty]) {
      stars.push(fullStar);
    } else {
      stars.push(emptyStar);
    }
  }
  return stars;
};

const ExerciceItem = ({ exercice, currentUser }) => {
  let collapse = null;
  return (
    <div
      key={exercice}
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {exercice.name}
          <div style={{ fontSize: '16px' }}>
            {renderStars(exercice.difficulty).map((value, index) => (
              <span key={index}>{value}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <i
            className={`devicon-${langValueToIcon[
              exercice.language
            ]}-plain colored`}
          />
        </div>
      </h2>

      <Collapse
        ref={instance => {
          collapse = instance;
        }}
        collapsedByDefault={true}
      >
        <div>
          <dl className="row">
            <dt className="col-sm-3">Résumé:</dt>
            <dd className="col-sm-9">{exercice.summary}</dd>

            <dt className="col-sm-3">Language:</dt>
            <dd className="col-sm-9">{langValueToLabel[exercice.language]}</dd>

            <dt className="col-sm-3">Difficulté:</dt>
            <dd className="col-sm-9">
              {diffValueToLabel[exercice.difficulty]}
            </dd>

            <dt className="col-sm-3">Type de test:</dt>
            <dd className="col-sm-9">
              {testTypeValueToLabel[exercice.testType]}
            </dd>
          </dl>
        </div>
      </Collapse>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link
          to={{
            pathname: 'ide',
            state: { exercice },
          }}
        >
          Essayer l'exercice
        </Link>
        <button
          type="button"
          className="btn btn-outline-info btn-sm"
          onClick={() => collapse.toggleCollapse()}
        >
          Plus d'informations
        </button>
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
};

ExerciceItem.propTypes = propTypes;
ExerciceItem.defaultProps = defaultProps;

export default ExerciceItem;
