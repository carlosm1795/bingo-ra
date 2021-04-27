import "./App.css";
import Carton from "./components/carton/Carton";
import Admin from "./components/admin/Admin";
import "fontsource-roboto";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [isNormalUser, setNormalUser] = useState(true);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = useState("");
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const validateLogin = () => {
    if (login.username === "admin" && login.password === "admin") {
      setNormalUser(false);
      handleClose();
      setFeedback("");
    } else {
      setFeedback("not a valid credentials");
    }
  };

  const closeSession = () => {
    setNormalUser(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      {isNormalUser ? (
        <div>
          <Carton />
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Login As Admin
          </Button>
        </div>
      ) : (
        <div>
          <Admin />
          <Button variant="contained" color="primary" onClick={closeSession}>
            Close Session
          </Button>
        </div>
      )}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className={classes.formControl}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Login As Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <InputLabel id="demo-simple-select-label">Username</InputLabel>
          <TextField
            id="outlined-basic"
            onChange={(e) =>
              setLogin({
                ...login,
                username: e.target.value,
              })
            }
            value={login.username}
          />

          <Divider />
        </List>
        <List>
          <InputLabel id="demo-simple-select-label">Password</InputLabel>
          <TextField
            id="outlined-basic"
            onChange={(e) =>
              setLogin({
                ...login,
                password: e.target.value,
              })
            }
            value={login.password}
          />

          <Divider />

          <hr />
        </List>
        <Button variant="contained" onClick={validateLogin} color="primary">
          Login
        </Button>
        {feedback}
      </Dialog>
    </div>
  );
}

export default App;
