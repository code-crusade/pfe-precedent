import { Meteor } from "meteor/meteor";
import { SupportedLanguages } from "../modules/supportedLanguages.js";
import { spawnSync } from "child_process";

Meteor.methods({
  execute: (language, code, fixture) => {
    const dockerCompose = spawnSync(
      "docker-compose",
      [
        "run",
        "--rm",
        language,
        "-t",
        SupportedLanguages[language].framework,
        "-c",
        code,
        "-f",
        fixture,
      ],
      { cwd: Meteor.settings.cliPath }
    );

    const file = `${Meteor.settings.tempPath}/${SupportedLanguages[language].id}/code.${SupportedLanguages[language].extension}`;
    let quality;
    const fs = require('fs-extra');
    fs.outputFile(file, code)
      .then(() => {
        quality = spawnSync('sonar-scanner.bat', 
          [`-Dsonar.projectKey=${SupportedLanguages[language].extension}`, '-Dsonar.sources=./'], 
          { cwd:`${Meteor.settings.tempPath}/${SupportedLanguages[language].id}`}
        );
      })
      .catch(err => {
        quality = err;
      })

    return `${dockerCompose.stdout}${dockerCompose.stderr}\n${quality ? quality : ''}`;
  },
  quality: id => {
    return fetch(
      `http://localhost:9000/api/measures/component?component=${id}&metricKeys=ncloc,complexity,violations`)
      .then(res => {
        if(!res.ok)
          throw Error('Network request failed');

        return res;
      })
      .then(data => data.json())
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      })
  },
});
