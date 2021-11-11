# Anti-Patterns

## Everything in Redux

Redux is awesome. It optimizes performance behind the scenes and lets us easily tap into the global state of the application.

There are several drawbacks with this approach:

* The code loses intent. If everything is in Redux, it is not clear if the code is supposed to have local or global scope. It becomes trickier to make changes because there is less confidence about the parts of the application that will be affected.
* Performance degrades when Redux is used for frequent events, like tracking form input. Since Redux affects the global state of the application, it is guaranteed to cause more re-renders.

**The rule of thumb**: Only use Redux for truly global data, like user session or application theme. For anything else, contexts for specific parts of the application.

## Storing everything as a State

Another issue that new developers run into is under-utilizing the concept of derived state.

A lot of variables can be computed on the fly. For example, say there is an array of checkbox items. `checkedCount` does not need to be stored in the state. It can be derived by going through the array of items and filtering the checked ones on each render.

**The rule of thumb**: Before storing a variable in the state, ask: “Can it somehow be derived from other data?"

## Passing `props` using Spread Operator

Passing `props` to a child component using `{ ...props }`. It looks neat, the code may look more concise. But the truth is that over time the code will be less predictable and harder to understand.

Using this as a pattern means that it is not immediately clear which `props` your child components actually need. Refactoring becomes almost impossible. Even small refactoring efforts will open up a can of worms. Plus it is much harder to track bugs in the component tree.

**The rule of thumb**: Generally avoid passing props using the spread operator. One time when it is justified is when writing a container component that renders and enhances it's children.

## Declaring Components inside of Components

Declaring component inside of another one looks like this ...

```javascript
import { useState } from 'react';

function OuterComponent() {
  const [count, setCount] = useState(0);

  const InnerComponent = () => {
    return <p>Hello World { count }</p>;
  };

  return (
    <div>
      <InnerComponent />
    </div>
  );
}
```

Writing components inside of their parents is a bad idea for two reasons:

* The code becomes tightly coupled. The inner component becomes dependent on the closure scope of it's parent.
* Performance degrades. The parent component will re-create the declaration function of the child component on each render.

**The rule of thumb**: Avoid declaring components inside their parents.

## Passing Too Much Information to Components

It is good to be stingy with how much components know about. Try to keep the separation between smart and presentational components in mind when deciding how much data to pass.

Presentational components are components that solely output HTML. They do not hold state and are not handling any behavioral logic.

Smart components usually handle state and provide data and behavior to presentational components by making API requests, mutating redux, etc.

With presentational components, only pass data necessary for it to render. Presentational components should not decide whether to render their content. That logic should be handled by the smart components instead.

For example, take a look at this code ...

```javascript
import { useSelector } from 'react-redux';
import { getUsers, getCurrentUser } from './selectors/users';

function PresentationalComponent({ users, currentUser }) {
  const userFound = users.find((item) => item.id === currentUser.id);

  if (!userFound) return null;
  return (
    <div>
      <p>Welcome!</p>
    </div>
  );
}

function SmartComponent() {
  const users = useSelector(getUsers);
  const currentUser = useSelector(getCurrentUser);

  return (
    <div>
      <PresentationalComponent users={ users } currentUser={ currentUser } />
    </div>
  );
}
```

When inspecting the parent component, it is not clear that the child component has conditional rendering logic. This code can be clarified by resurfacing the conditional logic and letting the parent component decide whether to render its child.

```javascript
import { useSelector } from 'react-redux';
import { getUsers, getCurrentUser } from './selectors/users';

function PresentationalComponent() {
  return (
    <div>
      <p>Welcome!</p>
    </div>
  );
}

function SmartComponent() {
  const users = useSelector(getUsers);
  const currentUser = useSelector(getCurrentUser);

  const userFound = users.find((item) => item.id === currentUser.id);
  return (
    <div>
      { userFound && <PresentationalComponent />
    </div>
  );
}
```

When possible, pass only primitives to presentational components. Doing so simplifies optimizing their performance later on.

