import React from "react";
import Card from "../components/Card";
import Navigation from "../components/Navigation";
import { useSelector } from "react-redux";
import { Grid, Box, AlertIcon, Alert } from "@chakra-ui/react";
import Header from "../components/Hero/Header";
import { Link } from "react-router-dom";

const TeamScreen = () => {
  const team = useSelector((state) => state.team);
  const { pokemons } = team;
  return (
    <div>
      <Navigation />
      <Header title="My Team" />
      {/* Card */}
      <Box w="100%" p={4} style={{ margin: "0 auto" }}>
        {pokemons.length === 0 ? (
          <Alert status="warning">
            <AlertIcon />
            There are no team members&nbsp;
            <Link to="/">Add Team Members</Link>
          </Alert>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {pokemons.map((item, index) => (
              <Link key={index} to={`/myteam/${item.pokemon.id}`}>
                <Card
                  pokemon={item.pokemon}
                  image={item.image}
                  ability={item.ability}
                />
              </Link>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default TeamScreen;
