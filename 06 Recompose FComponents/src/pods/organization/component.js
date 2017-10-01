import React from 'react';
import PropTypes from 'prop-types';
import {openable} from "../recompose-demo/openable";

// const MemberListItem = ({member}) => (
//   <li>
//       <img src={member.avatar_url} width={30} height={30}/>
//       <span>{member.login}</span>
//   </li>
// );

//TODO WJ: Talk about this if time available
const MemberListItem = openable(({isOpen, toggleOpen, member}) => (
  <li key={member.login}>
      <img src={member.avatar_url} width={30} height={30}/>

      <div>
        <span onClick={toggleOpen}>{member.login}</span>
        {isOpen && (
          <div>{member.description}</div>
        )}
      </div>
  </li>
));

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
