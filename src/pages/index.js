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
import useSound from 'use-sound'

export default function Home() {
  let initialTimer = Duration.fromObject({ minutes: 25, seconds: 0 })

  const [alarm] = useSound('/alarm.wav', { interrupt: true })
  const [reset] = useSound('/reset.wav', { interrupt: true })
  const [clock] = useSound('/clock.wav', { interrupt: true })

  const [cycle, setCycle] = useState(0)
  const [timer, setTimer] = useState(initialTimer)
  const [pause, setPause] = useState(false)
  const [buttonDescription, setButtonDescription] = useState(true)

  let intervalRef = useRef()

  const handleClick = () => {
    clock()

    function decreaseNum() {
      if (timer == 0) {
        setButtonDescription(true)
        return
      } else {
        return setTimer(prev => prev.minus({ seconds: 1 }))
      }
    }

    if (pause) {
      setButtonDescription(true)
      clearInterval(intervalRef.current)
    } else {
      setButtonDescription(false)
      intervalRef.current = setInterval(decreaseNum, 3)
    }
    setPause(prev => !prev)
  }

  const resetTimer = () => {
    setButtonDescription(true)
    setTimer(initialTimer)
    setCycle(0)
    clearInterval(intervalRef.current)
    reset()

    setPause(prev => !prev)
  }

  useEffect(() => {
    if (timer == 0 && cycle == 0) {
      clearInterval(intervalRef.current)
      setButtonDescription(true)
      setTimer(Duration.fromObject({ minutes: 5, seconds: 0 }))
      setCycle(cycle + 1)
      setPause(prev => !prev)
      alarm()
    } else if (timer == 0 && cycle == 1) {
      clearInterval(intervalRef.current)
      setButtonDescription(true)
      setTimer(initialTimer)
      setCycle(cycle + 1)
      setPause(prev => !prev)
      alarm()
    } else if (timer == 0 && cycle == 2) {
      clearInterval(intervalRef.current)
      setButtonDescription(true)
      setTimer(Duration.fromObject({ minutes: 5, seconds: 0 }))
      setCycle(cycle + 1)
      setPause(prev => !prev)
      alarm()
    } else if (timer == 0 && cycle == 3) {
      clearInterval(intervalRef.current)
      setButtonDescription(true)
      setTimer(initialTimer)
      setCycle(cycle + 1)
      setPause(prev => !prev)
      alarm()
    } else if (timer == 0 && cycle == 4) {
      clearInterval(intervalRef.current)
      setButtonDescription(true)
      setTimer(Duration.fromObject({ minutes: 5, seconds: 0 }))
      setCycle(cycle + 1)
      setPause(prev => !prev)
      alarm()
    } else if (timer == 0 && cycle == 5) {
      clearInterval(intervalRef.current)
      setButtonDescription(true)
      setTimer(initialTimer)
      setCycle(cycle + 1)
      setPause(prev => !prev)
      alarm()
    } else if (timer == 0 && cycle == 6) {
      clearInterval(intervalRef.current)
      setButtonDescription(true)
      setTimer(Duration.fromObject({ minutes: 15, seconds: 0 }))
      setPause(prev => !prev)
      alarm()
      setCycle(1)
    }
  }, [timer])

  return (
    <Container align="center" maxW='container.md'>
      <Box mt="70" >
        <Heading fontSize='6xl' color='red.400'>Pomodoro</Heading>
        <Text mt='4' fontSize='2xl'>Helping you achieve the most of yourself!</Text>
      </Box>

      <Box
        bg={cycle % 2 == 0 ? 'red.50' : 'blue.50'}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        mt="8"
        p="16"
      >
        <Text fontSize="7xl" mb="4" color='gray.600'>
          {timer.toFormat('mm:ss')}
        </Text>

        <HStack spacing='8' >
          <Button size="lg" width='100px' colorScheme="red" onClick={handleClick}>
            {buttonDescription ? 'Start' : 'Pause'}
          </Button>

          <Button size="lg" width='100px' colorScheme="yellow" onClick={resetTimer}>
            Reset
          </Button>
        </HStack>
      </Box>
    </Container>
  )
}