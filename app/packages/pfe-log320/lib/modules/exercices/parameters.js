import { addCallback } from 'meteor/vulcan:core';

function sortByName(parameters, terms) {
  return {
    selector: parameters.selector,
    options: { ...parameters.options, sort: { name: 1 } },
  };
}

function FilterEasy(parameters, terms) {
  return {
    selector: { difficulty: 'easy' },
    options: { ...parameters.options },
  };
}

function FilterHard(parameters, terms) {
  //console.log(terms);
  return {    
    selector: { difficulty: 'hard' },
    options: { ...parameters.options },
  };
}


addCallback('exercices.parameters', sortByName);
//addCallback('exercices.parameters', FilterHard);