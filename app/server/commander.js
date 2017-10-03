import { Meteor } from 'meteor/meteor';

(() => {
    let childProcess = require("child_process");
    const oldSpawn = childProcess.spawnSync;
    childProcess.spawnSync = () => oldSpawn.apply(this, arguments);
})();

Meteor.methods({
    'execute': (code, language) => {
        const { spawnSync } = require('child_process');
        const path = require('path');

        const dockerCompose = spawnSync('docker-compose', ['run', language, '-c', code],
            { cwd: Meteor.settings.cliPath });

        return `${dockerCompose.output}`;
    }
});