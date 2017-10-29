import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const themes = [{ id: 'vs-dark', value: 'Dark' }, { id: 'vs', value: 'Light' }];

const Theme = ({ onChange, value }) => (
  <select
    className="custom-select"
    value={value}
    onChange={({ target }) => onChange(target.value)}
  >
    {themes.map(theme => (
      <option key={theme.id} value={theme.id}>
        {theme.value}
      </option>
    ))}
  </select>
);

Theme.propTypes = propTypes;

export default Theme;
