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
    language: 'cpp',
    exercice:
      'class Money\n' +
      '{\n' +
      'public:\n' +
      '    Money() : _money(9) {}\n' +
      '    virtual ~Money() {}\n' +
      '    int getMoney() { return _money; }\n' +
      '    \n' +
      '    void addMoney(int amount)\n' +
      '    {\n' +
      '        _money += amount;\n' +
      '    }\n' +
      '\n' +
      'private:\n' +
      '    int _money;\n' +
      '};\n',
    difficulty: 'easy',
    testType: 'practice',
  },
  {
    name: 'Exercice 2',
    description: 'Exercice en Java',
    language: 'java',
    exercice:
      'public class Money\n' +
      '{\n' +
      '    public int money;\n' +
      '\n' +
      '    public Money()\n' +
      '    {\n' +
      '        this.money = 9;\n' +
      '    }\n' +
      '\n' +
      '    public void addMoney(int amount)\n' +
      '    {\n' +
      '        this.money += amount;\n' +
      '    }\n' +
      '}\n',
    difficulty: 'medium',
    testType: 'practice',
  },
  {
    name: 'Exercice 3',
    description: 'Exercice en Python',
    language: 'python',
    exercice:
      'class Money:\n' +
      '    def __init__(self):\n' +
      '        self.money = 9\n' +
      '    \n' +
      '    def add_money(self, amount):\n' +
      '        self.money += amount\n' +
      '',
    difficulty: 'hard',
    testType: 'validation',
  },
  {
    name: 'Exercice 4',
    description: 'Exercice en C#',
    language: 'csharp',
    exercice:
      'public class Money\n' +
      '{\n' +
      '    public int money;\n' +
      '\n' +
      '    public Money()\n' +
      '    {\n' +
      '        this.money = 9;\n' +
      '    }\n' +
      '\n' +
      '    public void AddMoney(int amount)\n' +
      '    {\n' +
      '        this.money += amount;\n' +
      '    }\n' +
      '}\n',
    difficulty: 'veryHard',
    testType: 'validation',
  },
];

const createUser = function(username, email) {
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

var createDummyUsers = function() {
  console.log('// inserting dummy users…');
  createUser('Bruce', 'dummyuser1@telescopeapp.org');
  createUser('Arnold', 'dummyuser2@telescopeapp.org');
  createUser('Julia', 'dummyuser3@telescopeapp.org');
};

Meteor.startup(function() {
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
