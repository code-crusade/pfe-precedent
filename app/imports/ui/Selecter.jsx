import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class Selecter extends Component {
    constructor(props) {
        super(props);

        this.state = {languages: [
            {name: 'C#', code: 'csharp'},
            {name: 'C++', code: 'cpp'},
            {name: 'python', code: 'python'},
            {name: 'Java', code: 'java'}
        ]};
        this.state.current = this.state.languages[0];
        this.handleChange = this.handleChange.bind(this);
        this.action = this.props.action;
    }

    handleChange(event) {
        this.setState({current: this.state.languages.find(lang => {
            return lang.code === event.target.value;
        })});

        this.action(event.target.value);
    }

    render() {
        return (
            <div className="select-slate">
                <select value={this.state.current.code} onChange={this.handleChange}>
                    {this.state.languages.map(lang =>
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                    )}
                </select>
            </div>
        );
    }
}

export default Selecter;