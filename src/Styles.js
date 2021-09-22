import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    flexgrow: 1,
    backgroundColor: theme.palette.background.paper,
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
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  customOne: {
    padding: "3rem 15rem",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    fontFamily: "Open Sans",
  },
  customTwo: {
    padding: "0rem",
    color: "#484848",
    backgroundColor: "#bbbbbb",
    fontFamily: "Open Sans",
    fontSize: "1rem",
  },
}));

export { useStyles };
