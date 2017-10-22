import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const contextTypes = {
  updateCurrentValues: PropTypes.func,
  getDocument: PropTypes.func,
};

const ExercicesFormIde = (
  { label, value },
  { updateCurrentValues, getDocument }
) => {
  return (
    <div className="form-group row">
      <label className="control-label col-sm-3">{label}</label>
      <div className="col-sm-9">
        <MonacoEditor
          className="monaco-editor"
          width="100%"
          height="400"
          language={getDocument().language}
          theme={'vs-dark'}
          value={value}
          onChange={value => updateCurrentValues({ exercice: value })}
        />
      </div>
    </div>
  );
};

ExercicesFormIde.propTypes = propTypes;

ExercicesFormIde.contextTypes = contextTypes;

export default ExercicesFormIde;
