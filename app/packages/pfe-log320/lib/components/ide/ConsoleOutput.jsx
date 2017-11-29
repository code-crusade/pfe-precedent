import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MonacoEditor from "react-monaco-editor";

const propTypes = {
  value: PropTypes.string,
  language: PropTypes.string.isRequired,
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
    if (this.monaco && this.props.value != nextProps.value)
      this.generateEditorDecorations(nextProps.value);
  }

  componentDidUpdate(prevProps, prevState) {
    this.editor && this.updateEditorDecorations();
  }

  generateEditorDecorations = value => {
    // List of possible decoration options (Monaco): https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.imodeldecorationoptions.html

    let testResults = {
      type: "RESULTS",
      name: "Test Results:",
      parent: null,
      childs: [],
      passed: true,
      consoleLog: "",
      completedIn: null,
    };
    let currentItem = testResults;
    let specialLogs = new Map();

    // Expectations are:
    // - <DESCRIBE::> Marks the beginning of a test case
    // - <IT::> Marks the execution of a test
    // - <PASSED::> / <FAILED::> Mark the test execution summary
    // - <COMPLETEDIN::> Marks the end of a test case.
    // - <LOG::(.*?)> Log of a certain type (Apparently something unique to Java but there is no
    //   harm in enable it for all languages)
    //
    // Language specifics:
    // - The C# tags engine lags behind the other ones, as it doesn't add an endline character
    //   before each tag. See https://github.com/Codewars/codewars-runner-cli/issues/410 for tracking.
    //
    let tagMatcher =
      this.props.language === "csharp"
        ? /^(.*)<(DESCRIBE|IT|PASSED|FAILED|COMPLETEDIN|LOG)::(.*?)>(.*)$/gm
        : /^(.*)\n?<(DESCRIBE|IT|PASSED|FAILED|COMPLETEDIN|LOG)::(.*?)>(.*)$/gm;
    let matches;
    let lastSuccessfulMatchIndex = 0;
    while ((matches = tagMatcher.exec(value))) {
      lastSuccessfulMatchIndex = tagMatcher.lastIndex;

      // Extract the different values matched by the regex
      const pre = matches[1];
      const tag = matches[2];
      const option = matches[3];
      const details = matches[4].replace(/<:LF:>/g, "\n");

      // In every case, whatever appears before the tag element can be assumed to be part of traditional console log.
      // Add to the console log if compose of something else than blank spaces.
      if (!pre.match(/^\s*$/)) currentItem.consoleLog += pre;

      switch (tag) {
        case "DESCRIBE":
          const testClass = {
            type: "TEST_CLASS",
            name: `Test Class: ${details}`,
            parent: currentItem,
            childs: [],
            passed: true,
            consoleLog: "",
            completedin: null,
          };
          currentItem.childs.push(testClass);
          currentItem = testClass;
          break;
        case "IT":
          const test = {
            type: "TEST",
            name: `Test: ${details}`,
            parent: currentItem,
            childs: [],
            passed: true,
            consoleLog: "",
            completedin: null,
          };
          currentItem.childs.push(test);
          currentItem = test;
          break;
        case "PASSED":
          currentItem.childs.push({
            type: "PASS_FAIL_MESSAGE",
            message: details,
            parent: currentItem,
            passed: true,
          });
          break;
        case "FAILED":
          currentItem.childs.push({
            type: "PASS_FAIL_MESSAGE",
            message: details,
            parent: currentItem,
            passed: false,
          });
          for (let item = currentItem; item; item = item.parent) {
            item.passed = false;
          }
          break;
        case "COMPLETEDIN":
          if (details) currentItem.completedIn = details;
          currentItem = currentItem.parent || currentItem;
          break;
        case "LOG":
          specialLogs.set(option, (specialLogs.get(option) || "") + details);
          break;
        default:
          // In case a tag is not handled...
          console.error(`Unhandled tag in console output: ${tag}`); // eslint-disable-line no-console
          break;
      }
    }

    // Everything from tagMatcher's last match onward is part of the testResults consoleLog... probably.
    const remainderLog = value.substr(lastSuccessfulMatchIndex);
    if (!remainderLog.match(/^\s*$/)) testResults.consoleLog += remainderLog;

    // Values used throughout the rest of this sequence
    let displayValue = "";
    let totalEndlinesCount = 0;
    let editorDecorations = [];

    // Write all special logs at the top of the console.
    if (specialLogs) {
      let specialLogsStr = "";
      for (let [k, v] of specialLogs.entries()) {
        specialLogsStr += v.replace(/^/gm, `${k}: `);
      }

      const specialLogsEnglineCount =
        (specialLogsStr.match(/\n/g) || []).length + 1;
      displayValue += `${specialLogsStr}\n`;

      const range = new this.monaco.Range(
        totalEndlinesCount + 1,
        1,
        totalEndlinesCount + specialLogsEnglineCount,
        specialLogsStr.length - specialLogsStr.lastIndexOf("\n")
      );

      editorDecorations.push({
        range: range,
        options: {
          isWholeLine: true,
          inlineClassName: "console-secondary-log",
        },
      });

      totalEndlinesCount += specialLogsEnglineCount;
    }

    // With everything organized in a hierarchical fashion, and with some additional information
    // gathered from this first pass, creating the final format is a simple matter.
    if (testResults.childs.length > 0) {
      // Define recursion function for tree elements depth first parcour.
      const recurse = (item, indent = "") => {
        // Current item header
        let str =
          `${indent}${item.name}\n` +
          `${item.consoleLog.replace(/^(?=.*\n)/gm, `${indent}\t> `)}\n`;

        displayValue += str;

        // Create a range spanning all the lines currently being formatted:
        // startLineNumber = Number of lines previous to this step + 1
        // startColumn = 1
        // endLineNumber = startLineNumber (We only want to affect the Name line)
        // endColumn = Length of the first line from this step.
        const range = new this.monaco.Range(
          totalEndlinesCount + 1,
          1,
          totalEndlinesCount + 1,
          str.indexOf("\n")
        );

        editorDecorations.push({
          range: range,
          options: {
            isWholeLine: true,
            inlineClassName: item.passed ? "test-passed" : "test-failed",
          },
        });

        totalEndlinesCount += (str.match(/\n/g) || []).length;

        // Explore childs
        for (let i = 0; i < item.childs.length; ++i) {
          const child = item.childs[i];
          switch (child.type) {
            case "RESULTS":
              //eslint-disable-next-line no-console
              console.error(
                "Unexpected RESULTS node in test results tree non-root position."
              );
              break;
            case "TEST_CLASS":
            case "TEST":
              recurse(child, `${indent}\t`);
              break;
            case "PASS_FAIL_MESSAGE":
              str = `${indent}\t${child.passed
                ? `Passed: ${child.message}`
                : `Failed:\n${child.message.replace(
                    /^/gm,
                    `${indent}\t\t`
                  )}`}\n`;

              displayValue += str;

              // Create a range spanning all the lines currently being formatted:
              // startLineNumber = Number of lines previous to this step + 1
              // startColumn = 1
              // endLineNumber = startLineNumber (We only want to affect the first line)
              // endColumn = Length of the first line from this step.
              const range = new this.monaco.Range(
                totalEndlinesCount + 1,
                1,
                totalEndlinesCount + 1,
                str.indexOf("\n")
              );

              editorDecorations.push({
                range: range,
                options: {
                  isWholeLine: true,
                  inlineClassName: child.passed ? "test-passed" : "test-failed",
                },
              });

              totalEndlinesCount += (str.match(/\n/g) || []).length;
              break;
          }
        }
      };

      // Kick off the recursive algorithm.
      recurse(testResults);
    } else {
      displayValue += testResults.consoleLog;
      totalEndlinesCount += (testResults.consoleLog.match(/\n/g) || []).length;
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
