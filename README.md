# Example App showing a problem with @swc/plugin-relay and recoil

## Setup

The following is from the relay docs and will walk you through setting up the github token needed for talking to github's graphql api.

> To start we'll need an authentication token for the GitHub API (if you're using your own GraphQL endpoint, you can skip this step):

> Open github.com/settings/tokens.

At this point you'll want to select classic token.

> Ensure that at least the repo scope is selected.
> Generate a token
> Create a file ./.env.local and add the following contents, replacing <TOKEN> with your authentication token:

```
REACT_APP_GITHUB_AUTH_TOKEN=<TOKEN>
```

