// your-app-name/src/RelayEnvironment.js
import { EnvironmentKey } from "recoil-relay";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import fetchGraphQL from "./fetchGraphQL";

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay(params: any, variables: any) {
  console.groupCollapsed(
    `fetching query ${params.name} with ${JSON.stringify(variables)}`
  );
  console.log(params.text);
  console.groupEnd();
  return fetchGraphQL(params.text, variables);
}

// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});

export const myEnvironmentKey = new EnvironmentKey("My Environment");
