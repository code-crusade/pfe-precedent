import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Selecter extends PureComponent {
    constructor(props) {
        super(props);
        this.themes = [
            { id: 'vs-dark', value: 'Dark' },
            { id: 'vs', value: 'Light' }
        ];
        this.state = {
            current:  this.themes[0]
        };
        this.handleChange = this.handleChange.bind(this);
        this.action = this.props.action;
    }

    handleChange(event) {
        this.setState({current: this.themes.find(theme => {
            return theme.id === event.target.value;
        })});

        this.action(event.target.value);
    }

    render() {
        return (
            <div>
                <select className="custom-select" value={this.state.current.id} onChange={this.handleChange}>
                    {this.themes.map(theme =>
                        <option key={theme.id} value={theme.id}>{theme.value}</option>
                    )}
                </select>
            </div>
        );
    }
}

Selecter.propTypes = {
    action: PropTypes.func
};

export default Selecter;