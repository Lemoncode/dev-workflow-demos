# Sample scope

We assume that Functional Components are best components - hence we want to change our Class to function.

*src/pods/organization/component.js*
```diff
-    export class OrganizationComponent extends Component {

-    componentDidMount() {
-        this.props.fetchMembers();
-        this.props.fetchRepos();
-    }
-
-    render() {    
-        return (
-        <div>
-            <ul>
-            {
-            this.props.members.map((member) =>
-            <MemberListItem key={member.id} member={member} />
-            )
-            }
-            </ul>
-            <br/>
-            <ul>
-            {
-            this.props.repos.map((repo) =>
-            <RepoListItem key={repo.id} repo={repo} />
-            )
-            }
-            </ul>      
-        </div>
-        );
-    }
-    }

+ const Organization = ({members, repos}) => (
+      <div>
+          <ul>
+              {
+                  members.map((member) =>
+                      <MemberListItem key={member.id} member={member} />
+                  )
+              }
+          </ul>
+          <br/>
+          <ul>
+              {
+                  repos.map((repo) =>
+                      <RepoListItem key={repo.id} repo={repo} />
+                  )
+              }
+          </ul>
+      </div>
+  );
```


This way we have FC but no longer have `componentDidMount` hook.

So in *pods/organization/container.js*

We change

```diff javascript
+ import {compose, lifecycle} from 'recompose'

- export const OrganizationContainer = connect(mapStateToProps, mapDispatchToProps)(OrganizationComponent);

+ export const OrganizationContainer = compose(
+     connect(mapStateToProps, mapDispatchToProps),
+     lifecycle({
+         componentDidMount() {
+             this.props.fetchMembers();
+             this.props.fetchRepos();
+         }
+     }),
+ )(OrganizationComponent);
```

Attaching lifecycle hoc with our expected `componentDidMount` hook. To the container, making the container logic for fetching data separate from our component ui logic.

If we wanted additionally to add loaded while there are pending fetches we could write code like this

```javascript
 //components/showLoader.js
 const Loader = () => <div>Loading</div>;

 const showLoader = (test) => branch(
     test,
     renderComponent(Loader)
 );

```

With usage:
```javascript
export const OrganizationContainer = compose(
   connect(mapStateToProps, mapDispatchToProps),
   lifecycle({
       componentDidMount() {
           this.props.fetchMembers();
           this.props.fetchRepos();
       }
   }),
)(OrganizationComponent);
```

------------------

We have just improved the example with removal of hooks methods from ui component. But What if you had inner state to manage.

`recompose` has also hoc for that `withState` and `withStateHandler`.

```typescript
declare function withState (
  stateName: string,
  stateUpdaterName: string,
  initialState: any | (props: Object) => any
): HigherOrderComponent
```

Which is shown in example *pods\recompose-demo\cardExampleRecompose.js* That is the result of refactoring with recompose  *pods\recompose-demo\cardExample.js* 

```javascript
import * as React from "react";
import {withState} from "recompose";

const TitledCard = ({isOpen, setOpen, title, text}) => (
    <Card>
        <Title toggleOpen={() => setOpen(!isOpen)} title={title}/>
        <Body isOpen={isOpen}>{text}</Body>
    </Card>
);

export default withState("isOpen", "setOpen", false)(TitledCard)
```

In short you pass `stateKey` that of the innerState. You pass name of the function that is setter for given field. And as a third argument initialValue. 


If you dislake creating a toggleOpen function handlers that has a logic of toggling the state we can use `withStateHandlers`

```typescript
declare function withStateHandlers (
  initialState: Object | (props: Object) => any,
  stateUpdaters: {
    [key: string]: (state:Object, props:Object) => (...payload: any[]) => Object
  }
): HigherOrderComponent
```

and create

*pods\recompose-demo\openable.js*

```javascript
import {withStateHandlers} from "recompose";

export const openable = withStateHandlers(
  // Initial state
  {
    isOpen: false,
  }, {
    // Handler creator -> {...props, ...state}
    toggleOpen: ({isOpen, ...restProps}) =>
      //handler - it's result will be used to call setState of newly created hoc.
      () => ({
        isOpen: !isOpen
      }),
  }
);
```
In this example `toggleOpen()` will mean `this.setState({isOpen: !isOpen})`

Essentially allowing for

```jsx
const TitledCard = ({isOpen, toggleOpen, title, text}) => (
    <Card>
        <Title toggleOpen={toggleOpen} title={title}/>
        <Body isOpen={isOpen}>{text}</Body>
    </Card>
);

export default openable(TitledCard);
```

With same result as previous solution, but more clean and composable approach. That gives you reusable 'openable' innerStateHandler, that you can use to add behavior of openClose to any component. Essentially allowing for Functional Components with InnerState.
