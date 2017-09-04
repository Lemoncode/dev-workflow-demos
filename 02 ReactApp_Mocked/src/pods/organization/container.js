import React, { Component } from 'react';
import { OrganizationComponent } from './component'
import { fetchMembers } from '../../rest-api'

export class OrganizationContainer extends Component {

  constructor(props) {
    super(props);  

    this.state = {
      members : [],
    }    
  }

  fetchTeamMembers = () => {
    this.setState({
      members: [
        { login: 'john' },
        { login: 'peter' },
        { login: 'mark' },
      ],
    })
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
