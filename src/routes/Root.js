import { BrowserRouter, Route, Switch } from "react-router-dom";
import CardScreen from "../views/CardScreen";
import Home from "../views/Home";

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/:id">
          <CardScreen />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
