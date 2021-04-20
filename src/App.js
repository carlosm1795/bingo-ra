import logo from "./logo.svg";
import "./App.css";
import Carton from "./components/carton/Carton";
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Carton />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Router>
    </div>
  );
}

export default App;
