import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'execute': (code, language) => {
        const shell = require('node-powershell');
        console.log(language);
        let ps = new shell({
            executionPolicy: 'Bypass',
            noProfile: true
        });
        
        ps.addCommand(`cd C:/Users/qcsim/Documents/demo-cli/codewars-runner-cli; docker-compose run ${language} -c "${code}"`);
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