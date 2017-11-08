import { Meteor } from "meteor/meteor";
import { SupportedLanguages } from "../modules/supportedLanguages.js";
import { spawnSync } from "child_process";

Meteor.methods({
  execute: (language, code, fixture) => {
    const dockerCompose = spawnSync(
      "docker-compose",
      [
        "run",
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

    return `${dockerCompose.stdout}${dockerCompose.stderr}`;
  },
});
