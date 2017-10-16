import React, { PureComponent } from 'react';
import Ide from './ide/Ide';

class Main extends PureComponent {
    render() {
        return (
            <div>
                <Ide />
            </div>
        );
    }
}

export default Main;