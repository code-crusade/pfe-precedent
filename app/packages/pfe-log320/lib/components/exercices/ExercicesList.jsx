/**
 * List of exercices.
 * Wrapped with the "withList" and "withCurrentUser" containers.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Components,
  withList,
  withCurrentUser,
  Loading,
} from "meteor/vulcan:core";

import { Link } from "react-router";

import Exercices from "../../modules/exercices/collection.js";
import ExercicesItem from "./ExercicesItem.jsx";

const propTypes = {
  results: PropTypes.array,
  currentUser: PropTypes.object,
  loading: PropTypes.bool,
  loadMore: PropTypes.func,
  count: PropTypes.number,
  totalCount: PropTypes.number,
};

const ExercicesList = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
}) => (
  <div style={{ maxWidth: "500px", margin: "20px auto" }}>
    {Exercices.options.mutations.new.check(currentUser) && (
      <Link to={{ pathname: "newExercice" }}>
        <button
          className="btn btn-default"
          style={{ marginBottom: "1.5em", width: "100%" }}
        >
          Créer un nouvel exercice
        </button>
      </Link>
    )}
    {loading ? (
      <Loading />
    ) : (
      <div className="exercices">
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
);

const options = {
  collection: Exercices,
  fragmentName: "ExercicesItemFragment",
  limit: 5,
};

ExercicesList.propTypes = propTypes;

export default withList(options)(withCurrentUser(ExercicesList));
