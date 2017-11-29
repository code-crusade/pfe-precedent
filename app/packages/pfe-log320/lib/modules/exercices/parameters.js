import { addCallback } from "meteor/vulcan:core";

function sortByName(parameters, terms) {
  return {
    selector: parameters.selector,
    options: { ...parameters.options, sort: { name: 1 } },
  };
}

addCallback("exercices.parameters", sortByName);
