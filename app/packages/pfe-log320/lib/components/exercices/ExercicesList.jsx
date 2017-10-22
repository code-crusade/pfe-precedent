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

import UserImport from '../userImport/UserImport';

const ExercicesList = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
}) => (
    <div>
      <div style={{ maxWidth: '1000px', margin: '20px auto' }}>
        {/* user accounts */}
        {currentUser ? <h4>Bienvenue {currentUser.username}</h4> : null}
        <div
          style={{
            padding: '20px 0',
            marginBottom: '20px',
            borderBottom: '1px solid #ccc',
          }}
        >
          <Components.AccountsLoginForm />
        </div>

        {loading ? (
          <Loading />
        ) : (
            <div className="exercices">
              <UserImport currentUser={currentUser} />
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
                  <p>No more items.</p>
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
