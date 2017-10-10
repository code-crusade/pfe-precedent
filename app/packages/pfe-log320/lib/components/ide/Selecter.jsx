import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LanguageTemplates } from './templates.js';

class Selecter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            languages: LanguageTemplates.templates,
            current:  LanguageTemplates.templates[0]
        };
        this.handleChange = this.handleChange.bind(this);
        this.action = this.props.action;
    }

    handleChange(event) {
        this.setState({current: this.state.languages.find(lang => {
            return lang.id === event.target.value;
        })});

        this.action(event.target.value);
    }

    render() {
        return (
            <div className="select-slate">
                <select value={this.state.current.id} onChange={this.handleChange}>
                    {this.state.languages.map(lang =>
                        <option key={lang.id} value={lang.id}>{lang.name}</option>
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