import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class OrganizationComponent extends Component {

  componentDidMount() {
    this.props.fetchMembers();
  }

  render() {    
    return (
      <ul>
      {
        this.props.members.map((member) => 
         <li key={member.id}>
           <span>{member.login}</span>
         </li>                  
        )
      }
      </ul>
    );
  }
}

OrganizationComponent.propTypes = {
  members : PropTypes.array.isRequired,
  fetchMembers : PropTypes.func.isRequired,
}