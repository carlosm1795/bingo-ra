import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 15,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  row1: {
    backgroundColor: "#6bb9f0",
    color: "white",
    fontWeight: "bold",
    fontSize: "30px",
  },
  row2: {
    backgroundColor: "#5c97bf",
    color: "white",
    fontWeight: "bold",
    fontSize: "30px",
  },
  rowN: {
    backgroundColor: "#006400",
    color: "white",
    fontWeight: "bold",
    fontSize: "30px",
  },
  rowG: {
    backgroundColor: "#00bfff",
    color: "white",
    fontWeight: "bold",
    fontSize: "30px",
  },
  rowO: {
    backgroundColor: "#8a2be2",
    color: "white",
    fontWeight: "bold",
    fontSize: "30px",
  },
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  carton: {
    borderRadius: 30,
    backgroundColor: "#c5eff7",
  },
}));
