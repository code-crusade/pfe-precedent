import Users from 'meteor/vulcan:users';

const membersActions = [
  'exercices.new',
  'exercices.edit.own',
  'exercices.remove.own',
];
Users.groups.members.can(membersActions);

const adminActions = ['exercices.edit.all', 'exercices.remove.all'];
Users.groups.admins.can(adminActions);
