import Grid from "@material-ui/core/Grid";
//import Paper from "@material-ui/core/Paper";
import { TabContainer } from "./TabContainer.js";
import { DataTable } from "./DataTable.js";
import { QueryForm } from "./QueryForm.js";
import { TextInput } from "./TextInput.js";
import { Menu } from "./Menu.js";
import { MyButton } from "./MyButton.js";

// Grid will use 12 units has maxwidth
function Widget(args) {
  switch (args.wspec.type) {
    case "tabcontainer":
      return (
        <Grid item xs={12}>
          <TabContainer
            key={args.wspec.id}
            id={args.wspec.id}
            tabs={args.wspec.tabs}
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
          />
        </Grid>
      );
    case "form":
      return (
        <Grid item xs={12}>
          <QueryForm key={args.wspec.id} widgets={args.wspec.widgets} />
        </Grid>
      );

    case "text_input":
      return (
        <TextInput
          key={args.wspec.id}
          id={args.wspec.id}
          label={args.wspec.label}
        />
      );
    case "menu":
      return (
        <Menu
          id={args.wspec.id}
          label={args.wspec.label}
          values={args.wspec.values}
        />
      );
    case "button":
      return (
        <MyButton
          key={args.wspec.id}
          id={args.wspec.id}
          label={args.wspec.label}
        />
      );
    case "image":
      return (
        <Grid
          container
          xs={args.wspec.width}
          justifyContent={args.wspec.justify}
          alignItems="center"
        >
          <Grid item xs={args.wspec.width}>
            <img
              alt="portrait"
              border="1"
              height={args.wspec.imageheight}
              style={{
                marginTop: "2em",
              }}
              src={args.wspec.value}
            />
          </Grid>
        </Grid>
      );
    case "text":
      return (
        <Grid
          container
          xs={args.wspec.width}
          justifyContent={args.wspec.justify}
        >
          <Grid item xs={args.wspec.width}>
            <div
              key={args.wspec.id}
              dangerouslySetInnerHTML={{ __html: args.wspec.value }}
            />
          </Grid>
        </Grid>
      );
    //          <Paper className={classes.paper}>
    //          </Paper>
    default:
      return null;
  }
}

export { Widget };
