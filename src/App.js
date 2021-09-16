import "./App.css";

import React from 'react';
import { Widget } from './Widget.js';
import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { PureComponent, Component, forwardRef } from "react";
import Grid from '@material-ui/core/Grid';

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
function accumulateStateEntry(state, wspec) {
  switch (wspec.type) {
    case "table":
      state[wspec.id] = {
        dataref: wspec.dataref,
        cols: [],
        colspecs: wspec.colspecs,
        options: wspec.options
      };
      break;
    case "query":
      state[wspec.id] = {
        data: [],
        cols: [],
        backend: wspec.backend,
        endpoint: wspec.endpoint,
        query: wspec.query,
        args: wspec.args,
      };
      if (wspec.backend === "constant") {
        state[wspec.id].data = wspec.query.data;
        state[wspec.id].cols = wspec.query.cols;
      }
      break;
    case "text_input":
    case "menu":
      state[wspec.id] = { value: "" };
      break;
    case "button":
      state[wspec.id] = { value: "", trigger: wspec.trigger };
      break;
    case "image":
    case "text":
      state[wspec.id] = { value: wspec.value };
      break;
    case "form":
      genStateStruct(state, wspec.widgets);
      break;
    case "tabcontainer":
      state[wspec.id] = { value: 0 };
      wspec.tabs.map( (tab) => genStateStruct(state, tab.widgets) );
      break;
    default:
      break;
  }
  return state;
}

function genStateStruct(cur_state, widgets) {
  return widgets.reduce(accumulateStateEntry, cur_state);
}

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

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.spec = props.spec;
    this.state0 = genStateStruct({}, props.spec.widgets);
    this.state1 = genStateStruct({}, props.spec.widgets);
    this.staging = this.state1;
    this.state = this.state0;
    console.log(this.state);
  }

  componentDidMount(){
    this.spec.widgets.map((wspec) => {
      if (
        wspec.type === "query" &&
        wspec.backend === "urlfetch" &&
        wspec.fetch_on_init
      ) {
        this.runUrlFetchQuery(wspec.id);
      }
      return null;
    });

  }
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
  handleTabChange(id, event, newValue) {
    console.log("handleTabChange(" + id + "): ");
    //console.log(event);
    //console.log(newValue);
    //console.log(this.state);
    this.state0[id].value = newValue;
    this.state1[id].value = newValue;
    let frag = {};
    frag[id] =  this.staging[id];
    if(this.staging===this.state0){
        this.staging = this.state1;
    } else {    
        this.staging = this.state0;
    }
    this.setState(frag);
    //this.setState(this.staging);
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

  runUrlFetchQuery(qid) {
    console.log("Run Url Fetch Query: " + qid);
    let url = this.staging[qid].query;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.staging[qid].data = data;
        this.staging[qid].cols = extractColumnSpec(data);
        //console.log(this.staging);
        this.setState(this.staging);
      });
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
  generateWidget(wspec) {

    const callbacks = {
      handleClick: (id) => this.handleClick(id),
      handleTextChange: (id, event) => this.handleTextChange(id, event),
      handleSelectChange: (id, event) => this.handleSelectChange(id, event),
      handleTabChange: (id, event, newValue) => this.handleTabChange(id, event, newValue),
      updateData: (id, d, c) => this.updateData(id, d, c),
    };
    return (<Widget key={"widget_" + wspec.id}
            wspec={wspec} 
            callbacks={callbacks} 
            state={this.state} 
            widgets={this.spec.widgets}
        />);
  }

  render() {
    return (
      <div className={{flexGrow: 1}} style={{ maxWidth: "100%" }}>
        <Grid container spacing={5}
            direction="row"
            alignContent='flex-start' 
            alignItems='center' justifyContent='flex-start'
>
          <ApolloProvider client={client}>
            {this.spec.widgets.map((spec) => this.generateWidget(spec))}
          </ApolloProvider>
        </Grid>
      </div>
    );
  }
}

export default App;
