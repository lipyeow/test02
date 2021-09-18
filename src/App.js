import "./App.css";

import React from "react";
import { appState } from "./state.js";
import { Widget } from "./Widget.js";
import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import { cloneDeep } from "lodash";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const client = new ApolloClient({
  uri: "http://127.0.0.1:4000/graphql",
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "no-cors",
  },
});
const data_query = gql`
  query GetData($endpoint: String!, $query: String!, $args: String) {
    getData(endpoint: $endpoint, query: $query, args: $args) {
      data
      colstr
      columns {
        title
        field
      }
    }
  }
`;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function zip(cols, vals) {
  const obj = {};
  for (var i = 0; i < cols.length; i++) {
    obj[cols[i]] = vals[i];
  }
  return obj;
}

async function prestoFetch(query, updateState) {
  // uri needs to be fudged for nginx proxy
  const url = "http://localhost:5000/presto/v1/statement";
  const hdr = new Headers();
  hdr.append("Content-Type", "text/plain");
  hdr.append("Access-Control-Allow-Origin", "*");
  hdr.append("X-Presto-User", "l002");

  const options = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    //mode: 'no-cors', // no-cors, *cors, same-origin
    headers: hdr,
    body: query, // body data type must match "Content-Type" header
  };
  console.log(url);
  console.log(options);
  var resp = {};
  try {
    resp = await (await fetch(url, options)).json();
  } catch (e) {
    console.log(e);
  }

  console.log(resp);

  const get_options = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: hdr,
  };

  // hack to handle nginx proxy
  const nextUri = resp.nextUri.replace(":8080/", ":5000/presto/");

  console.log(nextUri);
  console.log(get_options);
  var state = resp.stats.state;
  for (var i = 0; i < 8; i++) {
    await sleep(4000);
    try {
      resp = await (await fetch(nextUri, get_options)).json();
    } catch (e) {
      console.log(e);
    }
    state = resp.stats.state;
    console.log(resp);
    if (state === "FINISHING") break;
  }

  const cols = resp.columns.map((col) => {
    return col.name;
  });
  const result = {};
  result["data"] = resp.data.map((row) => {
    return zip(cols, row);
  });
  result["cols"] = cols.map((col) => {
    return { title: col, field: col };
  });
  //console.log(result);
  //  const resp = await fetch(url, options)
  //    .then((response) => { return response.text(); })
  //    .then((data) => { console.log(data);} )
  //    .catch((error) => {console.log(error);} );
  //  console.log(resp);
  updateState(result.data, result.cols);
  return result;
}

// extract a table column spec from array of recs
function extractColumnSpec(data) {
  return Object.keys(data[0]).map((x) => {
    return { title: x, field: x };
  });
}

/*
    const callbacks = {
      handleClick: (id) => this.handleClick(id),
      handleTextChange: (id, event) => this.handleTextChange(id, event),
      handleSelectChange: (id, event) => this.handleSelectChange(id, event),
      handleTabChange: (id, event, newValue) => this.handleTabChange(id, event, newValue),
      updateData: (id, d, c) => this.updateData(id, d, c),
    };
*/

function App(args) {
  /*
  const runUrlFetchQuery = (qid) => {
    console.log("Run Url Fetch Query: " + qid);
    const objState = init_fetch_state[qid].state;
    const setObjState = init_fetch_state[qid].setState;
    const url = objState.query;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("runUrlFetchQuery : " + data);
        let copyState = cloneDeep(objState);
        copyState.data = cloneDeep(data);
        copyState.cols = extractColumnSpec(data);
        setObjState(copyState);
      });
  };

  // initialize the data that depends on initial fetch query
  React.useEffect(() => {
    init_fetch_queries.map((wspec) => {
      runUrlFetchQuery(wspec.id);
      return null;
    });
  }, []);

*/
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
            <Widget key={"widget_" + spec.id} wspec={spec} />
          ))}
        </ApolloProvider>
      </Grid>
    </div>
  );
}

/*
class OldApp extends PureComponent {
  handleTextChange(id, event) {
    console.log("handleTextChange(" + id + "): ");
    //console.log(this.state);
    this.staging[id].value = event.target.value;
  }

  handleSelectChange(id, event) {
    console.log("handleSelectChange(" + id + "): ");
    //console.log(this.state);
    this.staging[id].value = event.target.value;
    this.setState(this.staging);
  }
  runPrestoQuery(qid) {
    console.log("Run Presto Query: " + qid);
    prestoFetch(this.staging[qid].query, (data, cols) => {
      this.staging[qid].data = data;
      this.staging[qid].cols = cols;
      console.log(this.staging);
      this.setState(this.staging);
    });
  }
  runNativeQuery(qid) {
    // Extract the values for the endpoint query params
    const args = [];
    for (const a of this.staging[qid].args) {
      //console.log(a);
      args.push(this.staging[a.from].value);
    }
    const vars = {
      endpoint: this.staging[qid].endpoint,
      query: this.staging[qid].query,
      args: JSON.stringify(args),
    };
    client.query({ query: data_query, variables: vars }).then((result) => {
      console.log(result);
      console.log("Before setting data: staging = ");
      console.log(this.staging);
      console.log("qid = " + qid);
      this.staging[qid].data = JSON.parse(result.data.getData.data);
      // TODO: should be smart application of colspecs on the cols
      this.staging[qid].cols = JSON.parse(result.data.getData.colstr);
      console.log("Before setState: staging = ");
      console.log(this.staging);
      this.setState(this.staging);
    });
  }
  runConstantQuery(qid) {
    console.log("Run Constant Query: " + qid);
    this.staging[qid].data = this.staging[qid].query.data;
    this.staging[qid].cols = this.staging[qid].query.cols;
    console.log(this.staging);
    this.setState(this.staging);
  }

  handleClick(id) {
    console.log("handleClick(" + id + "): ");
    const qid = this.staging[id].trigger;
    switch (this.staging[qid].backend) {
      case "presto":
        this.runPrestoQuery(qid);
        break;
      case "native":
        this.runNativeQuery(qid);
        break;
      case "constant":
        this.runConstantQuery(qid);
        break;
      default:
        console.log("Unrecognized backend: " + this.staging[qid].backend);
        break;
    }
  }
  render() {
  }
}
*/

export { App };
