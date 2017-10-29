/**
 * A component to configure the "edit exercice" form.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, getFragment } from 'meteor/vulcan:core';

import Exercices from '../../modules/exercices/collection.js';

const propTypes = {
  documentId: PropTypes.string,
  closeModal: PropTypes.func,
};

const ExerciceEditForm = ({ documentId, closeModal }) => (
  <Components.SmartForm
    collection={Exercices}
    documentId={documentId}
    mutationFragment={getFragment('ExercicesItemFragment')}
    showRemove={true}
    successCallback={document => {
      closeModal();
    }}
  />
);

ExerciceEditForm.propTypes = propTypes;

export default ExerciceEditForm;
