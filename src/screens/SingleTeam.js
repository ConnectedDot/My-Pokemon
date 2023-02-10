import React, { useEffect, useState } from "react";
import Header from "../components/Hero/Header";
import Navigation from "../components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePokemon } from "../actions/pokemonActions";
import {
  Box,
  Spinner,
  Alert,
  AlertIcon,
  Grid,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";
import { addToTeam, removeFromTeam } from "../actions/pokemonActions";
import { Link } from "react-router-dom";

const SingleTeam = ({ match, history }) => {
  const toast = useToast();
  const [limit, setLimit] = useState(false);
  const dispatch = useDispatch();
  const search = match.params.id || 1;

  const getPokemon = useSelector((state) => state.getPokemon);
  const { loading, error, success, pokemon, image, ability } = getPokemon;

  const team = useSelector((state) => state.team);
  const { pokemons } = team;
  //   check if pokemon has been added to team
  const find = pokemons.find((x) => x.pokemon.id === pokemon.id);

  // Add Pokemon to Team
  const add = (id) => {
    if (pokemons.length >= 6) {
      setLimit(true);
      toast({
        title: "Maximum Team Reached",
        description: "You cannot add more than 6 pokemons to your team",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(addToTeam(id));
    }
  };

  // Remove Pokemon to Team
  const remove = (id) => {
    dispatch(removeFromTeam(id));
  };

  useEffect(() => {
    dispatch(getSinglePokemon(search));
    if (!success) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [dispatch, search, history]);
  return (
    <div>
      <Navigation />
      <Header title={loading ? "Loading" : pokemon.name} />
      <Box w="100%" p={4}>
        <Link to="/">Go Back</Link>
        {limit}
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        )}
        {error && (
          <Alert status="error">
            {" "}
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Box>
            <Image
              src={image}
              alt={pokemon.name}
              width="200px"
              height="200px"
              style={{ margin: "0 auto" }}
            />
          </Box>
          <Box>
            <h4>Name: {pokemon.name}</h4>
            <h4>Base Experience: {pokemon.base_experience}</h4>
            <h4>Height: {pokemon.height}</h4>
            <h4>Weight: {pokemon.weight}</h4>
            <h5>
              <b>Stats:</b>
            </h5>
            {pokemon.stats &&
              pokemon.stats.map((item, index) => (
                <small style={{ marginRight: "5px" }} key={index}>
                  {item.stat.name}
                </small>
              ))}
            <h5>
              <b>Abilities:</b>
            </h5>
            {ability &&
              ability.map((item, index) => (
                <small style={{ marginRight: "5px" }} key={index}>
                  {item.ability.name}
                </small>
              ))}

            {/* Add or Remove from team */}
            <Box w="100%" p={1}>
              {find === undefined ? (
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => add(pokemon.id)}
                >
                  Add to Team
                </Button>
              ) : (
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => remove(pokemon.id)}
                >
                  Remove from Team
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Box>
    </div>
  );
};

export default SingleTeam;
