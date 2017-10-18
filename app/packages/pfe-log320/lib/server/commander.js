import { Meteor } from "meteor/meteor";
import { SupportedLanguages } from "../modules/supportedLanguages.js";

Meteor.methods({
  execute: (language, code, fixture) => {
    const { spawnSync } = require("child_process");

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
        fixture
      ],
      { cwd: Meteor.settings.cliPath }
    );

    return `${dockerCompose.stdout}${dockerCompose.stderr}`;
  }
});
