# Frontend Docs

This file will give you an understanding of the basic structure of the frontend code. 

## Authentication
For authentication and session management, this project uses JWT (Javascript Web Tokens). 
If you have not heard of these, read [this](https://jwt.io/introduction/) page.
 
When a user authenticates themselves through a login page, the backend returns an *access token* and 
a *refresh token.* Access tokens expire in a short amount of time, and thus need to be refreshed. The
backend can give a new access token by providing a valid refresh token. An access token is a unique user
identifier, and allows the backend to recognize a user and thus authenticate them. As with any cookie
or access token, if an access token is stolen, the stealer can impersonate the user. This is why access
tokens are short lived.

Whenever a user receives new tokens from the backend, they are stored in their browser's localStorage. This
allows them to be read in future visits to the website and sent along with requests.

Since most requests to the backend require authentication, there is a custom instance of `Axios` that 
appends the user's access token to all requests. `Axios` is a Javascript library for sending asynchronous 
GET/POST requests to endpoints. This is what communicates to the backend. 

The custom `Axios` instance is returned from `axiosInstance.js`. Any file that needs to communicate with
the backend should `import axios from 'axiosInstance';` and **not** the default `Axios` that comes with 
the library.

When the custom `axiosInstance` makes a request (with tokens attached), the server may respond with
a 401 (access forbidden). This may happen if the access token sent is expired. In this situation,
a request to refresh the token is made; upon a new access token being granted, the original request will
be re-tried. If the 401 was *not* due to an expired token, the error will be returned to the client
(which may be because, for example, they are accessing a page they do not have permission to). If the call to
refresh the token fails (due to an expired refresh token), the user is redirected to the login page and their
original request is abandoned. 

## Creating a new page
Creating a new page requires 4 steps:
1. Configuring the endpoint name (route)
2. Creating a (possibly hidden) entry on the sidebar for it
3. Creating the actual page
4. Linking the page to the `Router`

We will go through these four steps for a new page `TestPage` which is located at the `/test` endpoint.

### Configuring the Endpoint Name
Inside of `constants/routes.js`, create a new export for the endpoint string. This will allow us to easily
change the endpoint name in the future. 

```Javascript
// constants/routes.js

...
export const TEST_PAGE = '/test'
```

### Creating a Sidebar Entry
The sidebar is an independent component that reads its data from `constants/nav.js`. This file exports
an array of sidebar entries. Each object in the array corresponds to a *sidebar group* (i.e. Home, House Gov,
etc.). If you want to create a new group, add the group name to `CATEGORIES` and add a new object in the
`LINKS` array. 

**Important:** if you are adding a new group, you must add appropriate color information to
`theme.js`. The `sidebarColorsOrder` array has entries that correspond go the colors in `CATEGORIES`, and
the hex for each color in `sidebarColorsOrder` needs to be defined for `topbarColors`, `baseColors`, and 
`hoverColors`.

In this example, we will add our `TestPage` to the Home group. 
```javascript
// constants/nav.js

export const LINKS = [
  [
    { url: ROUTES.HOME, name: "Home" },
    ...
    { url: ROUTES.TEST_PAGE, name: "Test Page" },
    { url: ROUTES.LIBRARY, name: "Library Catalog" },
   ...
   ],
   ...
]
```

### Creating the Page
We will create a new `TestPage.js` inside of `pages/Home`. `pages` is organized on a sidebar group level,
so each sub-directory of `pages` corresponds to a group on the sidebar. 

Every page should return a `BasePage` with their content inside of it. Here is a minimal example of how to
create this

```javascript
// pages/Home/TestPage

import React, { Component } from "react";
import BasePage from '../BasePage';

class TestPage extends Component {

  render() {
    return (
      <BasePage>
        Welcome to the test page!
      </BasePage>
    );
  }
}
export default HomePage;
```

### Linking to the Router
To route requests to endpoints, the project uses `ReactRouter`. All requests go to `index.js`, and the
correct page is loaded based on the endpoint in the URL. This routing is all done by the `Router` inside
of `index.html`. Thus, to add our page, all we have to do is

```javascript
// index.js

...
import TestPage from './pages/Home/TestPage';

...

<Router history={history}>
    ...
    <Route exact path={ROUTES.TEST_PAGE} component={TestPage} />
    ...
</Router>
```

This page is open to the public. If we want to restrict our page to, for example, Administrators only,
we would do

```javascript
<Route exact path={ROUTES.TEST_PAGE} component={adminOnly(TestPage)} />
```

`adminOnly` is a React Higher-Order-Component (HOC) that enforces the currently-logged in user to have
administrative status. This information is stored in `localStorage` and is provided by the backend
when a user logins.