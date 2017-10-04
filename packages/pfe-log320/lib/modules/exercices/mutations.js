/**
 * Define the three default mutations:
 * - new (e.g.: exercicesNew(document: exercicesInput) : Exercice )
 * - edit (e.g.: exercicesEdit(documentId: String, set: exercicesInput, unset: exercicesUnset) : Exercice )
 * - remove (e.g.: exercicesRemove(documentId: String) : Exercice )
 * 
 * Each mutation has:
 * 
 * - A name
 * - A check function that takes the current user and (optionally) the document affected
 * - The actual mutation
 */

import {
  newMutation,
  editMutation,
  removeMutation,
  Utils,
} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const mutations = {
  new: {
    name: 'exercicesNew',

    check(user) {
      if (!user) return false;
      return Users.canDo(user, 'exercices.new');
    },

    mutation(root, { document }, context) {
      Utils.performCheck(this.check, context.currentUser, document);

      return newMutation({
        collection: context.Exercices,
        document: document,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },
  },

  edit: {
    name: 'exercicesEdit',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document)
        ? Users.canDo(user, 'exercices.edit.own')
        : Users.canDo(user, `exercices.edit.all`);
    },

    mutation(root, { documentId, set, unset }, context) {
      const document = context.Exercices.findOne(documentId);
      Utils.performCheck(this.check, context.currentUser, document);

      return editMutation({
        collection: context.Exercices,
        documentId: documentId,
        set: set,
        unset: unset,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },
  },

  remove: {
    name: 'exercices',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document)
        ? Users.canDo(user, 'exercices.remove.own')
        : Users.canDo(user, `exercices.remove.all`);
    },

    mutation(root, { documentId }, context) {
      const document = context.Exercices.findOne(documentId);
      Utils.performCheck(this.check, context.currentUser, document);

      return removeMutation({
        collection: context.Exercices,
        documentId: documentId,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },
  },
};

export default mutations;
