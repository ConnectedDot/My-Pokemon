import axios from "axios";
import {
  GET_POKEMON_FAIL,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_REQUEST,
  TEAM_ADD_POKEMON,
  TEAM_REMOVE_POKEMON,
  GET_ALL_POKEMON_SUCCESS,
  GET_ALL_POKEMON_REQUEST,
  GET_ALL_POKEMON_FAIL,
} from "../constants/pokemonConstants";

export const getSinglePokemon = (search) => async (dispatch) => {
  try {
    dispatch({ type: GET_POKEMON_REQUEST });

    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${search}`
    );

    dispatch({
      type: GET_POKEMON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_POKEMON_FAIL,
      payload: error.response.data,
    });
  }
};

export const addToTeam = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

  dispatch({
    type: TEAM_ADD_POKEMON,
    payload: {
      ability: data.abilities,
      image: data.sprites.front_default,
      pokemon: data,
    },
  });

  localStorage.setItem("pokemons", JSON.stringify(getState().team.pokemons));
};

export const removeFromTeam = (id) => (dispatch, getState) => {
  dispatch({
    type: TEAM_REMOVE_POKEMON,
    payload: id,
  });

  localStorage.setItem("pokemons", JSON.stringify(getState().team.pokemons));
};

export const getPokemons = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_POKEMON_REQUEST });

    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=100`
    );

    dispatch({
      type: GET_ALL_POKEMON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_POKEMON_FAIL,
      payload: error.response.data,
    });
  }
};
