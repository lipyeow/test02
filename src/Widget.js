import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { TabContainer } from "./TabContainer.js";
import { DataTable } from "./DataTable.js";
import { QueryForm } from "./QueryForm.js";
import { useStyles } from "./Styles.js";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
//import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

// Grid will use 12 units has maxwidth
function Widget(args) {
  const classes = useStyles();
  switch (args.wspec.type) {
    case "tabcontainer":
      return (
        <Grid item xs={12}>
          <TabContainer
            key={args.wspec.id}
            id={args.wspec.id}
            callbacks={args.callbacks}
            state={args.state}
            tabs={args.wspec.tabs}
            onChange={(event, newValue) => args.callbacks.handleTabChange(args.wspec.id, event, newValue)}
          />
        </Grid>
      );
    case "form":
      return (
        <Grid item xs={12}>
          <QueryForm
            key={args.wspec.id}
            callbacks={args.callbacks}
            state={args.state}
            widgets={args.wspec.widgets}
          />
        </Grid>
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
    case "image":
      return (
        <Grid container xs={args.wspec.width} 
            justifyContent={args.wspec.justify}
            alignItems="center"
            >
          <Grid item xs={args.wspec.width}>
            <img alt="portrait" border="1" style={{
                "marginTop": "2em", 
                    height: "220px"}} 
                src={args.wspec.value}/>
          </Grid >
        </Grid >
      );
    case "text":
      return (
        <Grid container xs={args.wspec.width} 
            justifyContent={args.wspec.justify}
            >
          <Grid item xs={args.wspec.width}>
            <div key={args.wspec.id} dangerouslySetInnerHTML={{__html: args.wspec.value}}/>
          </Grid >
        </Grid >
      );
//          <Paper className={classes.paper}>
//          </Paper>
    default:
      return null;
  }
}

export { Widget } ;
