import React, { Component } from "react";
import PropTypes from "prop-types";
import MonacoEditor from "react-monaco-editor";

const propTypes = {
  result: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

const defaultProps = {
  result: "",
};

class Outputer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.result,
      theme: props.theme,
    };
    this.oldDecorationsIds = [];
    this.editorDecorations = [];
  }

  editorDidMount = (editor, monaco) => {
    this.editor = editor;
    this.monaco = monaco;

    this.editorDecorations = [
      {
        range: new monaco.Range(1, 1, 1, 1),
        options: {
          isWholeLine: true,
          glyphMarginHoverMessage: "test123",
          glyphMarginClassName: "green-background",
          overviewRuler: {
            color: "green",
            darkColor: "darkgreen",
            hcColor: "green",
            position: monaco.editor.OverviewRulerLane.Full,
          },
        },
      },
    ];

    this.oldDecorationsIds = editor.deltaDecorations(
      this.oldDecorationsIds,
      this.editorDecorations
    );
  };

  render() {
    const { value, theme } = this.state;
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

      // Inline
      occurrencesHighlight: false,
    };

    return (
      <MonacoEditor
        className="console-output"
        width="800"
        height="190"
        theme={theme}
        language="plain-text"
        value={value}
        options={editorOptions}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

Outputer.propTypes = propTypes;
Outputer.defaultProps = defaultProps;

export default Outputer;
