import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { LanguageTemplates } from "./templates.js";
import Outputer from "./Outputer";
import Loader from "./Loader";
import Selecter from "./Selecter";

class Ide extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: LanguageTemplates.templates[0].code,
      result: "Le résultat sera affiché ici",
      showLoader: false
    };

    this.disabled = false;
    this.language = LanguageTemplates.templates[0].id;
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
    this.disabled = true;
    this.setState({ showLoader: true });
    Meteor.call("execute", this.state.value, this.language, (err, succ) => {
      if (err) {
        console.warn(err);
        return;
      }

      this.disabled = false;
      this.setState({ showLoader: false, result: succ });
    });
  }

  render() {
    return (
      <div className="ide">
        <Selecter action={this.handleLanguage} />
        <form onSubmit={this.handleSubmit}>
          <input
              disabled={this.disabled}
              className="btn btn-primary execute"
              type="submit"
              value="Exécuter!"
            />
          <div className="editor">
            {this.state.showLoader ? <Loader className="loader" /> : null}
            <textarea style={{ height: 400, width: 800 }} value={this.state.value} onChange={this.handleChange} />
          </div>
          <br />
        </form>
        <br />
        <Outputer result={this.state.result} />
      </div>
    );
  }
}

export default Ide;
