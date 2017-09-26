# Prerequisites

- All code downloaded.
- All packages already install.
- Project ran previously with no issues.
- Always get the code + browser side by side.

# Steps

- Talk about what the goal of this simple sample, update on requirements: 
    - Add to the current page the list repos.
    
What?! We have already redux in there, can we continue using our progressive approach.

- **RUN THE SAMPLE SIDE BY SIDE**

- Rename Container to InnerContainer.

_./src/pods/container.js_

```diff
- const OrganizationContainer = connect(mapStateToProps,
+ const InnerOrganizationContainer = connect(mapStateToProps,
                                             mapDispatchToProps,
                                            )(OrganizationComponent);
```

- Place top Container 
  - State repos method fetchRepos.
  - Render InnerContainer (IMPORTANT: we are passing new props down).

```javascript
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
```


- Pass via Ownprops repos and fetchRepos to the innerContainer.

```diff
- const mapStateToProps = (state) => ({
+ const mapStateToProps = (state, ownProps) => ({
+  ...ownProps,
  members: state.organization,
});
```

- Now we need to define this props in the presentational component

_./src/pods/organization/component.js_

```diff
OrganizationComponent.propTypes = {
  members : PropTypes.array.isRequired,
  fetchMembers : PropTypes.func.isRequired,
+  repos : PropTypes.array.isRequired,
+  fetchRepos : PropTypes.func.isRequired,  
}
```

- Call the fetchRepos onComponentwillMount:

```diff
  componentDidMount() {
    this.props.fetchMembers();
+    this.props.fetchRepos();
  }
```


- Render the list of repos (remmember place div on top).

```javascript
    <br/>
    <ul>
    {
      this.props.repos.map((repo) => 
      <RepoListItem key={repo.id} repo={repo} />
      )
    }
    </ul>      
```

> For the sake of this demo, we have already created RepoListItem stateless component.

**********************************************************
JUMP TO NEXT DEMO
**********************************************************

- [TIME PERMITTING] Show actions and reducers, remove container, rename innerContainer add props and dispatch.

show actions file

_./src/organization/actions.js_

show reducers file

_./src/organization/reducers.js_

- Let's now remove the temporary container:

```diff
- // Temporary container once we add redux support we will remove it
- export class OrganizationContainer extends Component {
-   constructor(props) {
-     super(props);
-
-     this.state = {
-       repos: [],
-     }
-   }
-
-   fetchRepos = () => {
-     this.setState({
-       repos: [
-         {id: 1, name: "my fake repo A"},
-         {id: 2, name: "my fake repo B"},
-       ],
-     });
-   }
-
-   render = () =>
-     <InnerOrganizationContainer repos={this.state.repos} fetchRepos={this.fetchRepos}/>  
- }
```

- Rename InnerContainer to Container:

```diff
- const InnerOrganizationContainer = connect(mapStateToProps,
+ const OrganizationContainer = connect(mapStateToProps,
                                             mapDispatchToProps,
                                            )(OrganizationComponent);

```

- Add the new prop and action mappings:

```diff
- import { loadMembersRequest } from './actions';
+ import { loadMembersRequest, loadReposRequest } from './actions';

//(...)

-const mapStateToProps = (state, ownProps) => ({
+const mapStateToProps = (state) => ({
-  ...ownProps,
  members: state.organization,
+  repos: state.repo,
});

const mapDispatchToProps = (dispatch) => ({
    fetchMembers: () => dispatch(loadMembersRequest())  
+    fetchRepos: () => dispatch(loadReposRequest())  
})
```

And that's all we are all in with Redux again :).