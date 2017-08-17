# 02 React App

In this sample we are going to setup a basic React application, it will:

  - Load a list of members belongign a team from Github.
  - Display it in table like format.

We will take as starting point sample _01 Services_.

Summary steps:

- Create a _./src/pods/Organization/container_ component, 
. 
- Create a _./src/pods/Organization/OrganizationComponent_.
- Instantiate this component on the _app.js_
- In componentWillMount load the data from fetch members.
- Create a _membersrow_ component.
- Create a _members_ component.
- use in in our  _./src/pods/Organization/OrganizationComponent_

# Prerequisites

Ensure all the packages has been installed:

```
yarn install
```

## Steps to build it


- Create a container component 

_./src/pods/Organization/container.jsx_

```javascript
import React, { Component } from 'react';

export class OrganizationContainer extends Component {
  render() {
    return (
      <h1>Hello from container</h1>
    );
  }
}

export default OrganizationContainer;
```

- We will expose it to the app via an index file

_./src/pods/organization/index.js_
```javascript
export * from './container';
```

- Let's instantiate this container in the app.js file:

_./src/App.js_

```diff
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
-        <div className="App-header">
-          <img src={logo} className="App-logo" alt="logo" />
-          <h2>Welcome to React</h2>
-        </div>
-        <p className="App-intro">
-          To get started, edit <code>src/App.js</code> and save to reload.
-        </p>
      </div>
    );
  }
}

export default App;
```

- Let's add state to this component and add the list of members, and Create a method that will return just mock data (we  will have data to 
build & test the child components)


_./src/pods/Organization/container.jsx_

```diff
import React, { Component } from 'react';

export class OrganizationContainer extends Component {

+constructor(props) {
+  super(props);
+  
+  this.state = {
+    members : [],
+  }
+}

+ fetchTeamMembers() {
+    this.setState({
+     members : [
+       {
+         id: 1457223,
+         login: 'testuser1'
+       },
+       {
+         id: 1852223,
+         login: 'testuser2'
+       },
+     ],
+   })
+ }

  render() {
    return (
      <h1>Hello from container</h1>
    );
  }
}

export default OrganizationContainer;
```

- In the child component let's consume this method and a property to hold the
members array.

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class OrganizationComponent extends Component {

  render() {
    return (
      <h3>Hello from component</h3>        
    );
  }
}

OrganizationComponent.propTypes = {
  members : PropTypes.array.isRequired,
  fetchMembers : PropTypes.func.isRequired,
}
```


- Let's tie them together.

```javascript
import React, { Component } from 'react';
+import { OrganizationComponent } from './component'

export class OrganizationContainer extends Component {

//...

  render() {
    return (
+      <OrganizationComponent
+        members={this.state.members}
+        fetchMembers={this.fetchTeamMembers}
+      />
    );
  }
}

export default OrganizationContainer;
```

- Now our child component will hook to componenDidMount and make the call
to load the members list, then render it (simple ul/li).

```diff
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class OrganizationComponent extends Component {

+  componentDidMount() {
+    this.props.fetchMembers();
+  }

  render() {
    return (
-      <h3>Hello from component</h3>  
+      <ul>
+      {
+        this.props.members.map((member) => 
+         <li key={member.id}>
+           <span>{member.login}</span>
+         </li>                  
+        )
+      }
+      </ul>     
    );
  }
}

OrganizationComponent.propTypes = {
  members : PropTypes.array.isRequired,
  fetchMembers : PropTypes.func.isRequired,
}
```
- Cool, we can just see how the component behave using mock data, why not using real data? We only
need to update the container, children components won't need any change.

```diff
import React, { Component } from 'react';
import { OrganizationComponent } from './component'
+ import { fetchMembers } from '../../rest-api'

export class OrganizationContainer extends Component {

  constructor(props) {
    super(props);  

    this.state = {
      members : [],
    }    
  }

  fetchTeamMembers = () => {    
-    this.setState({
-      members : [
-        {
-          id: 1457223,
-          login: 'testuser1'
-        },
-        {
-          id: 1852223,
-          login: 'testuser2'
-        },
-      ],
-    })

+  fetchTeamMembers = () => {
+    fetchMembers().then((members) =>
+      this.setState({
+        members: members,
+      })
+    );
  }  
     

  }  

  render() {
    return (
      <OrganizationComponent
        members={this.state.members}
        fetchMembers={this.fetchTeamMembers}
      />
    );
  }
}

export default OrganizationContainer;
```

## Next step

Now that we have our simple react build, let's see how easy is to integrate it
with redux.


