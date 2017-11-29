import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "meteor/vulcan:core";
import ExerciceFilter from "./exerciceFilterForm";

class ExerciceFilterAndList extends Component {
  render() {
    return (
      <div style={{ maxWidth: "650px", margin: "20px auto" }}>
        {/* new document form */}
        <ExerciceFilter update={this.update} />
      </div>
    );
  }
}

export default ExerciceFilterAndList;
