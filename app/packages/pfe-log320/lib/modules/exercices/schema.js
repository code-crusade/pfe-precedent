import ExercicesFormIde from '../../components/exercices/ExercicesFormIde';
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
    control: 'textarea',
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
          { value: 'csharp', label: 'C# Mono 4.8' },
          { value: 'cpp', label: 'C++ 14' },
          { value: 'python', label: 'Python 2.7.6' },
          { value: 'java', label: 'Java 1.8' },
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
    control: ExercicesFormIde,
  },
  difficulty: {
    label: 'Difficulté',
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
          { value: 'easy', label: 'Facile' },
          { value: 'medium', label: 'Moyen' },
          { value: 'hard', label: 'Difficile' },
          { value: 'veryHard', label: 'Très Difficile' },
        ];
      },
    },
  },
  testType: {
    label: 'Type de test',
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'radiogroup',
    form: {
      options: function () {
        // options for the select form control
        return [
          { value: 'practice', label: 'Pratique' },
          { value: 'validation', label: 'Validation' },
        ];
      },
    },
  },
};

export default schema;
