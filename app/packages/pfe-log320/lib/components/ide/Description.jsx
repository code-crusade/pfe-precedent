import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import isNil from 'lodash/isNil';

import CodeBlock from './CodeBlock.jsx';

let ScrollArea;

const propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

class Description extends React.PureComponent {
  componentDidMount() {
    ScrollArea = require('react-scrollbar').default;
  }

  assignScrollAreaRef = component => {
    this.scrollAreaComponent = component;
  };

  relayoutComponent = () => {
    this.scrollAreaComponent &&
      this.scrollAreaComponent.content &&
      this.scrollAreaComponent.wrapper &&
      this.scrollAreaComponent.scrollArea.refresh();
  };

  render() {
    return (
      <div className="problem-description">
        <div className="problem-description-title">
          <h1>{this.props.title}</h1>
        </div>
        {React.createElement(
          !isNil(ScrollArea) ? ScrollArea : 'div',
          !isNil(ScrollArea)
            ? {
                ref: this.assignScrollAreaRef,
                className: 'problem-description-text-container',
                smoothScrolling: true,
              }
            : { className: 'problem-description-text-container' },
          <Markdown
            className="markdown problem-description-text"
            renderers={{ CodeBlock }}
            source={this.props.description || ''}
          />
        )}
      </div>
    );
  }
}

Description.propTypes = propTypes;

export default Description;
