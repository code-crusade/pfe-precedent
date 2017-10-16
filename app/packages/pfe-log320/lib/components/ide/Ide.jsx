import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import MonacoEditor from 'react-monaco-editor';
import { LanguageTemplates } from "./templates.js";
import Outputer from "./Outputer";
import Loader from "./Loader";
import Selecter from "./Selecter";
import Theme from "./Theme";

class Ide extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: LanguageTemplates.templates[0].code,
      result: "Le résultat sera affiché ici",
      theme: 'vs-dark',
      showLoader: false
    };

    this.disabled = false;
    this.language = LanguageTemplates.templates[0].id;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
    
    this.requireConfig = {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',// could be local also
      paths: {
        vs: 'http://localhost:3000/vs' // should preload this when client is initializing to keep ui snappy
      }
    };
  }

  handleChange(value) {
    this.setState({value});
  }

  handleLanguage(language) {
    this.language = language;
    this.setState({
      value: LanguageTemplates.templates.find(lang => lang.id === language).code
    });
  }

  handleTheme(theme) {
    this.setState({theme});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.disabled = true;
    this.setState({ showLoader: true });
    Meteor.call("execute", this.state.value, this.language, (err, succ) => {
      if (err) {
        console.warn(err);
        return;
      }

      this.disabled = false;
      this.setState({ showLoader: false, result: succ });
    });
  }

  render() {
    return (
      <div className="ide">
        <Selecter action={this.handleLanguage} />
        <Theme action={this.handleTheme} />
        <form onSubmit={this.handleSubmit}>
          <input
              disabled={this.disabled}
              className="btn btn-primary execute"
              type="submit"
              value="Exécuter!"
            />
          <div className="editor">
            {this.state.showLoader ? <Loader className="loader" theme={this.state.theme} /> : null}
            <MonacoEditor className="monaco-editor"
              width="800"
              height="400"
              language={this.language}
              theme={this.state.theme}
              value={this.state.value}
              onChange={this.handleChange}
              requireConfig={this.requireConfig} />
          </div>
          <br />
        </form>
        <br />
        <Outputer result={this.state.result} />
      </div>
    );
  }
}

export default Ide;
