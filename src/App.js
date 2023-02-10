import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PokemonScreen from "./screens/PokemonScreen";
import SingleTeam from "./screens/SingleTeam";
import TeamScreen from "./screens/TeamScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/myTeam" exact component={TeamScreen} />
        <Route path="/myTeam/:id" exact component={SingleTeam} />
        <Route path="/pokemons" exact component={PokemonScreen} />
      </Switch>
    </Router>
  );
}

export default App;
