import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrganizationComponent } from './component'
import { loadMembersRequest } from './actions';



const mapStateToProps = (state) => ({
  members: state.organization,
});

const mapDispatchToProps = (dispatch) => ({
    fetchMembers: () => dispatch(loadMembersRequest())  
})

export const OrganizationContainer = connect(mapStateToProps,
                                             mapDispatchToProps,
                                            )(OrganizationComponent);

export default OrganizationContainer;
