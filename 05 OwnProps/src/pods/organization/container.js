import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrganizationComponent } from './component'
import { loadMembersRequest } from './actions';


// Temporary container once we add redux support we will remove it
export class OrganizationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
    }
  }

  fetchRepos = () => {
    this.setState({
      repos: [
        {id: 1, name: "my fake repo A"},
        {id: 2, name: "my fake repo B"},
      ],
    });
  }

  render = () =>
    <InnerOrganizationContainer repos={this.state.repos} fetchRepos={this.fetchRepos}/>  
}

export default OrganizationContainer;

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  members: state.organization,
});

const mapDispatchToProps = (dispatch) => ({
    fetchMembers: () => dispatch(loadMembersRequest())  
})

const InnerOrganizationContainer = connect(mapStateToProps,
                                             mapDispatchToProps,
                                            )(OrganizationComponent);




