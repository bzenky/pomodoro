import {
  Box,
  Button,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react'

export default function Home() {
  return (
    <Container align="center">
      <Box mt="50" >
        <Heading color='red.400'>Pomodoro</Heading>
        <Text mt='4'>Helping you achieve the most of yourself!</Text>
      </Box>

      <Box
        bg="red.50"
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        mt="8"
        borderWidth="1"
        p="8"
      >
        <Text fontSize="7xl" mb="4" color='gray.600'>
          45:00
        </Text>

        <Button size="lg" colorScheme="red">
          Start
        </Button>

        <Button size="lg" colorScheme="yellow" mt="4">
          Pause
        </Button>
      </Box>
    </Container>
  )
}
