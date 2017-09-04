import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrganizationComponent } from './component'
import { loadMembersRequest } from './actions';



const mapStateToProps = (state) => ({
  members: state.members,
});

const mapDispatchToProps = (dispatch) => ({
    fetchMembers: () => dispatch(loadMembersRequest())  
})

export const OrganizationContainer = connect(mapStateToProps)(OrganizationComponent);

export default OrganizationContainer;
