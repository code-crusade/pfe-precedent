/**
 * A SimpleSchema-compatible JSON schema
 */

const schema = {
  // default properties
  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (document, currentUser) => {
      return new Date();
    },
  },
  userId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: (exercice, args, context) => {
        return context.Users.findOne(
          { _id: exercice.userId },
          {
            fields: context.Users.getViewableFields(
              context.currentUser,
              context.Users,
            ),
          },
        );
      },
      addOriginalField: true,
    },
  },

  // custom properties
  name: {
    label: 'Nom',
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  description: {
    label: 'Description',
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  language: {
    label: 'Language',
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'select',
    form: {
      options: function () {
        // options for the select form control
        return [
          { value: 'c#', label: 'C# Mono 4.8' },
          { value: 'c++', label: 'C++ 14' },
          { value: 'python', label: 'Python 2.7.6' },
          { value: 'java', label: 'Java 1.8' }
        ];
      },
    },
  },
  exercice: {
    label: 'Exercice',
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'textarea',
  },
};

export default schema;
