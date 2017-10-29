/**
 * Three resolvers are defined:
 * - list (e.g.: exercicesList(terms: JSON, offset: Int, limit: Int) )
 * - single (e.g.: exercicesSingle(_id: String) )
 * - listTotal (e.g.: exercicesTotal )
 */

// basic list, single, and total query resolvers
const resolvers = {
  list: {
    name: 'exercicesList',
    resolver(root, { terms = {} }, context, info) {
      let { selector, options } = context.Exercices.getParameters(
        terms,
        {},
        context.currentUser
      );
      return context.Exercices.find(selector, options).fetch();
    },
  },
  single: {
    name: 'exercicesSingle',
    resolver(root, { documentId }, context) {
      const document = context.Exercices.findOne({ _id: documentId });
      return context.Users.restrictViewableFields(
        context.currentUser,
        context.Exercices,
        document
      );
    },
  },
  total: {
    name: 'exercicesTotal',
    resolver(root, { terms = {} }, context) {
      const { selector, options } = context.Exercices.getParameters(
        terms,
        {},
        context.currentUser
      );
      return context.Exercices.find(selector, options).count();
    },
  },
};

export default resolvers;
