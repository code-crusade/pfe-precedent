/**
 * Three resolvers are defined:
 * - list (e.g.: exercicesList(terms: JSON, offset: Int, limit: Int) )
 * - single (e.g.: exercicesSingle(_id: String) )
 * - listTotal (e.g.: exercicesTotal )
 */
import {addGraphQLResolvers, addGraphQLQuery} from 'meteor/vulcan:core'

// basic list, single, and total query resolvers
const resolvers = {
  filter: {
    name : 'exercicesfilter',
    ExercicesFilter(root, {terms}, context) {
      console.log("Exercice Filter");
      console.log("Terms : "+terms);
      const selector = {};
      console.log(terms.difficultyFilter);

      console.log("Selector : "+JSON.stringify(selector));
      

      const exercices = context.Exercices.find(selector).fetch();
      console.log("Nb result : "+ exercices.length);
      return exercices;
    },
  },
  list: {
    name: 'exercicesList',
    resolver(root, { terms = {} }, context, info) {
      let { selector, options } = context.Exercices.getParameters(
        terms,
        {},
        context.currentUser
      );
      console.log("test term : "+JSON.stringify(terms));
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

//addGraphQLResolvers(resolvers);
//addGraphQLQuery(`ExercicesFilter(term: JSON): [Exercices]`);

export default resolvers;
