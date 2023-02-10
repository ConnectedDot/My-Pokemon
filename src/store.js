import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getAllPokemon,
  getSinglePokemon,
  TeamReducer,
} from "./reducers/pokemonReducers";

const reducer = combineReducers({
  getPokemon: getSinglePokemon,
  team: TeamReducer,
  getAllPokemon: getAllPokemon,
});

const teamFromStorage = localStorage.getItem("pokemons")
  ? JSON.parse(localStorage.getItem("pokemons"))
  : [];

const initialState = {
  team: { pokemons: teamFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
