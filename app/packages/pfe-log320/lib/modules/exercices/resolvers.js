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
      /*
      console.log("Exercice List");
      console.log("test term : "+JSON.stringify(terms));
      console.log("test options : "+JSON.stringify(options));   */  

      if(terms.difficultyFilter) {
        //console.log("difficultyFilter : "+terms.difficultyFilter);

        //[]
        let selectorPart1={};
        if(terms.difficultyFilter != "none") {
          selectorPart1 = { difficulty: terms.difficultyFilter };
        }
        
        let languages = [];
        if(terms.cpp == 1){
          languages.push({ "language" : "cpp"});
        }
        if(terms.csharp == 1){
          languages.push({ "language" : "csharp"});
        }

        if(terms.python == 1) {
          languages.push({ "language" : "python"});
        }

        if(terms.java == 1) {
          languages.push({ "language" : "java"});
        }        

        if(languages.length >= 1){
          selector = {$and: [selectorPart1, { $or: languages}]};
        } else {
          selector ={$and: [selectorPart1,{ "language" : "" }]};
        }                
      }

      //console.log("test selector : "+JSON.stringify(selector));

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
