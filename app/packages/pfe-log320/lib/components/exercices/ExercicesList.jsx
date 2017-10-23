/**
 * List of exercices. 
 * Wrapped with the "withList" and "withCurrentUser" containers.
 */

import React from 'react';
import {
  Components,
  withList,
  withCurrentUser,
  Loading,
} from 'meteor/vulcan:core';

import Exercices from '../../modules/exercices/collection.js';
import ExercicesItem from './ExercicesItem.jsx';
import ExercicesNewForm from './ExercicesNewForm.jsx';

const ExercicesList = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
}) => (
    <div>
      <div style={{ maxWidth: '500px', margin: '20px auto' }}>
        {loading ? (
          <Loading />
        ) : (
            <div className="exercices">
              {/* new document form */}
              <ExercicesNewForm />

              {/* documents list */}
              {results.map(exercice => (
                <ExercicesItem
                  key={exercice._id}
                  exercice={exercice}
                  currentUser={currentUser}
                />
              ))}

              {/* load more */}
              {totalCount > results.length ? (
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    loadMore();
                  }}
                >
                  Charger plus ({count}/{totalCount})
            </a>
              ) : (
                  <p>Fin de la liste</p>
                )}
            </div>
          )}
      </div>
    </div>
  );

const options = {
  collection: Exercices,
  fragmentName: 'ExercicesItemFragment',
  limit: 5,
};

export default withList(options)(withCurrentUser(ExercicesList));
