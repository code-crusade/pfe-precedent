Meteor.methods({
  deleteUsers() {
    if (Meteor.users.findOne({ _id: Meteor.userId() }).isAdmin) {
      return Meteor.users.remove({
        $or: [{ isAdmin: { $exists: false } }, { isAdmin: false }],
      });
    }
  },
});
