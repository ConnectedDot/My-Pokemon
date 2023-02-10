import React from 'react'
import { Button, Box, Text } from "@chakra-ui/react"
import styles from './styles.module.css'
import { Link } from 'react-scroll'




const Hero = () => {
    return (
        <div className={styles.hero}>
            <Box w="100%" p={4}>
                <Text fontSize="6xl" color="white" textShadow="1px 1px #000" fontWeight="bold">Pokemon</Text>
                <Text fontSize="2xl" color="white" textShadow="1px 1px #000" fontWeight="bold">Find your Favorite Pokemons</Text>
                <Link activeClass="active" to="search" spy={true} smooth={true}>
                    <Button colorScheme="teal" size="lg">
                        Find Now
                    </Button>
                </Link>
            </Box>
        </div>
    )
}

export default Hero
