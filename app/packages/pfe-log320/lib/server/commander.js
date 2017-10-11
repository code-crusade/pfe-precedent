import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'execute': (code, language) => {
        const { spawnSync } = require('child_process');

        const dockerCompose = spawnSync('docker-compose', ['run', language, '-c', code],
            { cwd: Meteor.settings.cliPath });

        return `${dockerCompose.stdout}${dockerCompose.stderr}`;
    }
});