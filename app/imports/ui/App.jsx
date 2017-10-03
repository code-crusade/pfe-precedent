import React, { Component } from 'react';
import Ide from './Ide';

class App extends Component {
    render() {
        return (
            <div>
                <h1>Demo using Codewars CLI Runner</h1>
                <Ide />
            </div>
        );
    }
}

export default App;