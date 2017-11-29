import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "meteor/vulcan:core";
import ExercicesList from ".//ExercicesList.jsx";

const difficulties = [
  { value: "none", label: "" },
  { value: "veryEasy", label: "Très Facile" },
  { value: "easy", label: "Facile" },
  { value: "medium", label: "Moyen" },
  { value: "hard", label: "Difficile" },
  { value: "veryHard", label: "Très Difficile" },
];

const language = [
  { value: "csharp", label: "C# Mono 4.8" },
  { value: "cpp", label: "C++ 14" },
  { value: "python", label: "Python 2.7.6" },
  { value: "java", label: "Java 1.8" },
];
//[]

function toggle(bool) {
  if (bool == 0) {
    return 1;
  } else {
    return 0;
  }
}

class ExerciceFilter extends Component {
  constructor(props) {
    super(props);
    this.difficultyChange = this.difficultyChange.bind(this);
    this.toggleLanguage = this.toggleLanguage.bind(this);

    this.state = {
      difficultyFilter: "none",
      csharp: 1,
      cpp: 1,
      python: 1,
      java: 1,
    };
  }

  difficultyChange(e) {
    this.setState({ difficultyFilter: e.target.value });
  }

  toggleLanguage(e) {
    switch (e.target.name) {
      case "csharp":
        this.setState({ csharp: toggle(this.state[e.target.name]) });
        break;
      case "cpp":
        this.setState({ cpp: toggle(this.state[e.target.name]) });
        break;
      case "python":
        this.setState({ python: toggle(this.state[e.target.name]) });
        break;
      case "java":
        this.setState({ java: toggle(this.state[e.target.name]) });
        break;
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="filter">Filtre : </label>
        <select
          name="filter"
          id="filter"
          defaultValue={this.state.difficultyFilter}
          onChange={this.difficultyChange}
        >
          {difficulties.map((difficulty, index) => (
            <option key={index} value={difficulty.value}>
              {" "}
              {difficulty.label}{" "}
            </option>
          ))}
        </select>
        {language.map(
          (language, index, checked = this.state[language.value]) => (
            <div key={index} style={{ display: "inline", margin: "5px" }}>
              <label htmlFor={language.value}> {language.label} </label>{" "}
              <input
                checked={this.state[language.value] == 1}
                onChange={this.toggleLanguage}
                name={language.value}
                type="checkbox"
              />
            </div>
          )
        )}
        <ExercicesList terms={this.state} />
      </div>
    );
  }
}

ExerciceFilter.PropTypes = {
  difficultyFilter: PropTypes.string,
  csharp: PropTypes.string,
  cpp: PropTypes.string,
  python: PropTypes.string,
  java: PropTypes.string,
};
export default ExerciceFilter;
