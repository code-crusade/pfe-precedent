import React, { Component } from 'react';
import { Components  } from 'meteor/vulcan:core';
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
        this.updateURL = this.updateURL.bind(this); 
        this.difficultyChange = this.difficultyChange.bind(this); 
        this.toggleLanguage = this.toggleLanguage.bind(this); 
        let difficultyFilter = props.location.query["difficultyFilter"];  

        if(difficultyFilter === undefined) {
            this.state = {difficultyFilter: "none"};
        } else {
            this.state = {difficultyFilter: difficultyFilter};
        }          
        
        language.forEach(({label, value})=> {this.state[value] = (props.location.query[value] == 0) ? (props.location.query[value]) : (1)});
        
    }

    updateURL(){
        let newUrl = `?difficultyFilter=${this.state.difficultyFilter}`; 
        language.forEach(({label, value})=> {newUrl= newUrl+"&"+value+"="+this.state[value]});
        this.props.router.replace(newUrl);       
    }

    difficultyChange(e){        
        this.state["difficultyFilter"] = e.target.value;                
        this.updateURL();   
    }

    toggleLanguage(e){        
        if(this.state[e.target.name] == 0) {
            this.state[e.target.name] =1;
        } else {
            this.state[e.target.name] = 0;
        }
        
        this.updateURL();
    }

    render() {        
        return (
            <div>
            <label htmlFor="filter">Filtre : </label>
            <select name="filter" id="filter" defaultValue={this.state.difficultyFilter} onChange={this.difficultyChange}> 
              {difficulties.map((difficulty, index) => <option key={index} value={difficulty.value}>  {difficulty.label} </option> )}             
            </select>            
            {language.map((language, index, checked=this.state[language.value]) =><div key={index} style={{ display : 'inline', margin: '5px' }}><label htmlFor={language.value}> {language.label} </label> <input checked={this.state[language.value]==1} onChange={this.toggleLanguage} name={language.value} type="checkbox" /></div>)}    
          </div>
        )
    }
}
export default withRouter(ExerciceFilter);


