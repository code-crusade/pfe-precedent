import { Meteor } from 'meteor/meteor';
import { SupportedLanguages } from '../modules/supportedLanguages.js';
import path from 'path';
import { spawnSync } from 'child_process';

Meteor.methods({
  execute: (language, code, fixture) => {
    // Works in dev, should test in prod.
    const parentDir = path.resolve(process.cwd(), '../../../../../..');
    const dockerCompose = spawnSync(
      'docker-compose',
      [
        'run',
        '--rm',
        language,
        '-t',
        SupportedLanguages[language].framework,
        '-c',
        code,
        '-f',
        fixture,
      ],
      { cwd: parentDir + Meteor.settings.cliPath }
    );

    return `${dockerCompose.stdout}${dockerCompose.stderr}`;
  },
});
