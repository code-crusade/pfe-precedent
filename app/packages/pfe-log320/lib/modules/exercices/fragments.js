/**
 * Register the GraphQL fragment used to query for data
 */

import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment ExercicesItemFragment on Exercices {
    _id
    createdAt
    userId
    user {
      displayName
    }
    name
    summary
    description
    language
    exercice
    difficulty
    testType
  }
`);
