/**
 * A component to export exercice to a json file.
 */

import React, { PureComponent } from 'react';
import { withList } from 'meteor/vulcan:core';
import PropTypes from 'prop-types';

import Exercices from '../../modules/exercices/collection.js';

const propTypes = {
  currentUser: PropTypes.object,
  results: PropTypes.array,
};

const ExerciceExport = ({ currentUser = {}, results = [] }) => {
  if (currentUser && currentUser.isAdmin) {
    const blob = new Blob([JSON.stringify(results)], { type: 'text/json' });
    return (
      <div
        style={{
          marginBottom: '20px',
          paddingBottom: '20px',
          borderBottom: '1px solid #ccc',
        }}
      >
        <h4>Exporter les exercices</h4>
        <a href={window.URL.createObjectURL(blob)} download="exercices.json">
          Exporter les exercices
        </a>
      </div>
    );
  }
  return null;
};

const options = {
  collection: Exercices,
  fragmentName: 'ExercicesItemFragment',
  limit: 0,
};

ExerciceExport.propTypes = propTypes;

export default withList(options)(ExerciceExport);
