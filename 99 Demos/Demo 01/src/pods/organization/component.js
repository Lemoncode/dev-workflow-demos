import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MemberListItem = ({member}) => (
    <li>
        <span>{member.login}</span>
    </li>  
);

const RepoListItem = ({repo}) => (
  <li>
      <span>{repo.name}</span>
  </li>  
);


export class OrganizationComponent extends Component {

  componentDidMount() {
    this.props.fetchMembers();
  }

  render() {    
    return (
      <div>
        <ul>
        {
          this.props.members.map((member) => 
          <MemberListItem key={member.id} member={member} />
          )
        }
        </ul>
      </div>
    );
  }
}

OrganizationComponent.propTypes = {
  members : PropTypes.array.isRequired,
  fetchMembers : PropTypes.func.isRequired,
}