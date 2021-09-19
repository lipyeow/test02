import "./App.css";

import React from "react";
import { Widget } from "./Widget.js";
import { ApolloProvider } from "@apollo/client/react";
import Grid from "@material-ui/core/Grid";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://127.0.0.1:4000/graphql",
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "no-cors",
  },
});

function App(args) {
  return (
    <div className={{ flexGrow: 1 }} style={{ maxWidth: "100%" }}>
      <Grid
        container
        spacing={5}
        direction="row"
        alignContent="flex-start"
        alignItems="center"
        justifyContent="flex-start"
      >
        <ApolloProvider client={client}>
          {args.spec.widgets.map((spec) => (
            <Widget key={"widget_" + spec.id} wspec={spec} gqlclient={client}/>
          ))}
        </ApolloProvider>
      </Grid>
    </div>
  );
}

export { App };
