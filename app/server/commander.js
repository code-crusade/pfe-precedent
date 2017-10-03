import { Meteor } from 'meteor/meteor';
import { Results } from '../imports/api/results';

Meteor.methods({
    'execute': (code, language) => {
        const { spawnSync } = require('child_process');
        const path = require('path');

        const dockerCompose = spawnSync('docker-compose', ['run', language, '-c', code],
            { cwd: Meteor.settings.cliPath });

        return `${dockerCompose.output}`.replace(/,/g, '');
    }
});