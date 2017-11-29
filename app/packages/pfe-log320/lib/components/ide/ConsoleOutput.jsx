import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MonacoEditor from "react-monaco-editor";

const propTypes = {
  value: PropTypes.string,
  theme: PropTypes.string.isRequired,
};

const defaultProps = {
  value: "",
};

class ConsoleOutput extends PureComponent {
  constructor(props) {
    super(props);
    this.oldDecorationsIds = [];
    this.state = {
      displayValue: "",
      editorDecorations: [],
    };
  }

  editorWillMount = monaco => {
    this.monaco = monaco;
    this.generateEditorDecorations(this.props.value);
  };

  editorDidMount = editor => {
    this.editor = editor;
    this.updateEditorDecorations();
  };

  componentWillReceiveProps(nextProps) {
    this.monaco && this.generateEditorDecorations(nextProps.value);
  }

  componentDidUpdate(prevProps, prevState) {
    this.editor && this.updateEditorDecorations();
  }

  generateEditorDecorations = value => {
    const lines = value.split("\n");

    let displayValue = "";
    let editorDecorations = [];

    let currentTestName = "";
    // Expectations are:
    // - <DESCRIBE::> Marks the beginning of a test case
    // - <IT::> Marks the execution of a test
    // - <PASSED::> / <FAILED::> Mark the test execution summary
    // - <COMPLETEDIN::> Marks the end of a test case.
    for (let i = 0; i < lines.length; ++i) {
      console.log(`Testing line: ${lines[i]}`);
      const matches = lines[i].match(
        /^<(DESCRIBE|IT|PASSED|COMPLETEDIN|LOG)::(.*?)>(.*)/
      );
      if (matches !== null) {
        console.log(matches);
        const range = new this.monaco.Range(i + 1, 1, i + 1, matches[3].length);
        let displayLine = matches[3].replace(/<:LF:>/g, "\n");
        switch (matches[1]) {
          case "DESCRIBE":
            currentTestName = matches[3];
            displayLine = `TEST: ${displayLine}`;
            editorDecorations.push({
              range: range,
              options: {
                isWholeLine: true,
                className: "test-describe",
                glyphMarginHoverMessage: currentTestName,
              },
            });
            break;
          case "IT":
            displayLine = `  ${displayLine}`;
            editorDecorations.push({
              range: range,
              options: {
                isWholeLine: true,
                className: "test-it",
                glyphMarginClassName: "",
                glyphMarginHoverMessage: currentTestName,
              },
            });
            break;
          case "PASSED":
            displayLine = `  ${displayLine}`;
            editorDecorations.push({
              range: range,
              options: {
                isWholeLine: true,
                inlineClassName: "test-passed",
                glyphMarginClassName: "test-passed-margin",
                glyphMarginHoverMessage: currentTestName,
              },
            });
            break;
          case "COMPLETEDIN":
            displayLine = `  Completed in: ${displayLine} milliseconds`;
            editorDecorations.push({
              range: range,
              options: {
                isWholeLine: true,
                className: "test-completedin",
                glyphMarginHoverMessage: currentTestName,
              },
            });
            break;
          case "LOG":
            displayLine = `LOG${matches[2]}: ${displayLine}`;
            break;
          default:
            break;
        }
        displayValue += `${displayLine}\n`;
      } else {
        displayValue += `> ${lines[i]}\n`;
      }
    }

    this.setState({
      displayValue: displayValue,
      editorDecorations: editorDecorations,
    });
  };

  updateEditorDecorations = () => {
    this.oldDecorationsIds = this.editor.deltaDecorations(
      this.oldDecorationsIds,
      this.state.editorDecorations
    );
  };

  relayoutComponent = () => {
    this.editor && this.editor.layout();
  };

  render() {
    const monacoTheme =
      { dark: "vs-dark", light: "vs" }[this.props.theme] || "vs-dark";
    const { displayValue } = this.state;

    const editorOptions = {
      readOnly: true,

      // Gutter
      // lineNumbers: false,
      // lineDecorationsWidth: 30,
      glyphMargin: true,

      // Overview ruler (scrollbar)
      minimap: {
        renderCharacters: false,
      },
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,

      // Line
      renderLineHighlight: "none",
      scrollBeyondLastLine: false,
      wordWrap: "on",
      wrappingIndent: "indent",

      // Inline
      occurrencesHighlight: false,
      selectionHighlight: false,
    };

    return (
      <MonacoEditor
        className="console-output"
        theme={monacoTheme}
        language="plain-text"
        value={displayValue}
        options={editorOptions}
        editorWillMount={this.editorWillMount}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

ConsoleOutput.propTypes = propTypes;
ConsoleOutput.defaultProps = defaultProps;

export default ConsoleOutput;