```javascript
function PresentationalComponent({ user }) {
  return (
    <div>
      <p>
        Welcome { user.firstname } { user.lastname }
      </p>
      <p>
        Your last login was on { user.date }
      </p>
    </div>
  );
}
```

Instead pass the user’s first name, last name, and date:

```javascript
function PresentationalComponent({ first, last, date }) {
  return (
    <div>
      <p>
        Welcome { `${ first } ${ last }` }
      </p>
      <p>
        Your last login was on { date }
      </p>
    </div>
  );
}
```


This makes it easier to reduce the number of re-renders using `React.memo`. The reason is that React compares object props based on the reference, while primitives are compared based on value.

To summarize, here are the problems with passing too much information to components:

* Harder to distinguish between smart and presentational components. The primary logic of the application should be handled by smart components, while presentational ones solely output HTML.
* Performance worsens. When passing too many props to the component, it will re-render each time those props change, resulting in redundant re-renders.

## Overoptimizing performance

Sometimes developers start optimizing their code before there is any real issue. This is a bad practice for two simple reasons:

* Complicated and over-engineered code. Trying to solve the problem before there is one is the surest way to overcomplicate the code.
* Wasted time. Build out new features and solve the problems that matter instead.

Intelligently separating smart and presentational components solves a large percentage of the performance issues in React applications.

## Huge component trees

Usually, this problem arises when the developer does not take time to properly separate the logical and presentational pieces of the code.

For example, take a look at this component:

```javascript
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUsers, getCurrentUser } from './selectors/users';
import { trackAction } from './tracker';
import { Avatar } from './UserAvatar';

function LargeComponentTree({ user, isAuthenticated, avatar }) {
  const history = useHistory();

  return (
    <div>
      { isAuthenticated && avatar && !avatar.isExpired && <Avatar /> }
      { isAuthenticated ? (
        <>
          <p>Welcome! { `${ user.first } ${ user.last }` }</p>
          <p>Your last login was on { user.date }</p>
        </>
      ) : null }
      <div>
        <button onClick={ () => {
          history.push('/settings');
          trackActions('Click', 'Settings button');
        } }>Settings</button>
        <button onClick={ () => {
          history.push('/my_page');
          trackActions('Click', 'My page button');
        } }>My Page</button>
        <button onClick={ () => {
          history.push('/logout');
          trackActions('Click', 'Logout button');
        } }>Logout</button>
      </div>
    </div>
  );
}
```

It is very hard to decipher what is going on here. There are several areas for improvement:

* Refactor long conditional statements into separate variables.
* Separate pieces of the tree into smaller presentational components.
* Move the arrow function handlers out of the component tree.

Refactoring this component ...

```javascript
import { useHistory } from 'react-router-dom';
import { trackAction } from './tracker';
import { Avatar } from './UserAvatar';

const Greeting = ({ first, last, date }) => {
  return (
    <div>
      <p>Welcome { `${ first } ${ last }` }</p>
      <p>Your last login was on { date }</p>
    </div>
  );
}

function LargeComponentTree({ user, isAuthenticated, avatar }) {
  const history = useHistory();

  const showAvatar = isAuthenticated && avatar && !avatar.isExpired;

  const handleClick = (route, actionName) => {
    return () => {
      history.push(route);
      trackAction('Click', actionName);
    };
  };

  return (
    <div>
      { showAvatar && <Avatar /> }
      { isAuthenticated ? (
        <Greeting first={ user.first } last={ user.last } date={ user.date } />
      ) : null }
      <div>
        <button onClick={ handleClick('/settings', 'Settings button') }>Settings</button>
        <button onClick={ handleClick('/my_page', 'My page button') }>My Page</button>
        <button onClick={ handleClick('/logout', 'Logout button') }>Logout</button>
      </div>
    </div>
  );
}
```

**The rule of thumb**: Keep component trees clean so that it is easier to see what the component is supposed to be rendering and when.
