import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
<<<<<<< HEAD
=======
/*import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/csharp';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/theme/monokai';*/
>>>>>>> 1c3550bb5d7aa6a316b567614249ed3a8d1d9a91
import { LanguageTemplates } from './templates.js';
import CodeMirror from 'react-codemirror';
import MonacoEditor from 'react-monaco-editor';
import Outputer from './Outputer';
import Loader from './Loader';
import Selecter from './Selecter';

class Ide extends PureComponent {
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
            <div>
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
                    <input disabled={this.disabled} className="btn btn-primary" type="submit" value="Exécuter!" />
                </form>
                <br />
                <Outputer result={this.state.result} />
            </div>
        );
    }
}

export default Ide;