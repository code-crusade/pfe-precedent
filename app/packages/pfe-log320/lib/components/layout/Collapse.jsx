import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse as BootstrapCollapse } from 'react-bootstrap';

class Collapse extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    collapsedByDefault: PropTypes.bool,
  };

  static defaultProps = {
    collapsedByDefault: true,
  };

  constructor(props) {
    super(props);
    this.state = { collapsed: props.collapsedByDefault };
  }

  toggleCollapse = () => this.setState({ collapsed: !this.state.collapsed });

  render() {
    const { children } = this.props;
    const { collapsed } = this.state;

    return (
      <div>
        <BootstrapCollapse in={!collapsed}>{children}</BootstrapCollapse>
      </div>
    );
  }
}

export default Collapse;
