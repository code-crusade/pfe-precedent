import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import MonacoEditor from 'react-monaco-editor';
import { Loading } from 'meteor/vulcan:core';
import get from 'lodash/get';

import { SupportedLanguages } from '../../modules/supportedLanguages.js';
import Outputer from './Outputer';
import Selecter from './Selecter';
import Theme from './Theme';
import Description from './Description';

const propTypes = {
  location: PropTypes.object,
};

const defaultProps = {
  location: {},
};
class Ide extends PureComponent {
  constructor(props) {
    super(props);
    const exercice = get(props.location, 'state.exercice');
    this.state = {
      value:
        get(exercice, 'exercice') || SupportedLanguages.csharp.codeTemplate,
      description:
        get(exercice, 'description'),
      title:
        get(exercice, 'name'),
      result: 'Le résultat sera affiché ici',
      showLoader: false,
      theme: 'vs-dark',
      disabled: false,
      language: get(exercice, 'language') || 'csharp',
    };

    this.editorOptions = {
      minimap: {
        renderCharacters: false,
      },
    };
  }

  handleChange = value => {
    this.setState({ value });
  };

  handleLanguage = language => {
    this.setState({
      language,
      value: SupportedLanguages[language].codeTemplate,
    });
  };

  handleTheme = theme => {
    this.setState({ theme });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ showLoader: true, disabled: true });
    Meteor.call(
      'execute',
      this.state.language,
      this.state.value,
      SupportedLanguages[this.state.language].fixtureTemplate,
      (err, succ) => {
        if (err) {
          console.warn(err);
          return;
        }

        this.setState({ showLoader: false, disabled: false, result: succ });
      }
    );
  };

  render() {
    const { language, theme, disabled, showLoader, value, result } = this.state;
    return (
      <div className="ide">
        <Selecter onChange={this.handleLanguage} value={language} />
        <Theme onChange={this.handleTheme} value={theme} />
        <form onSubmit={this.handleSubmit}>
          <input
            disabled={disabled}
            className="btn btn-primary execute"
            type="submit"
            value="Exécuter!"
          />
          <Description title={this.state.title}
            description={this.state.description}
            color={theme === 'vs' ? '#1E1E1E' : '#FFFFFE'}
            backgroundColor={theme === 'vs' ? '#FFFFFE' : '#1E1E1E'}
          />
          <div className="editor">
            {showLoader ? <Loading className="loader" theme={theme} /> : null}
            <MonacoEditor
              className="monaco-editor"
              width="800"
              height="400"
              language={language}
              theme={theme}
              value={value}
              options={this.editorOptions}
              onChange={this.handleChange}
            />
          </div>
          <br />
        </form>
        <br />
        <Outputer
          result={result}
          color={theme === 'vs' ? '#1E1E1E' : '#FFFFFE'}
          backgroundColor={theme === 'vs' ? '#FFFFFE' : '#1E1E1E'}
        />
      </div>
    );
  }
}

Ide.propTypes = propTypes;
Ide.defaultProps = defaultProps;

export default Ide;
