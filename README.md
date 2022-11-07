# Example app showing an Error in swc's relay plugin

tl;dr: swc-relay doesn't appear to make the option available for eagerEsModules for the relay-compiler. This seems to be causing the issue in my recoil and relay app:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'operationKind')
```

I'm using recoil and relay together and I'm having this issue as raised [here](https://github.com/facebookexperimental/Recoil/issues/1998).

I've created three seperate branches in this repository other than the `main` branch (the main branch is however uneccessary to look at as it's just the getting started guide for relay.) 
The three branches to lookat are called: `webpack-babel-relay`, `webpack-babel-relay-failing`, and `webpack-swc-relay`.

> IMPORTANT NOTE: in order to setup the three branches of the repo to work properly you have to setup your environment variables by adding a github accesstoken. Follow [the steps here in the relay getting started guide to do so](https://relay.dev/docs/getting-started/step-by-step-guide/#21-github-graphql-authentication). 

`webpack-babel-relay` is the only branch working of the three mentioned (with recoil atleast). It properly functions and produces the proper result from the following query:

```tsx
// ...
const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery {
    repository(owner: "facebook", name: "relay") {
      name
    }
  }
`;

const repositoryNameSelector = graphQLSelector<{}, AppRepositoryNameQuery$data>(
  {
    key: "RepoName",
    query: RepositoryNameQuery,
    environment: myEnvironmentKey,
    variables: {},
    mapResponse: (data) => data,
  }
);

// React component hook 
function App() {
  const data = useRecoilValue(repositoryNameSelector); // <-- this fails in the other two repos.
  // ...
```

The error that is thrown by the other two branches which are not working is:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'operationKind')
```

This is an internal Recoil error, so my code doesn't have much control over it.


`webpack-babel-relay-failing` fails the above code at the line mentioned and the only difference between it and `webpack-babel-relay` is that `webpack-babel-relay` has the eagerEsModules field set to `true` in the relay config in the package.json.

`webpack-swc-relay` fails the above code as well despite having the eagerEsModules field set to true in the relay config in the package.json. I have tried alternatives like setting swc's relay plugin configuration but nothing has seemed to work.


