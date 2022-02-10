import { useEffect, useRef, useState, useContext } from 'react'

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
import ModalConfig from './components/ModalConfig'
import { useAppContext } from '../contexts/AppContext'

export default function Home() {
  const context = useAppContext()

  const [buttonDescription, setButtonDescription] = useState(true)
  const [pause, setPause] = useState(true)

  const [alarm] = useSound('/alarm.wav', { interrupt: true })
  const [reset] = useSound('/reset.wav', { interrupt: true, volume: 0.6 })
  const [clock] = useSound('/clock.wav', { interrupt: true })

  let intervalRef = useRef()

  const handleClick = () => {
    clock()

    function decreaseNum() {
      if (context.timer == 0) {
        setButtonDescription(true)
        return
      } else {
        return context.setTimer(prev => prev.minus({ seconds: 1 }))
      }
    }

    if (!pause) {
      setButtonDescription(true)
      clearInterval(intervalRef.current)
    } else {
      setButtonDescription(false)
      intervalRef.current = setInterval(decreaseNum, 1)
    }
    setPause(prev => !prev)
  }

  const resetTimer = () => {
    setButtonDescription(true)
    context.setTimer(context.initialTimer)
    context.setCycle(1)
    setPause(true)
    context.setCycleState('focus')
    clearInterval(intervalRef.current)
    reset()
  }

  const cycles = (duration, cycle) => {
    setButtonDescription(true)
    context.setTimer(Duration.fromObject({ minutes: duration }))
    context.setCycle(cycle)
    setPause(true)
    clearInterval(intervalRef.current)
  }

  useEffect(() => {
    if (context.timer == 0) {
      alarm()
    }

    if (context.timer == 0 && context.cycle % 2 === 0) {
      cycles(context.focusDuration, context.cycle += 1)
      context.setCycleState('focus')
    } else if (context.timer == 0 && context.cycle < 7) {
      cycles(context.shortBreakDuration, context.cycle += 1)
      context.setCycleState('shortBreak')
    } else if (context.timer == 0 && context.cycle === 7) {
      cycles(context.longBreakDuration, 0)
      context.setCycleState('longBreak')
    }
  }, [context.timer])

  return (
    <>
      <Head>
        <title>{pause ? `Pomo-Pomodoro` : `${context.timer.toFormat('mm:ss')} - Pomo-Pomodoro`}</title>
      </Head>

      <Container
        align="center"
        maxW='100vw'
        width='100%'
        height='100vh'
        bg=
        {
          context.cycleState == 'focus'
            ? 'red.100'
            : context.cycleState == 'shortBreak'
              ? 'blue.100'
              : 'blue.200'
        }
        transition="background-color 300ms linear"
      >
        <Box pt="70" maxWidth="xl" >
          <ModalConfig />
          <Heading as='h1' py='2' fontSize={['5xl', '6xl']} color='red.500'>Pomodoro</Heading>
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
            {context.timer.toFormat('mm:ss')}
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