import React from 'react';
import PropTypes from 'prop-types';

const MemberListItem = ({member}) => (
  <li>
      <img src={member.avatar_url} width={30} height={30}/>
      <span>{member.login}</span>
  </li>  
);

const RepoListItem = ({repo}) => (
  <li>
      <span>{repo.name}</span>
  </li>
);

const memberToListItem = (member) => <MemberListItem key={member.id} member={member} />;
const repoToListItem = (repo) => <RepoListItem key={repo.id} repo={repo} />;

export const OrganizationComponent = ({members, repos}) => (
    <div className={'organization'}>
        <ul className={'card'}>
            {members.map(memberToListItem)}
        </ul>
        <br/>
        <ul className={'card'}>
            {repos.map(repoToListItem)}
        </ul>
    </div>
);

OrganizationComponent.propTypes = {
    members : PropTypes.array.isRequired,
    repos : PropTypes.array.isRequired,
};
