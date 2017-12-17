import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SupportedLanguages } from '../../modules/supportedLanguages.js';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  lock: PropTypes.bool.isRequired,
};

class Selecter extends PureComponent {
  onChange = event => {
    event.preventDefault();
    if (confirm('Le code actuel sera remplacé, continuer?')) {
      this.props.onChange(event.target.value);
    }
  };

  render() {
    return (
      <select
        className="custom-select"
        value={this.props.value}
        onChange={this.onChange}
      >
        {this.props.lock ? 
          <option key={SupportedLanguages[this.props.value].id} value={SupportedLanguages[this.props.value].id}>
              {SupportedLanguages[this.props.value].name}
          </option> :
          _.map(SupportedLanguages, lang => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))
       }
      </select>
    );
  }
}

Selecter.propTypes = propTypes;

export default Selecter;
