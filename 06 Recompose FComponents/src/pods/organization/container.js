import React, { Component } from 'react';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';
import { OrganizationComponent } from './component'
import { loadMembersRequest, loadReposRequest } from './actions';

const mapStateToProps = (state) => ({
  members: state.organization,
});

const mapDispatchToProps = (dispatch) => ({
    fetchMembers: () => dispatch(loadMembersRequest())  ,
    fetchRepos: () => dispatch(loadReposRequest())
});

export const OrganizationContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    //#8
    lifecycle({
        componentDidMount() {
            this.props.fetchMembers();
            this.props.fetchRepos();
        }
    }),
)(OrganizationComponent);

export default OrganizationContainer;


