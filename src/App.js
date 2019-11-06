import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Welcome from './components/welcome/container/welcome';
import Game from './components/game/container/game'
import Ranking from './components/ranking/container/ranking'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/welcome" />
          </Route>

          <Route path="/welcome" component={Welcome} />
          <Route path="/game/:userName" component={Game} />
          <Route path="/ranking" component={Ranking} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
