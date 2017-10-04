import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/csharp';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/theme/monokai';
import { LanguageTemplates } from './templates.js';
import Outputer from './Outputer';
import Loader from './Loader';
import Selecter from './Selecter';
import { Results } from '../api/results';

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
                        <AceEditor style={{height: 350, width: 660}}
                            mode={this.language === 'cpp' ? 'csharp' : this.language}
                            theme='monokai'
                            name='editor'
                            fontSize={14}
                            onChange={this.handleChange}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            value={this.state.value}
                            editorProps={{$blockScrolling: true}}
                            setOptions={{
                                showLineNumbers: true,
                                tabSize: 4
                            }}/>
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