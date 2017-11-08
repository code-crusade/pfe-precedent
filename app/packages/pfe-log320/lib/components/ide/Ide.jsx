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
      theme: "dark",
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
    window.addEventListener("resize", this.relayoutComponents);

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
    this.consoleOutputComponent = component;
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
    window && window.dispatchEvent(new Event("resize"));
  };

  handleNestedPanelSizeChange = () => {
    window && window.dispatchEvent(new Event("resize"));
  };

  relayoutComponents = () => {
    this.editor && this.editor.layout();
    this.consoleOutputComponent &&
      this.consoleOutputComponent.relayoutComponent();
  };

  render() {
    const { language, theme, disabled, showLoader, value, result } = this.state;
    const monacoTheme = { dark: "vs-dark", light: "vs" }[theme] || "vs-dark";

    // SplitterLayout is only available in browser. Temporarily use <div> if not available.

    const DescriptionPanel = (
      <Description
        title={this.state.title}
        description={this.state.description}
      />
    );

    const EditorPanel = (
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
          {showLoader ? <Loading /> : null}
          <MonacoEditor
            language={language}
            theme={monacoTheme}
            value={value}
            options={this.editorOptions}
            editorDidMount={this.editorDidMount}
            onChange={this.handleEditorValueChange}
          />
        </div>
      </form>
    );

    const ConsoleOutputPanel = (
      <ConsoleOutput
        ref={this.assignConsoleOutputRef}
        value={result}
        theme={theme}
      />
    );

    const IdePanel =
      typeof SplitterLayout !== "undefined" ? (
        <SplitterLayout
          vertical={true}
          primaryMinSize={400}
          secondaryInitialSize={250}
          onSecondaryPaneSizeChange={this.handleNestedPanelSizeChange}
        >
          {EditorPanel}
          {ConsoleOutputPanel}
        </SplitterLayout>
      ) : (
        <div className="vertical-layout">
          {EditorPanel}
          {ConsoleOutputPanel}
        </div>
      );

    return (
      <div className={["editor-page", theme].join(" ")}>
        {typeof SplitterLayout !== "undefined" ? (
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
          <div className="vertical-layout">
            {DescriptionPanel}
            {IdePanel}
          </div>
        )}
      </div>
    );
  }
}

Ide.propTypes = propTypes;
Ide.defaultProps = defaultProps;

export default Ide;
