import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'execute': (code) => {
        const shell = require('node-powershell');
        
        let ps = new shell({
            executionPolicy: 'Bypass',
            noProfile: true
        });
        
        ps.addCommand(`cd C:/Users/qcsim/Documents/demo-cli/codewars-runner-cli; docker-compose run csharp -c "${code}"`);
        const value = ps.invoke()
        .then(output => {
            return output;
        })
        .catch(err => {
            ps.dispose();
            return err;
        });

        return value;
    }
});