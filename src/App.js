import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Property from "./pages/Property";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/property/:id" render={() => <Property />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
