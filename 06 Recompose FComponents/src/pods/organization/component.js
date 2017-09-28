import {negate, every, flow, pick, values} from 'lodash/fp';
import React from 'react';
import { lifecycle, branch, compose, renderComponent } from 'recompose';
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

const Organization = ({members, repos}) => (
    <div className={'organization'}>
        <ul className={'card'}>
            {
                members.map((member) =>
                    <MemberListItem key={member.id} member={member} />
                )
            }
        </ul>
        <br/>
        <ul className={'card'}>
            {
                repos.map((repo) =>
                    <RepoListItem key={repo.id} repo={repo} />
                )
            }
        </ul>
    </div>
);

Organization.propTypes = {
    members : PropTypes.array.isRequired,
    repos : PropTypes.array.isRequired,
};

//Lifecoding!
const Loader = () => <div>Loading</div>;
const showLoader = (test) => branch(
    test,
    renderComponent(Loader)
);
const showNoData = (test) => branch(
    test,
    renderComponent(() => <span>No Data</span>)
);

const enhance = compose(
    //#1
    // lifecycle({
    //     componentDidMount() {
    //         this.props.fetchMembers();
    //         this.props.fetchRepos();
    //
    //     }
    // }),
    //#3 Wait till props exists
    showLoader((props) => !props.members.length || !props.repos),
    //#2 Wait till props have length

    //#6
    // showNoData((props) => !props.members.length || !props.repos.length),
    //#7
    showNoData((props) => !props.members.length),
);

export const OrganizationComponent = enhance(Organization);

OrganizationComponent.propTypes = {
    members : PropTypes.array.isRequired,
    repos : PropTypes.array.isRequired,
};
