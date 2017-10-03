import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Outputer from './Outputer';
import Loader from './Loader';

class Ide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'public class Program{static void Main(string[] args){// Code goes here}}',
            result: 'Your result will be displayed here',
            showLoader: false
        };

        this.state.disabled = false;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({disabled: true});
        this.setState({showLoader: true});
        Meteor.call('execute', this.state.value, (err, succ) => {
            if (err) {
                console.warn(err);
                return;
            }

            this.setState({showLoader: false});
            this.setState({result: succ});
            this.setState({disabled: false});
        });
    }

    render() {
        return (
            <div className="ide">
                {this.state.showLoader ? <Loader /> : null}
                <form onSubmit={this.handleSubmit}>
                    <textarea style={{ height: 300, width: 800 }} value={this.state.value} onChange={this.handleChange} />
                    <br />
                    <input disabled={this.state.disabled} className="button" type="submit" value="Execute!" />
                </form>
                <br />
                <Outputer result={this.state.result} />
            </div>
        );
    }
}

export default Ide;