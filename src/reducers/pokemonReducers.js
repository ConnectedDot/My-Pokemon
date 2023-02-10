import {
  TEAM_ADD_POKEMON,
  GET_POKEMON_FAIL,
  GET_POKEMON_REQUEST,
  GET_POKEMON_SUCCESS,
  TEAM_REMOVE_POKEMON,
  GET_ALL_POKEMON_FAIL,
  GET_ALL_POKEMON_REQUEST,
  GET_ALL_POKEMON_SUCCESS,
} from "../constants/pokemonConstants";

export const getSinglePokemon = (
  state = { pokemon: [], ability: [] },
  action
) => {
  switch (action.type) {
    case GET_POKEMON_REQUEST:
      return { loading: true, pokemon: [], ability: [] };
    case GET_POKEMON_SUCCESS:
      return {
        loading: false,
        success: true,
        pokemon: action.payload,
        ability: action.payload.abilities,
        image: action.payload.sprites.front_default,
      };
    case GET_POKEMON_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const TeamReducer = (state = { pokemons: [] }, action) => {
  switch (action.type) {
    case TEAM_ADD_POKEMON:
      const item = action.payload;

      const existItem = state.pokemons.find(
        (x) => x.pokemon.id === item.pokemon.id
      );

      if (existItem) {
        return {
          ...state,
          pokemons: state.pokemons.map((x) =>
            x.pokemon.id === existItem.pokemon.id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          pokemons: [...state.pokemons, item],
        };
      }

    case TEAM_REMOVE_POKEMON:
      return {
        ...state,
        pokemons: state.pokemons.filter((x) => x.pokemon.id !== action.payload),
      };

    default:
      return state;
  }
};

export const getAllPokemon = (state = { pokemons: [] }, action) => {
  switch (action.type) {
    case GET_ALL_POKEMON_REQUEST:
      return { loading: true, pokemon: [] };
    case GET_ALL_POKEMON_SUCCESS:
      return {
        loading: false,
        success: true,
        pokemons: action.payload.results,
      };
    case GET_ALL_POKEMON_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
