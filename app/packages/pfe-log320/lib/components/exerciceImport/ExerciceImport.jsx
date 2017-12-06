/**
 * A component to load users from a xlsx file
 */

import React, { PureComponent } from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import PropTypes from 'prop-types';

const propTypes = {
  currentUser: PropTypes.object,
};

class ExerciceImport extends PureComponent {
  state = { finished: false };

  handleChange = file => {
    this.setState({ finished: false });
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target.result;
      Meteor.call('importExercicesFromFile', { data }, () => {
        this.setState({ finished: true });
      });
    };
    reader.readAsText(file, 'UTF-8');
  };

  render() {
    const { currentUser = {} } = this.props;
    if (currentUser && currentUser.isAdmin) {
      return (
        <div
          style={{
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '1px solid #ccc',
          }}
        >
          <h4>Importer une liste d'Exercices</h4>
          <input
            type="file"
            onChange={event => this.handleChange(event.target.files[0])}
          />
          {this.state.finished && <div>Importation Terminé!</div>}
        </div>
      );
    }
    return null;
  }
}

ExerciceImport.propTypes = propTypes;

export default ExerciceImport;
