import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MemberListItem = ({member}) => (
    <li>
        <img src={member.avatar_url} width={30} height={30}/>
        <span>{member.login}</span>
    </li>  
);

export class OrganizationComponent extends Component {

  componentDidMount() {
    this.props.fetchMembers();
  }

  render() {    
    return (
      <ul className="card">
      {
        this.props.members.map((member) => 
         <MemberListItem key={member.id} member={member} />
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