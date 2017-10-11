/**
 * Seed the database with some dummy content. 
 */

import Exercices from '../modules/exercices/collection.js';
import Users from 'meteor/vulcan:users';
import { newMutation } from 'meteor/vulcan:core';

const seedData = [
  {
    name: 'Exercice 1',
    description: 'Exercice en C++',
    language: 'c++',
    exercice: 'Hello world',
  },
  {
    name: 'Exercice 2',
    description: 'Exercice en Java',
    language: 'java',
    exercice: 'Exercice',
  },
  {
    name: 'Exercice 3',
    description: 'Exercice en Python',
    language: 'python',
    exercice: 'Exercice',
  },
  {
    name: 'Exercice 4',
    description: 'Exercice en C#',
    language: 'c#',
    exercice: 'Exercice',
  },
];

const createUser = function (username, email) {
  const user = {
    username,
    email,
    isDummy: true,
  };
  newMutation({
    collection: Users,
    document: user,
    validate: false,
  });
};

var createDummyUsers = function () {
  console.log('// inserting dummy users…');
  createUser('Bruce', 'dummyuser1@telescopeapp.org');
  createUser('Arnold', 'dummyuser2@telescopeapp.org');
  createUser('Julia', 'dummyuser3@telescopeapp.org');
};

Meteor.startup(function () {
  if (Users.find().fetch().length === 0) {
    createDummyUsers();
  }
  const currentUser = Users.findOne(); // just get the first user available
  if (Exercices.find().fetch().length === 0) {
    console.log('// creating dummy exercices');
    seedData.forEach(document => {
      newMutation({
        action: 'exercices.new',
        collection: Exercices,
        document: document,
        currentUser: currentUser,
        validate: false,
      });
    });
  }
});
