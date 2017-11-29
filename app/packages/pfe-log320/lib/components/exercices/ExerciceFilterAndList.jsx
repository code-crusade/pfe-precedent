import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Components,
} from 'meteor/vulcan:core';

import ExercicesNewForm from './ExercicesNewForm.jsx';
import ExerciceFilter from "../../modules/exercices/exerciceFilterForm";
import ExercicesList from './/ExercicesList.jsx';
import { withRouter } from 'react-router';

class ExerciceFilterAndList extends Component {    
    render(){                
        return (<div style={{ maxWidth: '650px', margin: '20px auto' }}>
            {/* new document form */}         
            <ExercicesNewForm />
            <ExerciceFilter />                        
            <ExercicesList terms={ this.props.location.query } />            
        </div>)
    }
}

export default withRouter(ExerciceFilterAndList);