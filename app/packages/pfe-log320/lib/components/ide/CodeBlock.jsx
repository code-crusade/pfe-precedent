import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";

import tomorrowNight from "react-syntax-highlighter/dist/styles/tomorrow-night";

let ScrollArea;

const propTypes = {
  literal: PropTypes.string,
  language: PropTypes.string,
};

class CodeBlock extends PureComponent {
  componentDidMount() {
    ScrollArea = require("react-scrollbar").default;
  }

  render() {
    const codeBlock = (
      <SyntaxHighlighter
        language={this.props.language}
        style={tomorrowNight}
        showLineNumbers={true}
        lineNumberContainerStyle={{
          float: "left",
          paddingRight: 10,
          marginRight: 10,
          borderRight: "solid 1px rgba(255, 255, 255, 0.15)",
        }}
        lineNumberStyle={{ color: "rgba(255, 255, 255, 0.15)" }}
      >
        {this.props.literal}
      </SyntaxHighlighter>
    );

    return typeof ScrollArea !== "undefined" ? (
      <ScrollArea className="pre" smoothScrolling={true} swapWheelAxes={true}>
        {codeBlock}
      </ScrollArea>
    ) : (
      codeBlock
    );
  }
}

CodeBlock.propTypes = propTypes;

module.exports = CodeBlock;
