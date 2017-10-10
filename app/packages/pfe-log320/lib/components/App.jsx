import React, { PureComponent } from 'react';
import Ide from './ide/Ide';

class App extends PureComponent {
    render() {
        return (
            <div>
                <h1>PFE LOG320</h1>
                <Ide />
            </div>
        );
    }
}

export default App;