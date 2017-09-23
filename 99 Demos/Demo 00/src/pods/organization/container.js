import React, { Component } from 'react';
import { OrganizationComponent } from './component'

export class OrganizationContainer extends Component {

  constructor(props) {
    super(props);  

    this.state = {
      members : [],
    }    
  }

  fetchTeamMembers = () => {
  }  

  render() {
    return (
      <OrganizationComponent
        members={this.state.members}
        fetchMembers={this.fetchTeamMembers}
      />
    );
  }
}

export default OrganizationContainer;