# Prerequisites

- All code downloaded.
- All pacakges already installed.
- Project ran previously with no issues.
- Always get the code + browser side by side.

# Plumbing already setup 

- React application.
- Redux setup.
- Actions and reducers already in place (not connected).
   - Should container actions and reducers for both teams and repos.
- Github API file already created.

- ZOOM IT !!

# Steps


- Talk about what the goal of this simple sample: just display a list of GitHub users. Is just to follow how we can develop using a progressive approach.

- **RUN THE SAMPLE SIDE BY SIDE**

- [Already implemented] Quickly show   
   - Presentational Component.

   _./src/pods/organization/component_

- Explain a OrganizationContainer with:
   - State: harcoded data.
   - Method: FetchTeamMembers.
   - OrganizationContainer will render OrganizationComponent.

- Implement a hardcode solutions for the FetchTeamMembers

```diff
export class OrganizationContainer extends Component {

  constructor(props) {
    super(props);  

    this.state = {
      members : [],
    }    
  }

  fetchTeamMembers = () => {
+    this.setState({
+      members: [
+        { login: 'john' },
+        { login: 'peter' },
+        { login: 'mark' },
+      ],
+    })
  }  
```

** WORKING? YEAH ! ****

- Next step can we connect with the remote API? Let's go for that

```diff
import React, { Component } from 'react';
import { OrganizationComponent } from './component'
+ import { fetchMembers } from '../../rest-api'
```

- Replace by real data (Github API call).

```diff
  fetchTeamMembers = () => {
+    fetchMembers().then((members) =>
+      this.setState({
+        members: members,
+      })      
+    );
-    this.setState({
-      members: [
-        { login: 'john' },
-        { login: 'peter' },
-        { login: 'mark' },
-      ],
-    })        
  }
```

- Time to jump into Redux, show:

   - Already created action.

_./src/pods.organization/actions.js_

   - Already created reducer.

_./src/pods/organization/reducers.js_


- Replace our ReactContainer with a ReduxContainer (mapToProps, DispatchToProps)...

```javascript
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
```


