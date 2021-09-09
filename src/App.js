import "./App.css";

import MaterialTable from "material-table";
import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Component, forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import { app_spec } from "./appSpec";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

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

function DataTable(args) {
  console.log(args.state[args.id]);
  return (
      <MaterialTable
        icons={tableIcons}
        title={args.label}
        data={args.state[args.state[args.id].dataref].data}
        columns={args.state[args.id].colspecs.length>0 ? args.state[args.id].colspecs : args.state[args.state[args.id].dataref].cols} 
        options={args.state[args.id].options}
      />
  );
}
//    <div style={{ maxWidth: "100%" }}>
//    </div>

const useStyles = makeStyles((theme) => (
{
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    flexgrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}
));

function QueryForm(args) {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      {args.widgets.map((spec) =>
        (<Widget wspec={spec} callbacks={args.callbacks} state={args.state} widgets={args.widget}/>)
      )} 
    </form>
  );
}

function Widget(args) {
  const classes = useStyles();
  switch (args.wspec.type) {
    case "form":
      return (
        <QueryForm
          key={args.wspec.id}
          callbacks={args.callbacks}
          state={args.state}
          widgets={args.wspec.widgets}
        />
      );
    case "table":
      return (
        <Grid item xs={12}>
        <DataTable
          key={args.wspec.id}
          id={args.wspec.id}
          label={args.wspec.label}
          state={args.state}
          updateData={args.callbacks.updateData}
        />
        </Grid>
      );
    case "text_input":
      return (
        <TextField
          key={args.wspec.id}
          state={args.state}
          id="queryinput"
          label={args.wspec.label}
          onChange={(event) => args.callbacks.handleTextChange(args.wspec.id, event)}
          variant="outlined"
        />
      );
    case "menu":
      return (
        <FormControl
          key={args.wspec.id}
          state={args.state}
          variant="filled"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-filled-label">
            {args.wspec.label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="qtypedropdown"
            value={args.state[args.wspec.id].value}
            onChange={(event) => args.callbacks.handleSelectChange(args.wspec.id, event)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {args.wspec.values.map((v) => {
              return (
                <MenuItem key={v.id} value={v.value}>
                  {v.display}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    case "button":
      return (
        <Button
          key={args.wspec.id}
          state={args.state}
          id={args.wspec.id}
          trigger={args.wspec.trigger}
          variant="contained"
          onClick={() => args.callbacks.handleClick(args.wspec.id)}
        >
          {args.wspec.label}
        </Button>
      );
    case "text":
      return (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <div key={args.wspec.id} dangerouslySetInnerHTML={{ __html: args.wspec.value }} />
          </Paper>
        </Grid >
      );
    default:
      return null;
  }
}

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
    case "text":
      state[wspec.id] = { value: wspec.value };
      break;
    case "form":
      genStateStruct(state, wspec.widgets);
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

class App extends Component {
  constructor(props) {
    super(props);
    this.spec = app_spec;
    this.staging = genStateStruct({}, app_spec.widgets);
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
    this.state = this.staging;
    console.log(this.state);
  }
  handleTextChange(id, event) {
    console.log("handleTextChange(" + id + "): ");
    console.log(this.state);
    this.staging[id].value = event.target.value;
  }

  handleSelectChange(id, event) {
    console.log("handleSelectChange(" + id + "): ");
    console.log(this.state);
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
      updateData: (id, d, c) => this.updateData(id, d, c),
    };
    return (<Widget 
            wspec={wspec} 
            callbacks={callbacks} 
            state={this.state} 
            widgets={this.spec.widgets}
        />);
  }

  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <Grid container className={{flexGrow: 1}} spacing={2}>
          <ApolloProvider client={client}>
            {this.spec.widgets.map((spec) => this.generateWidget(spec))}
          </ApolloProvider>
        </Grid>
      </div>
    );
  }
}

export default App;
