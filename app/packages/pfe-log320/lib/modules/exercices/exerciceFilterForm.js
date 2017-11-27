import React, { Component } from 'react';
import { Components } from 'meteor/vulcan:core';
import { withRouter } from 'react-router';

const difficulties = [
    { value: 'none', label: '' },
    { value: 'veryEasy', label: 'Très Facile' },
    { value: 'easy', label: 'Facile' },
    { value: 'medium', label: 'Moyen' },
    { value: 'hard', label: 'Difficile' },
    { value: 'veryHard', label: 'Très Difficile' },
  ];

  const language = [
    { value: 'csharp', label: 'C# Mono 4.8' },
    { value: 'cpp', label: 'C++ 14' },
    { value: 'python', label: 'Python 2.7.6' },
    { value: 'java', label: 'Java 1.8' },
  ];
  //[]
class ExerciceFilter extends Component {
    constructor(props) {
        super(props);
        this.difficultyChange = this.difficultyChange.bind(this);
        let state = props.location.query["difficultyFilter"];  
        if(state === undefined) {
            this.state = {difficultyFilter: "none"};
        } else {
            this.state = {difficultyFilter: state};
        }  
        
        //console.log(this.state["difficultyFilter"]);
    }

    difficultyChange(e){
        //console.log(e.target.value);
        this.setState({difficultyFilter : e.target.value});
        //console.log(this.state);
        /*const queryParams = this.props.location.query;
        console.log(queryParams);
        if(e.target.value != "none") {
            queryParams["difficultyFilter"] = e.target.value;
        }

        const newUrl = `/?${_.map(queryParams, ((value, key) => `${key}=${value}`)).join('&')}`;*/
        const newUrl = `?difficultyFilter=${e.target.value}`;
        //console.log(newUrl);
        this.props.router.replace(newUrl);
    }

    render() {
        return (
            <div>
            <label for="filter">Filtre : </label>
            <select name="filter" id="filter" onChange={this.difficultyChange}> 
              {difficulties.map((difficulty, index) => <option value={difficulty.value} >  {difficulty.label} </option> )}             
            </select>
          </div>
        )
    }
}
export default withRouter(ExerciceFilter);

