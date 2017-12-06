import Exercices from '../modules/exercices/collection';
import { newMutation } from 'meteor/vulcan:core';

const importExercicesFromFile = data => {
  const exercices = JSON.parse(data);
  exercices.forEach((exercice, index) => {
    newMutation({
      collection: Exercices,
      document: { ...exercice, userId: Meteor.userId() },
      validate: false,
    });
  });
  return true;
};

Meteor.methods({
  importExercicesFromFile: ({ data }) => importExercicesFromFile(data),
});
