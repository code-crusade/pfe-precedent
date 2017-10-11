import React, { PureComponent } from 'react';
import AppLayout from './layout/AppLayout';
import Ide from './ide/Ide';

class Main extends PureComponent {
    render() {
        return (
            <div>
                <AppLayout />
                <Ide />
            </div>
        );
    }
}

export default Main;