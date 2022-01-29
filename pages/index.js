import { useEffect, useRef, useState } from 'react'

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react'

import { Duration } from 'luxon'

export default function Home() {
  let initialTimer = Duration.fromObject({ minutes: 45, seconds: 0 })

  const [timer, setTimer] = useState(initialTimer)
  const [pause, setPause] = useState(false)
  const [buttonDescription, setButtonDescription] = useState(true)

  let intervalRef = useRef()

  const decreaseNum = () => {
    if (timer == 0) {
      setButtonDescription(true)
      return
    } else {
      return setTimer(prev => prev.minus({ seconds: 1 }))
    }
  }

  const handleClick = () => {
    if (pause) {
      setButtonDescription(true)
      clearInterval(intervalRef.current)
    } else {
      setButtonDescription(false)
      intervalRef.current = setInterval(decreaseNum, 1000)
    }
    setPause(prev => !prev)
  }

  const resetTimer = () => {
    handleClick()
    setTimer(initialTimer)
    clearInterval(intervalRef.current)
    
    if (!pause) {
      setButtonDescription(true)
      setPause(prev => !prev)
    }
  }


  useEffect(() => {
    if (timer == 0) {
      clearInterval(intervalRef.current)
      setButtonDescription(true)
    }
  }, [timer])

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
          {timer.toFormat('mm:ss')}
        </Text>

        <HStack spacing='8' >
          <Button size="lg" colorScheme="red" onClick={handleClick}>
            {buttonDescription ? 'Start' : 'Pause'}
          </Button>

          <Button size="lg" colorScheme="yellow" mt="4" onClick={resetTimer}>
            Reset
          </Button>
        </HStack>
      </Box>
    </Container>
  )
}