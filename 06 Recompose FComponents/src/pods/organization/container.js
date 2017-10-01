import React from 'react';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';
import { OrganizationComponent } from './component'
import { loadMembersRequest, loadReposRequest } from './actions';

const mapStateToProps = (state) => ({
  members: state.organization,
  repos: state.repo,
});

const mapDispatchToProps = (dispatch) => ({
    fetchMembers: () => dispatch(loadMembersRequest()),
    fetchRepos: () => dispatch(loadReposRequest())
});

// #3
// //Should be imported
// const Loader = () => <div>Loading</div>;

// const showLoader = (test) => branch(
//     test,
//     renderComponent(Loader)
// );

export const OrganizationContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    //#2
    lifecycle({
        componentDidMount() {
            this.props.fetchMembers();
            this.props.fetchRepos();
        }
    }),
    //#3 Wait till props have values
    // showLoader((props) => !props.members.length || !props.repos.length)
)(OrganizationComponent);

export default OrganizationContainer;
