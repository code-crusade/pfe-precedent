import { Meteor } from 'meteor/meteor';

(function () {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawnSync;
    function mySpawn() {
        console.log('spawnSync called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawnSync = mySpawn;
})();

Meteor.methods({
    'execute': (code, language) => {
        var { spawnSync } = require('child_process');
        var path = require('path');

        const dockerCompose = spawnSync('docker-compose', ['run', language, '-c', code],
            { cwd: 'D:/Documents/Projects/PFE-LOG320/codewars-runner-cli' });

        console.log(dockerCompose);
        return `${dockerCompose.output}`;
    }
});