import Users from 'meteor/vulcan:users';
import { newMutation } from 'meteor/vulcan:core';
import XLSX from 'xlsx';

const createUser = function({ firstName, lastName, idNumber, email }) {
  const user = {
    firstName,
    lastName,
    username: idNumber,
    email,
    emails: [{ address: email, verified: false }],
    groups: ['student'],
  };
  const userResult = newMutation({
    collection: Users,
    document: user,
    validate: false,
  });
  Accounts.setPassword(userResult._id, email);
};

const importUsersFromFile = data => {
  const wb = XLSX.read(data, { type: 'binary' });
  /* Get first worksheet */
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  /* Convert array of arrays */
  const result = XLSX.utils.sheet_to_json(ws, { header: 1 });
  /* Create users */
  result.forEach((user, index) => {
    if (index !== 0) {
      const [firstName, lastName, idNumber, email] = user;
      createUser({ firstName, lastName, idNumber, email });
    }
  });

  return true;
};

Meteor.methods({
  importUsersFromFile: ({ data }) => importUsersFromFile(data),
});
