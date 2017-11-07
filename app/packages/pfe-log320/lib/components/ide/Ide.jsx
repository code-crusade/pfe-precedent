import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Loading } from "meteor/vulcan:core";
import MonacoEditor from "react-monaco-editor";
import get from "lodash/get";

import { SupportedLanguages } from "../../modules/supportedLanguages.js";
import Description from "./Description";
import ConsoleOutput from "./ConsoleOutput";
import Selecter from "./Selecter";
import Theme from "./Theme";

let SplitterLayout;

const propTypes = {
  location: PropTypes.object,
};

const defaultProps = {
  location: {},
};

class Ide extends PureComponent {
  constructor(props) {
    super(props);
    const exercice = get(props.location, "state.exercice");
    this.state = {
      value:
        get(exercice, "exercice") || SupportedLanguages.csharp.codeTemplate,
      description: get(exercice, "description"),
      title: get(exercice, "name"),
      result: "Le résultat sera affiché ici\n\n\n\n\n\n\n\n\n",
      showLoader: false,
      theme: "vs-dark",
      disabled: false,
      language: get(exercice, "language") || "csharp",
    };

    this.editorOptions = {
      minimap: {
        renderCharacters: false,
      },
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);

    // SplitterLayout requires window to be imported, which is only available in browser.
    // Import the SplitterLayout component at runtime, when this component did mount,
    // then force a new render of this component.
    SplitterLayout = require("react-splitter-layout").default;
    this.forceUpdate();
  }

  editorDidMount = (editor, monaco) => {
    this.editor = editor;
    this.monaco = monaco;
  };

  assignConsoleOutputRef = component => {
    this.consoleOutput = component;
  };

  handleEditorValueChange = value => {
    this.setState({ value });
  };

  handleLanguageChange = language => {
    this.setState({
      language,
      value: SupportedLanguages[language].codeTemplate,
    });
  };

  handleThemeChange = theme => {
    this.setState({ theme });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ showLoader: true, disabled: true });
    Meteor.call(
      "execute",
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

  handleTopLevelPanelSizeChange = () => {
    this.redoEditorsLayout();
  };

  handleNestedPanelSizeChange = () => {
    this.redoEditorsLayout();
  };

  handleWindowResize = () => {
    this.redoEditorsLayout();
  };

  redoEditorsLayout = () => {
    this.editor && this.editor.layout();
    this.consoleOutput && this.consoleOutput.layoutEditor();
  };

  render() {
    const { language, theme, disabled, showLoader, value, result } = this.state;

    // SplitterLayout is only available in browser. Temporarily use <div> if not available.

    let DescriptionPanel = (
      <Description
        title={this.state.title}
        description={this.state.description}
        color={theme === "vs" ? "#1E1E1E" : "#FFFFFE"}
        backgroundColor={theme === "vs" ? "#FFFFFE" : "#1E1E1E"}
      />
    );

    let EditorPanel = (
      <form className="ide" onSubmit={this.handleSubmit}>
        <div className="ide-controls">
          <Selecter onChange={this.handleLanguageChange} value={language} />
          <Theme onChange={this.handleThemeChange} value={theme} />
          <input
            disabled={disabled}
            className="btn btn-primary execute"
            type="submit"
            value="Exécuter!"
          />
        </div>
        <div className="ide-editor">
          {showLoader ? <Loading className="loader" theme={theme} /> : null}
          <MonacoEditor
            className="monaco-editor"
            language={language}
            theme={theme}
            value={value}
            options={this.editorOptions}
            editorDidMount={this.editorDidMount}
            onChange={this.handleEditorValueChange}
          />
        </div>
      </form>
    );

    let ConsoleOutputPanel = (
      <ConsoleOutput
        ref={this.assignConsoleOutputRef}
        result={result}
        theme={theme}
      />
    );

    let IdePanel =
      typeof SplitterLayout !== "undefined" ? (
        <div className="resizable-panel">
          <SplitterLayout
            className="ide"
            vertical={true}
            primaryMinSize={400}
            secondaryInitialSize={250}
            onSecondaryPaneSizeChange={this.handleNestedPanelSizeChange}
          >
            {EditorPanel}
            {ConsoleOutputPanel}
          </SplitterLayout>
        </div>
      ) : (
        <div className="resizable-panel">
          <div className="ide">
            {EditorPanel}
            {ConsoleOutputPanel}
          </div>
        </div>
      );

    return typeof SplitterLayout !== "undefined" ? (
      <SplitterLayout
        primaryIndex={1}
        percentage={true}
        primaryMinSize={50}
        secondaryInitialSize={30}
        onSecondaryPaneSizeChange={this.handleTopLevelPanelSizeChange}
      >
        {DescriptionPanel}
        {IdePanel}
      </SplitterLayout>
    ) : (
      <div>
        {DescriptionPanel}
        {IdePanel}
      </div>
    );
  }
}

Ide.propTypes = propTypes;
Ide.defaultProps = defaultProps;

export default Ide;
