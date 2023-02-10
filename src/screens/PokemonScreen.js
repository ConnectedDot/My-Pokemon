import React, { useEffect } from "react";
import Header from "../components/Hero/Header";
import Navigation from "../components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions/pokemonActions";
import { Box, Grid, Spinner, Alert, AlertIcon } from "@chakra-ui/react";

const PokemonScreen = () => {
  const dispatch = useDispatch();

  const getAllPokemon = useSelector((state) => state.getAllPokemon);
  const { loading, error, pokemons } = getAllPokemon;

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);
  return (
    <div>
      <Navigation />
      <Header title="Pokemons" />
      <Box w="100%" p={5}>
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
        <Grid templateColumns="repeat(6, 1fr)" gap={6}>
          {pokemons &&
            pokemons.map((item, index) => (
              <Box
                maxW="md"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                style={{ padding: "1rem" }}
                key={index}
              >
                {item.name}
              </Box>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default PokemonScreen;
