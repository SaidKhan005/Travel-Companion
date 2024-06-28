import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";

const App = () => {
  return (
    // the router-dom
    <Router>
      <MainNavigation />
       <main> {/* main part of page */}
      {/* Switch ensures that only one route rendered at a time since the file is parsed top to bottom */}
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path ="/:userId/places" exact>
          <UserPlaces/>
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>

        <Redirect to="/" />
      </Switch>
      </main>
      {/* footers n stuff come after switch bcoz we always want them rendered */}
    </Router>
  );
};

export default App;
