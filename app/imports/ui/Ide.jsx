import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { LanguageTemplates } from './templates.js';
import Outputer from './Outputer';
import Loader from './Loader';
import Selecter from './Selecter';

class Ide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: LanguageTemplates.templates[0].code,
            result: 'Le résultat sera affiché ici',
            disabled: false
        };

        this.language = '';
        this.showLoader = false;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLanguage = this.handleLanguage.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleLanguage(language) {
        this.language = language;
        this.setState({
            value: LanguageTemplates.templates.find(lang => lang.id === language).code
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({disabled: true});
        this.showLoader = true;
        Meteor.call('execute', this.state.value, this.language, (err, succ) => {
            if (err) {
                console.warn(err);
                return;
            }

            this.showLoader = false;
            this.setState({result: succ});
            this.setState({disabled: false});
        });
    }

    render() {
        return (
            <div className="ide">
                {this.showLoader ? <Loader /> : null}
                <Selecter action={this.handleLanguage} />
                <form onSubmit={this.handleSubmit}>
                    <textarea style={{ height: 300, width: 800 }} value={this.state.value} onChange={this.handleChange} />
                    <br />
                    <input disabled={this.state.disabled} className="button" type="submit" value="Exécuter!" />
                </form>
                <br />
                <Outputer result={this.state.result} />
            </div>
        );
    }
}

export default Ide;