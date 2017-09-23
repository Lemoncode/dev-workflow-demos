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
    this.props.fetchRepos();
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
        <br/>
        <ul>
        {
          this.props.repos.map((repo) => 
          <RepoListItem key={repo.id} repo={repo} />
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
  repos : PropTypes.array.isRequired,
  fetchRepos : PropTypes.func.isRequired,  
}