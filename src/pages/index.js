import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'

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
  const [focusDuration, setFocusDuration] = useState(25)
  const [shortBreakDuration, setShortBreakDuration] = useState(5)
  const [longBreakDuration, setLongBreakDuration] = useState(15)
  const [cycle, setCycle] = useState(1)
  const [cycleState, setCycleState] = useState('focus')

  let initialTimer = Duration.fromObject({ minutes: focusDuration })

  const [buttonDescription, setButtonDescription] = useState(true)
  const [timer, setTimer] = useState(initialTimer)
  const [pause, setPause] = useState(true)

  const [alarm] = useSound('/alarm.wav', { interrupt: true })
  const [reset] = useSound('/reset.wav', { interrupt: true, volume: 0.6 })
  const [clock] = useSound('/clock.wav', { interrupt: true })

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

    if (!pause) {
      setButtonDescription(true)
      clearInterval(intervalRef.current)
    } else {
      setButtonDescription(false)
      intervalRef.current = setInterval(decreaseNum, 1000)
    }
    setPause(prev => !prev)
  }

  const resetTimer = () => {
    setButtonDescription(true)
    setTimer(initialTimer)
    setCycle(1)
    setPause(true)
    setCycleState('focus')
    clearInterval(intervalRef.current)
    reset()
  }

  const cycles = (duration, cycle) => {
    setButtonDescription(true)
    setTimer(Duration.fromObject({ minutes: duration }))
    setCycle(cycle)
    setPause(true)
    clearInterval(intervalRef.current)
  }

  useEffect(() => {
    if (timer == 0) {
      alarm()
    }

    if (timer == 0 && cycle % 2 === 0) {
      cycles(focusDuration, cycle += 1)
      setCycleState('focus')
    } else if (timer == 0 && cycle < 7) {
      cycles(shortBreakDuration, cycle += 1)
      setCycleState('shortBreak')
    } else if (timer == 0 && cycle === 7) {
      cycles(longBreakDuration, 0)
      setCycleState('longBreak')
    }
  }, [timer])

  return (
    <>
      <Head>
          <title>PomoPomo - {timer.toFormat('mm:ss')}</title>
        </Head>
      <Container
        align="center"
        maxW='100vw'
        width='100%'
        height='100vh'
        bg=
        {
          cycleState == 'focus'
            ? 'red.100'
            : cycleState == 'shortBreak'
              ? 'blue.100'
              : 'blue.200'
        }
        transition="background-color 300ms linear"
      >
        <Box pt="70" >
          <Heading as='h1' pb='2' fontSize={['5xl', '6xl']} color='red.500'>Pomodoro</Heading>
          <Text mt='4' fontSize={['xl', '2xl']} >Helping you achieve the most of yourself!</Text>
        </Box>

        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          maxW='sm'
        >
          <Text fontSize={['7xl', '8xl']} my="8" color='gray.600' fontWeight='500'>
            {timer.toFormat('mm:ss')}
          </Text>

          <HStack spacing='8' >
            <Button size="lg" width='115px' colorScheme="red" onClick={handleClick}>
              {buttonDescription ? 'Start' : 'Pause'}
            </Button>

            <Button size="lg" width='115px' colorScheme="yellow" onClick={resetTimer}>
              Reset
            </Button>
          </HStack>
        </Box>
      </Container>
    </>
  )
}