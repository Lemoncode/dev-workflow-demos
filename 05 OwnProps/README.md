# Sample scope

Now that we have introduced redux, we realized we have to add a new feature to our component, but we want to focus first on UI, api calls rather than start with
the whole React / Redux  plumbing.

What can we do? We will:

  - Rename OrganizationContainer to InnerOrganization.
  - Create a wrapper component that will contain the mocked entry, and that will instantiate InnerOrganizationContainer.
  - Pass the new properties via OwnProps.
  - Update the component.
  - Are we done? Time to add redux support... (next sample)


# Steps

- Let's start by renaming our _OrganizationContainer_ to _InnerOrganizationContainer_ and remove the _export_ keyword

```diff

- export const OrganizationContainer = connect(mapStateToProps,
+ export const InnerOrganizationContainer = connect(mapStateToProps,
                                             mapDispatchToProps,
                                            )(OrganizationComponent);

- export default OrganizationContainer;
```

- Now let's add a temporary container, we will call it _OrganizationContainer_

_./src/pods/organization/container_

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
        {name: "my fake repo A"},
        {name: "my fake repo B"},
      ],
    });
  }

  render() {
    <InnerOrganizationComponent repos={this.state.repos}  fetchRepos={this.fetchRepos}/>
  }
}
```



- Now we can inject the property to the _innerOrganizationComponent_ via own props.

_./src/pods/organization/container.js_
```diff
export default OrganizationContainer;

- const mapStateToProps = (state) => ({
+ const mapStateToProps = (state, ownProps) => ({
+  ...ownProps  
  members: state.organization,
});

```

- Now let's go the Organization presentational component and add the new property and call back:

_./src/pods/organization/component.js_

```diff
OrganizationComponent.propTypes = {
  members : PropTypes.array.isRequired,
  fetchMembers : PropTypes.func.isRequired,
+  repos : PropTypes.array.isRequired,
+  fetchRepos : PropTypes.func.isRequired,  
}
```

- Let's call _fetchRepos_ on the _ComponentDidMount_ as we did with _fetchMembers()_


_./src/pods/organization/component.js_

```diff
  componentDidMount() {
    this.props.fetchMembers();
+    this.props.fetchRepos();
  }
```

- Let's add a _RepoListItem_ simple component

_./src/pods/organization/component.js_

```javascript
const RepoListItem = ({repo}) => (
  <li>
      <span>{repo.name}</span>
  </li>  
);
```

- Finally let's create a new unordered list and display the list of repos.

_./src/pods/organization/component.js_

```diff
export class OrganizationComponent extends Component {

  componentDidMount() {
    this.props.fetchMembers();
  }

  render() {    
    return (
+     <div>      
        <ul>
        {
          this.props.members.map((member) => 
          <MemberListItem key={member.id} repo={member} />
          )
        }
        </ul>
+       </br>        
+       <ul>
+       {
+         this.props.repos.map((repo) => 
+         <RepoListItem key={repo.id} member={repo} />
+        )
+       }
+      </ul>
+    </div>      
    );
  }
}

```
