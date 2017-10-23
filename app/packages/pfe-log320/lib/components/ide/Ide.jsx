import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import MonacoEditor from "react-monaco-editor";
import { SupportedLanguages } from "../../modules/supportedLanguages.js";
import Outputer from "./Outputer";
import Loader from "./Loader";
import Selecter from "./Selecter";
import Theme from "./Theme";

class Ide extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: SupportedLanguages.csharp.codeTemplate,
      result: "Le résultat sera affiché ici",
      showLoader: false,
      theme: "vs-dark",
    };

    this.disabled = false;
    this.language = "csharp";

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleTheme = this.handleTheme.bind(this);

    this.editorOptions = {
      minimap: {
        renderCharacters: false,
      },
    };
  }

  handleChange(value) {
    this.setState({ value });
  }

  handleLanguage(language) {
    this.language = language;
    this.setState({
      value: SupportedLanguages[language].codeTemplate,
    });
  }

  handleTheme(theme) {
    this.setState({ theme });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.disabled = true;
    this.setState({ showLoader: true });
    Meteor.call(
      "execute",
      this.language,
      this.state.value,
      SupportedLanguages[this.language].fixtureTemplate,
      (err, succ) => {
        if (err) {
          console.warn(err);
          return;
        }

        this.disabled = false;
        this.setState({ showLoader: false, result: succ });
      }
    );
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
            {this.state.showLoader ? (
              <Loader className="loader" theme={this.state.theme} />
            ) : null}
            <MonacoEditor
              className="monaco-editor"
              width="800"
              height="400"
              language={this.language}
              theme={this.state.theme}
              value={this.state.value}
              options={this.editorOptions}
              onChange={this.handleChange}
            />
          </div>
          <br />
        </form>
        <br />
        <Outputer
          result={this.state.result}
          color={this.state.theme === "vs" ? "#1E1E1E" : "#FFFFFE"}
          backColor={this.state.theme === "vs" ? "#FFFFFE" : "#1E1E1E"}
        />
      </div>
    );
  }
}

export default Ide;
