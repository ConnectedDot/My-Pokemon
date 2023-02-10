import React, { useState } from "react";
import { Image, Box, Button, useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { addToTeam, removeFromTeam } from "../actions/pokemonActions";

const Card = ({ pokemon, image, ability }) => {
  const toast = useToast();
  const [limit, setLimit] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <div>
      {limit}
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        style={{ margin: "0 auto" }}
      >
        <Image
          src={image}
          alt={pokemon.name}
          width="200px"
          height="200px"
          style={{ margin: "0 auto" }}
        />

        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {pokemon.name}
          </Box>

          <Box>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              Abilities
            </Box>
            {ability.map((item, index) => (
              <small style={{ marginRight: "5px" }} key={index}>
                {item.ability.name}
              </small>
            ))}
          </Box>
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
    </div>
  );
};

export default Card;
