import React, { useState } from "react";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";
import {
  Input,
  Box,
  Button,
  Grid,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePokemon } from "../actions/pokemonActions";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  // Find Pokemon
  const searchHandler = () => {
    dispatch(getSinglePokemon(search));
  };

  const getPokemon = useSelector((state) => state.getPokemon);
  const { loading, error, success, pokemon, image, ability } = getPokemon;

  return (
    <>
      <Navigation />
      <Hero />
      <div className={styles.contents} id="search">
        <Box className={styles.size}>
          <Box w="100%" p={4}>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Box w="100%">
                <Input
                  placeholder="Search for Pokemons"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
              <Box w="100%">
                <Button
                  colorScheme="teal"
                  size="md"
                  isFullWidth
                  onClick={searchHandler}
                >
                  Search
                </Button>
              </Box>
            </Grid>
          </Box>
        </Box>

        {/* PokeMon Card */}
        <Box w="60%" style={{ margin: "0 auto" }}>
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
          {success && (
            <Link to={`/myteam/${pokemon.id}`}>
              <Card pokemon={pokemon} image={image} ability={ability} />
            </Link>
          )}
          {/* End PokeMon Card */}
        </Box>
      </div>
    </>
  );
};

export default HomeScreen;
