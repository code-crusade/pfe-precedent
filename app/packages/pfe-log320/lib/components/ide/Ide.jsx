import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { LanguageTemplates } from './templates.js';
import CodeMirror from 'react-codemirror';
import MonacoEditor from 'react-monaco-editor';
import Outputer from './Outputer';
import Loader from './Loader';
import Selecter from './Selecter';

class Ide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: LanguageTemplates.templates[0].code,
            result: 'Le résultat sera affiché ici',
            showLoader: false
        };

        this.disabled = false;
        this.language = LanguageTemplates.templates[0].id;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLanguage = this.handleLanguage.bind(this);
    }

    handleChange(value) {
        this.setState({value});
    }

    handleLanguage(language) {
        this.language = language;
        this.setState({
            value: LanguageTemplates.templates.find(lang => lang.id === language).code
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.disabled = true;
        this.setState({showLoader: true});
        Meteor.call('execute', this.state.value, this.language, (err, succ) => {
            if (err) {
                console.warn(err);
                return;
            }

            this.setState({showLoader: false});
            this.setState({result: succ});
            this.disabled = false;
        });
    }

    render() {
        return (
            <div className="ide">
                {this.state.showLoader ? <Loader /> : null}
                <Selecter action={this.handleLanguage} />
                <form onSubmit={this.handleSubmit}>
                    <div className='editor'>
                        <CodeMirror />
                        <MonacoEditor
                            width="800"
                            height="600"
                            language="javascript"
                            theme="vs-dark"
                            value={this.state.value}
                            options={{}}
                            onChange={this.handleChange}
                            editorDidMount={this.editorDidMount}
                        />
                    </div>
                    <br />
                    <input disabled={this.disabled} className="button" type="submit" value="Exécuter!" />
                </form>
                <br />
                <Outputer result={this.state.result} />
            </div>
        );
    }
}

export default Ide;