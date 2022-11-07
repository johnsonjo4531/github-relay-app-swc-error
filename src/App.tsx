import React, {Suspense} from "react";
import "./App.css";
import {graphql} from "react-relay";
import {RelayEnvironmentProvider, loadQuery} from "react-relay/hooks";
import RelayEnvironment, {myEnvironmentKey} from "./RelayEnvironment";
import type {GraphQLTaggedNode, OperationType} from "relay-runtime";
import type {PreloadedQuery} from "react-relay";
import {
  AppRepositoryNameQuery,
  AppRepositoryNameQuery$data,
} from "./__generated__/AppRepositoryNameQuery.graphql";
import {graphQLSelector, RecoilRelayEnvironmentProvider} from "recoil-relay";
import {RecoilRoot, useRecoilValue} from "recoil";

// Define a query
const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery {
    repository(owner: "facebook", name: "relay") {
      name
    }
  }
`;
console.log(RepositoryNameQuery);
const repositoryNameSelector = graphQLSelector<{}, AppRepositoryNameQuery$data>(
  {
    key: "RepoName",
    query: RepositoryNameQuery,
    environment: myEnvironmentKey,
    variables: {},
    mapResponse: (data) => data,
  }
);

// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery: PreloadedQuery<
  AppRepositoryNameQuery,
  Record<string, unknown>
> = loadQuery(RelayEnvironment, RepositoryNameQuery, {
  /* query variables */
});

// Inner component that reads the preloaded query results via `usePreloadedQuery()`.
// This works as follows:
// - If the query has completed, it returns the results of the query.
// - If the query is still pending, it "suspends" (indicates to React that the
//   component isn't ready to render yet). This will show the nearest <Suspense>
//   fallback.
// - If the query failed, it throws the failure error. For simplicity we aren't
//   handling the failure case here.
function App(props: {
  preloadedQuery: PreloadedQuery<
    AppRepositoryNameQuery,
    Record<string, unknown>
  >;
}) {
  const data = useRecoilValue(repositoryNameSelector);

  return (
    <div className="App">
      <header className="App-header">
        <p>{data.repository?.name}</p>
      </header>
    </div>
  );
}

// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
function AppRoot() {
  return (
    <RecoilRoot>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <RecoilRelayEnvironmentProvider
          environment={RelayEnvironment}
          environmentKey={myEnvironmentKey}
        >
          <Suspense fallback={"Loading..."}>
            <App preloadedQuery={preloadedQuery} />
          </Suspense>
        </RecoilRelayEnvironmentProvider>
      </RelayEnvironmentProvider>
    </RecoilRoot>
  );
}

export default AppRoot;
