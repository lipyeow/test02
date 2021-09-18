// for tab containers
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useStyles } from "./Styles.js";
import { Widget } from "./Widget.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabContainer(args) {
  const classes = useStyles();
//  const [value, setValue] = React.useState(0);

//  const handleChange = (event, newValue) => {
//    setValue(newValue);
//  };
  //console.log("tabcontainer args.id = " + args.id);

  return (
    <div className={classes.root} >
      <AppBar key={"appbar-"+args.id} position="static" style={{ minWidth: "100%" }}>
        <Tabs key={"tabs-"+args.id} value={args.state[args.id].value} onChange={args.onChange} 
            aria-label="simple tabs example"
            variant="scrollable"
            scrollButtons="auto"
            className={classes.customTwo}
            >
          { args.tabs.map( (tab) =>  
                (<Tab key={"tab-" + tab.id} label={tab.label} {...a11yProps(tab.idx)} />)) }
        </Tabs>
      </AppBar>
      { args.tabs.map( (tab) =>  
                (<TabPanel key={"tabpanel-"+tab.id} value={args.state[args.id].value} index={tab.idx} style={{ minWidth: "100%" }}>
                    { tab.widgets.map( (spec) => (<Widget wspec={spec} callbacks={args.callbacks} state={args.state} />) ) }
                </TabPanel>
                )) }
    </div>
  );
}

export { TabContainer };
